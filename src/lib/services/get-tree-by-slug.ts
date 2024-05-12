import db from '@/lib/database'

export async function getTreeBySlug(
  slug: string | undefined,
  authorId: string | undefined
) {
  if (authorId === undefined || slug === undefined || slug.length === 0)
    return null

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
