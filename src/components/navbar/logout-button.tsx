'use client'

import { LogOut } from 'lucide-react'
import { logOut } from '@/lib/actions/auth/logout'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export default function LogOutButton() {
  return (
    <DropdownMenuItem
      onClick={async () => {
        await logOut()
      }}
    >
      <LogOut className='mr-2 size-4' />
      <span>Log out</span>
    </DropdownMenuItem>
  )
}
