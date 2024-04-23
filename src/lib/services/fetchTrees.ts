import { auth } from '@/lib/auth'
import db from '@/lib/database'

export async function fetchTrees() {
  const session = await auth()

  if (session === null) return []

  const data = await db.tree.findMany({ where: { authorId: session.user?.id } })

  return data
}
