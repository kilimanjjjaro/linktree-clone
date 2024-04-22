'use server'

import { LogInSchema } from '@/lib/schemas/auth'

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

  return { success: 'Logged' }
}
