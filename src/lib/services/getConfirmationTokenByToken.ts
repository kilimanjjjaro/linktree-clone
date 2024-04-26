import db from '@/lib/database'

export async function getConfirmationTokenByToken(token: string) {
  try {
    const confirmationToken = await db.confirmationToken.findUnique({
      where: { token }
    })

    return confirmationToken
  } catch (error) {
    return null
  }
}
