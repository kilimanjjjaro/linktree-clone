'use client'

import { Button } from '@/components/ui/button'
import { GitHubIcon } from '@/components/icons/github-icon'
import { PENDING_WELCOME_TOAST_KEY } from '@/components/auth/welcome-toast'
import { logInWithGitHub } from '@/lib/actions/auth/login-with-github'

export default function GitHubButton() {
  return (
    <Button
      variant='secondary'
      onClick={async () => {
        sessionStorage.setItem(PENDING_WELCOME_TOAST_KEY, '1')
        await logInWithGitHub()
      }}
    >
      <GitHubIcon className='size-5' aria-hidden />
      GitHub
    </Button>
  )
}
