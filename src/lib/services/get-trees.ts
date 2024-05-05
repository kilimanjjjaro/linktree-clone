import db from '@/lib/database'

export async function getTrees(authorId: string | undefined) {
  if (authorId === undefined) return []

  try {
    const data = await db.tree.findMany({
      where: { authorId },
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
