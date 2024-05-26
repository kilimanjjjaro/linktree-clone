'use server'

import { signOut } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function logOut() {
  await signOut()
  revalidatePath('/')
}
