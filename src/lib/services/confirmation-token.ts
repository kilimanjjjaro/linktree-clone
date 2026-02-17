import db from '@/lib/database'

export async function getConfirmationTokenByEmail(email: string) {
  try {
    const confirmationToken = await db.confirmationToken.findFirst({
      where: {
        email
      }
    })

    return confirmationToken
  } catch {
    return null
  }
}

export async function getConfirmationTokenByToken(token: string) {
  try {
    const confirmationToken = await db.confirmationToken.findUnique({
      where: { token }
    })

    return confirmationToken
  } catch {
    return null
  }
}
