import { useSession } from 'next-auth/react'

export default function useCurrentUser() {
  const session = useSession()

  if (session?.data?.user == null) return null

  return session.data.user
}
