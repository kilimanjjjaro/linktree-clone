import db from '@/lib/database'

export async function getPasswordResetTokenByEmail(email: string) {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email }
    })

    return passwordResetToken
  } catch (error) {
    return null
  }
}
