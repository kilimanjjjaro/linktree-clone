import db from '@/lib/database'
import { type TreeInterface } from '@/lib/types/trees'

const PUBLISHED = 1

export async function getPublishedTree(url: string) {
  try {
    const data = await db.tree.findFirst({
      where: { url, status: PUBLISHED },
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
