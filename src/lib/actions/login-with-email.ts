'use server'

import { z } from 'zod'
import { signIn } from '@/lib/auth/auth'

const LogInWithEmailScheme = z.object({
  email: z.string().email()
})

export async function logInWithEmail(prevState: any, formData: FormData) {
  try {
    const { email } = LogInWithEmailScheme.parse({
      email: formData.get('email')
    })

    const response = await signIn('resend', {
      email,
      redirect: false,
      redirectTo: '/'
    })

    if (response === undefined) {
      throw new Error('Something has happened')
    }

    return {
      success: true,
      error: false
    }
  } catch (error) {
    return {
      success: false,
      error: true
    }
  }
}
