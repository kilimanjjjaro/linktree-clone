'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/lib/auth'
import { LogInSchema } from '@/lib/schemas/auth'
import { PUBLIC_ROUTE } from '@/lib/constants/routes'

export async function logInWithEmail(prevState: any, formData: FormData) {
  const validatedFields = LogInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  })

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!'
    }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: PUBLIC_ROUTE
    })

    return { success: 'Logged in', error: '' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return { error: 'Invalid credentials' }
        }
        default: {
          return {
            error: 'Something went wrong'
          }
        }
      }
    }

    throw error
  }
}
