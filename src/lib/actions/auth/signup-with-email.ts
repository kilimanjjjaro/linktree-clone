'use server'

import bcrypt from 'bcrypt'
import { SignUpSchema } from '@/lib/schemas/auth'
import { API_BASE_URL } from '@/lib/constants/globals'

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

    const body = {
      name,
      email,
      password: hashedPassword
    }

    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      throw new Error('Something went wrong. Please try again.')
    }

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
