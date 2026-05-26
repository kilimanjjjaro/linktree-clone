import { v4 as uuidv4 } from 'uuid'

import db from '@/lib/database'
import { getConfirmationTokenByEmail } from '@/lib/services/confirmation-token'

export async function generateConfirmationToken(email: string) {
  const token = uuidv4()
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getConfirmationTokenByEmail(email)

  if (existingToken != null) {
    await db.confirmationToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const confirmationToken = await db.confirmationToken.create({
    data: {
      email,
      expires_at: expiresAt,
      token
    }
  })

  return confirmationToken
}
