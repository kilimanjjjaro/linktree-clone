import db from '@/lib/database'

export async function getTrees(userId: string) {
  console.log('asdasd')
  if (userId.length === 0) return []

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
