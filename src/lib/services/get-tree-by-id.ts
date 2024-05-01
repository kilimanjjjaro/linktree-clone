import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'

export async function getTreeById(treeId: string) {
  const user = await getCurrentUser()

  if (user === null) return null

  try {
    const data = await db.tree.findUnique({
      where: { id: treeId, authorId: user.id },
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
