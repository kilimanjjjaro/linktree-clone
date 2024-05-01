import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'

export async function getTrees() {
  const user = await getCurrentUser()

  if (user === null) return []

  try {
    const data = await db.tree.findMany({
      where: { authorId: user.id },
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
