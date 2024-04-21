import { auth } from '@/lib/auth'
import db from '@/lib/database'
import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'

export async function fetchTrees() {
  const session = await auth()

  if (session === null) return [DEFAULT_THREE_VALUE]

  const data = await db.tree.findMany({ where: { authorId: session.user?.id } })

  return data
}
