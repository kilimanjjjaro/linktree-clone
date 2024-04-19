'use server'

import { z } from 'zod'
import { signIn } from '@/lib/auth'

const LogInWithEmailScheme = z.object({
  email: z.string().email()
})

export async function logInWithEmail(prevState: any, formData: FormData) {
  try {
    const { email } = LogInWithEmailScheme.parse({
      email: formData.get('email')
    })

    await signIn('resend', { email, redirectTo: '/' })

    return {
      success: true
    }
  } catch (error) {
    console.error(error)

    return {
      success: false
    }
  }
}
