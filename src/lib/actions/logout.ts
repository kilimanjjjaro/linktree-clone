'use server'

import { signOut } from '@/lib/auth/auth'

export async function logOut() {
  await signOut()
}
