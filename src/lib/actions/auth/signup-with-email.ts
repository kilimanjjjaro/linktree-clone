'use server'

import bcrypt from 'bcrypt'
import db from '@/lib/database'
import { SignUpSchema } from '@/lib/schemas/auth'

export async function signUpWithEmail(prevState: any, formData: FormData) {
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password')
  })

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!'
    }
  }

  const { name, email, password, confirmPassword } = validatedFields.data

  if (password !== confirmPassword) {
    return {
      error: 'Passwords must be equal.',
      success: ''
    }
  }

  const existingUser = await db.user.findUnique({
    where: {
      email
    }
  })

  if (existingUser != null) {
    return {
      error: 'Email already in use',
      success: ''
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  // TODO: send email verification

  return {
    success: 'Email sent!',
    error: ''
  }
}
