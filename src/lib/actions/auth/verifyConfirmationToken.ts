'use server'

import { getConfirmationTokenByToken } from '@/lib/services/getConfirmationTokenByToken'
import { getUserByEmail } from '@/lib/services/getUserByEmail'
import db from '@/lib/database'

export async function verifyConfirmationToken(token: string) {
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
  } catch (error) {
    return {
      error: 'Error',
      success: ''
    }
  }
}
