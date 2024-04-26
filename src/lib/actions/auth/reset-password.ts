'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/lib/auth'
import { ResetPasswordSchema } from '@/lib/schemas/auth'
import { getUserByEmail } from '@/lib/services/getUserByEmail'

export async function resetPassword(prevState: any, formData: FormData) {
  const validatedFields = ResetPasswordSchema.safeParse({
    email: formData.get('email')
  })

  if (!validatedFields.success) {
    return {
      error: 'Invalid email!',
      success: ''
    }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (existingUser?.email === undefined) {
    return {
      error: 'User not found!',
      success: ''
    }
  }

  try {
    await signIn('credentials', {
      email,
      redirectTo: '/'
    })

    return { success: 'Reset password email sent!', error: '' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return { error: 'Invalid credentials', success: '' }
        }
        default: {
          return {
            error: 'Something went wrong!',
            success: ''
          }
        }
      }
    }

    throw error
  }
}
