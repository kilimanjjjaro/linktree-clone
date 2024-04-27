import db from '@/lib/database'

export async function getPasswordResetTokenByToken(token: string) {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token }
    })

    return passwordResetToken
  } catch (error) {
    return null
  }
}
