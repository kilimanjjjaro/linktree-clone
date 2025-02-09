import { v4 as uuidv4 } from 'uuid'

import db from '@/lib/database'
import { getPasswordResetTokenByEmail } from '@/lib/services/password-reset-tokens'

export async function generatePasswordResetToken(email: string) {
  const token = uuidv4()
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken != null) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      expires_at: expiresAt,
      token
    }
  })

  return passwordResetToken
}
