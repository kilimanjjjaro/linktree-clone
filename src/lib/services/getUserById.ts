import db from '@/lib/database'

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id
      }
    })

    return user
  } catch (error) {
    return null
  }
}
