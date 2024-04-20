'use client'

import { UserX } from 'lucide-react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export default function DeleteAccountButton() {
  return (
    <DropdownMenuItem>
      <UserX className='mr-2 size-4' />
      <span>Delete account</span>
    </DropdownMenuItem>
  )
}
