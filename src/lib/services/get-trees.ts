import db from '@/lib/database'

export async function getTrees(userId: string | undefined) {
  if (userId === undefined) return []

  try {
    const data = await db.tree.findMany({
      where: { authorId: userId },
      include: {
        links: true,
        socialProfiles: true
      }
    })

    return data
  } catch (error) {
    return []
  }
}
