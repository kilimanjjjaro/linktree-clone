'use server'

import { getConfirmationTokenByToken } from '@/lib/services/confirmation-token'
import { getUserByEmail } from '@/lib/services/get-user-by-email'
import db from '@/lib/database'
import { delay } from '@/lib/utils/delay'

export async function verifyConfirmationToken(token: string) {
  // Delay for aesthetic purposes, the server response is too fast and the animation is not appreciated
  void delay(2000)

  const existingToken = await getConfirmationTokenByToken(token)

  if (existingToken === null) {
    return {
      error: 'Invalid link',
      success: ''
    }
  }

  const hasExpired = new Date(existingToken.expires_at) < new Date()

  if (hasExpired) {
    return {
      error: 'Expired link',
      success: ''
    }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (existingUser === null) {
    return {
      error: 'Error',
      success: ''
    }
  }

  try {
    await db.user.update({
      where: {
        id: existingUser.id
      },
      data: {
        emailVerified: new Date()
      }
    })

    await db.confirmationToken.delete({ where: { id: existingToken.id } })

    return {
      error: '',
      success: 'Account verified'
    }
  } catch {
    return {
      error: 'Error',
      success: ''
    }
  }
}
