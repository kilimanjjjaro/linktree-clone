'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { logOut } from '@/lib/actions/auth/logout'
import { useStore } from '@/lib/store/store'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'

export default function LogOutButton() {
  const setSelectedTree = useStore((state) => state.setSelectedTree)

  return (
    <DropdownMenuItem
      onClick={async () => {
        setSelectedTree(DEMO_TREE_VALUES)
        await signOut()
        await logOut()
      }}
    >
      <LogOut className='mr-2 size-4' aria-hidden />
      <span>Log out</span>
    </DropdownMenuItem>
  )
}
