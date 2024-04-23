'use server'

import { signIn } from '../../auth'

export async function logInWithGitHub() {
  await signIn('github', {
    redirectTo: '/'
  })
}
