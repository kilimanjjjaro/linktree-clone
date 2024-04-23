'use server'

import bcrypt from 'bcryptjs'
import { SignUpSchema } from '@/lib/schemas/auth'
import db from '@/lib/database'

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

    if (existingUser != null) throw new Error('Email already used')

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    return {
      success: 'An email was sent for confirm account',
      error: ''
    }
  } catch (error: any) {
    console.log('ACTION_ERROR: ', error)

    return {
      error: error.message,
      success: ''
    }
  }
}
