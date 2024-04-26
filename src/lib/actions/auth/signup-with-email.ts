'use server'

import bcrypt from 'bcryptjs'
import { SignUpSchema } from '@/lib/schemas/auth'
import db from '@/lib/database'
import { generateConfirmationToken } from '@/lib/services/generateConfirmationToken'
import { sendConfirmationEmail } from '@/lib/services/sendConfirmationEmail'

export async function signUpWithEmail(prevState: any, formData: FormData) {
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password')
  })

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
      success: ''
    }
  }

  const { name, email, password, confirmPassword } = validatedFields.data

  if (password !== confirmPassword) {
    return {
      error: 'Passwords must be equal',
      success: ''
    }
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await db.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser != null) {
      return {
        error: 'Email already used',
        success: ''
      }
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    const confirmationToken = await generateConfirmationToken(email)

    await sendConfirmationEmail({
      email: confirmationToken.email,
      token: confirmationToken.token
    })

    return {
      success: 'Link confirmation was sent',
      error: ''
    }
  } catch (error: any) {
    console.log('ACTION_ERROR: ', error.message)

    return {
      error: 'Something went wrong',
      success: ''
    }
  }
}
