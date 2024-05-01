import { auth } from '../auth'

export async function getCurrentUser() {
  const session = await auth()

  if (session?.user === undefined) return null

  return session.user
}
