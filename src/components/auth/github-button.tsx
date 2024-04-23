'use client'

import { Button } from '@/components/ui/button'
import { GitHubIcon } from '@/components/icons/github-icon'
import { logInWithGitHub } from '@/lib/actions/auth/login-with-github'

export default function GitHubButton() {
  return (
    <Button
      variant='secondary'
      onClick={async () => {
        await logInWithGitHub()
      }}
    >
      <GitHubIcon className='size-5' aria-hidden />
      GitHub
    </Button>
  )
}
