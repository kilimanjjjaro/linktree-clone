import db from '@/lib/database'
import { TREE_STATUS } from '@/lib/constants/trees'
import { type TreeInterface } from '@/lib/types/trees'

export async function getViewableTree(url: string, viewerId?: string) {
  try {
    const data = await db.tree.findFirst({
      where: {
        url,
        OR: [
          { status: TREE_STATUS.PUBLISHED },
          ...(viewerId !== undefined ? [{ authorId: viewerId }] : [])
        ]
      },
      include: {
        links: true,
        socialProfiles: true
      }
    })

    return data as TreeInterface | null
  } catch {
    return null
  }
}
