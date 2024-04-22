'use client'

import { Button } from '@/components/ui/button'
import { GoogleIcon } from '@/components/icons/google-icon'
import { logInWithGoogle } from '@/lib/actions/auth/login-with-google'

export default function GoogleButton() {
  return (
    <Button variant='secondary' onClick={async () => await logInWithGoogle()}>
      <GoogleIcon className='size-5' aria-hidden />
      Google
    </Button>
  )
}
