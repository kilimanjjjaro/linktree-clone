'use client'

import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logOut } from '@/lib/actions/logout'

export default function LogOutButton() {
  return (
    <Button className='h-full' onClick={async () => await logOut()}>
      Log Out
      <Lock className='size-3.5' aria-hidden />
    </Button>
  )
}
