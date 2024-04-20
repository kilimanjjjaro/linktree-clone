'use server'

import { signIn } from '@/lib/auth/auth'

export async function logInWithGitHub() {
  await signIn('github', {
    redirectTo: '/'
  })
}
