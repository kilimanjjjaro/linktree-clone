import db from '@/lib/database'

export async function getConfirmationTokenByEmail(email: string) {
  try {
    const confirmationToken = await db.confirmationToken.findFirst({
      where: {
        email
      }
    })

    return confirmationToken
  } catch (error) {
    return null
  }
}
