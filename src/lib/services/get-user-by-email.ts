import db from '@/lib/database'

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email
      }
    })

    return user
  } catch (error) {
    return null
  }
}
