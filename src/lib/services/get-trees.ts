import db from '@/lib/database'

export async function getTrees (authorId: string) {
  try {
    const data = await db.tree.findMany({
      where: { authorId },
      include: {
        links: true,
        socialProfiles: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return data
  } catch (error) {
    return []
  }
}
