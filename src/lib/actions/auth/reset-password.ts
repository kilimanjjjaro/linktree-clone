'use server'

import { ResetPasswordSchema } from '@/lib/schemas/auth'
import { getUserByEmail } from '@/lib/services/getUserByEmail'
import { generatePasswordResetToken } from '@/lib/services/generatePasswordResetToken'
import { sendPasswordResetEmail } from '@/lib/services/sendPasswordResetEmail'

export async function resetPassword(prevState: any, formData: FormData) {
  const validatedFields = ResetPasswordSchema.safeParse({
    email: formData.get('email')
  })

  if (!validatedFields.success) {
    return {
      error: 'Invalid email',
      success: ''
    }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (existingUser?.email === undefined) {
    return {
      error: 'User not found',
      success: ''
    }
  }

  try {
    const passwordResetToken = await generatePasswordResetToken(email)

    await sendPasswordResetEmail({
      email: passwordResetToken.email,
      token: passwordResetToken.token
    })

    return { success: 'Reset password email sent', error: '' }
  } catch (error: any) {
    console.log('ACTION_ERROR: ', error.message)

    return {
      error: 'Something went wrong',
      success: ''
    }
  }
}
