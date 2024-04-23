'use server'

import { signIn } from '../../auth'

export async function logInWithGoogle() {
  await signIn('google', {
    redirectTo: '/'
  })
}
