'use server'

import { signIn } from '@/lib/auth/auth'

export async function logInWithGoogle() {
  await signIn('google', {
    redirectTo: '/'
  })
}
