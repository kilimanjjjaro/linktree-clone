import { auth } from '@/lib/auth'
import db from '@/lib/database'

export async function getTrees() {
  const session = await auth()

  if (session === null) return []

  try {
    const data = await db.tree.findMany({
      where: { authorId: session.user?.id },
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
