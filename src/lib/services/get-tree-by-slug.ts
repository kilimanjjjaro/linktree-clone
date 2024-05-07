import db from '@/lib/database'

export async function getTreeBySlug(slug: string, authorId: string) {
  try {
    const data = await db.tree.findFirst({
      where: { slug, authorId },
      include: {
        links: true,
        socialProfiles: true
      }
    })

    return data
  } catch (error) {
    return null
  }
}
