'use client'

import { Button } from '@/components/ui/button'
import { GoogleIcon } from '@/components/icons/google-icon'
import { PENDING_WELCOME_TOAST_KEY } from '@/components/auth/welcome-toast'
import { logInWithGoogle } from '@/lib/actions/auth/login-with-google'

export default function GoogleButton() {
  return (
    <Button
      variant='secondary'
      onClick={async () => {
        sessionStorage.setItem(PENDING_WELCOME_TOAST_KEY, '1')
        await logInWithGoogle()
      }}
    >
      <GoogleIcon className='size-5' aria-hidden />
      Google
    </Button>
  )
}
