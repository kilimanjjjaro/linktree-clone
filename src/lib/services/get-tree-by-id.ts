import { auth } from '@/lib/auth'
import db from '@/lib/database'

export async function getTreeById(treeId: string) {
  const session = await auth()

  if (session === null) return null

  try {
    const data = await db.tree.findUnique({
      where: { id: treeId },
      include: {
        links: true,
        socialProfiles: true
      }
    })

    console.log(data)

    return data
  } catch (error) {
    return null
  }
}
