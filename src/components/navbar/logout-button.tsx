'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { logOut } from '@/lib/actions/auth/logout'

export default function LogOutButton() {
  return (
    <DropdownMenuItem
      onClick={async () => {
        await signOut()
        await logOut()
      }}
    >
      <LogOut className='mr-2 size-4' aria-hidden />
      <span>Log out</span>
    </DropdownMenuItem>
  )
}
