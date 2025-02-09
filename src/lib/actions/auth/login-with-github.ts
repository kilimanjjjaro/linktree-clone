'use server'

import { signIn } from '@/lib/auth'

export async function logInWithGitHub() {
  await signIn('github', {
    redirectTo: '/'
  })
}
