'use server'

import bcrypt from 'bcrypt'
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

  const hashedPassword = await bcrypt.hash(password, 10)

  const body = {
    name,
    email,
    password: hashedPassword
  }

  const response = await fetch(
    'https://linktree-clone-woad.vercel.app/api/edge',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  )

  const data = await response.json()

  console.log('signUpAction: ', data)

  return data
}
