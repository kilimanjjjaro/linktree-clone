'use server'

import bcrypt from 'bcryptjs'

import db from '@/lib/database'
import { NewPasswordSchema } from '@/lib/schemas/auth'
import { getPasswordResetTokenByToken } from '@/lib/services/password-reset-tokens'
import { getUserByEmail } from '@/lib/services/get-user-by-email'

interface PrevStateInterface {
  success: string
  error: string
  token: string
}

export async function newPassword(
  prevState: PrevStateInterface,
  formData: FormData
) {
  const validatedFields = NewPasswordSchema.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password')
  })

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields.',
      success: '',
      token: ''
    }
  }

  const { password, confirmPassword } = validatedFields.data

  if (password !== confirmPassword) {
    return {
      error: 'Passwords must be equal.',
      success: '',
      token: ''
    }
  }

  const existingToken = await getPasswordResetTokenByToken(prevState.token)

  if (existingToken === null) {
    return {
      error: 'Invalid link.',
      success: '',
      token: ''
    }
  }

  const hasExpired = new Date(existingToken.expires_at) < new Date()

  if (hasExpired) {
    return {
      error: 'Expired link.',
      success: '',
      token: ''
    }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (existingUser === null) {
    return {
      error: 'User not found.',
      success: '',
      token: ''
    }
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.update({
      where: {
        id: existingUser.id
      },
      data: {
        password: hashedPassword
      }
    })

    await db.passwordResetToken.delete({
      where: { id: existingToken.id }
    })

    return {
      success: 'Password updated.',
      error: '',
      token: ''
    }
  } catch (error) {
    console.error('ACTION_ERROR: ', error instanceof Error ? error.message : error)

    return {
      error: 'Something went wrong.',
      success: '',
      token: ''
    }
  }
}
