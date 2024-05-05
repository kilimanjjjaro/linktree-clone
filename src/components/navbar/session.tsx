import { type DefaultSession } from 'next-auth'

import Avatar from '@/components/navbar/avatar'
import LogOutButton from '@/components/navbar/logout-button'
import DeleteAccountButton from '@/components/navbar/delete-account-button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface Props {
  user: DefaultSession['user']
}

export default async function SessionBar({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar image={user?.image} name={user?.name} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-auto'>
        <DropdownMenuGroup>
          <DeleteAccountButton />
          <DropdownMenuSeparator />
          <LogOutButton />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
