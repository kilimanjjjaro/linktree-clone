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
        <button className='relative aspect-square h-full w-auto overflow-hidden rounded-full border border-lt-light-gray/50 outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-lt-white focus-visible:ring-offset-2 focus-visible:ring-offset-lt-gray xl:hover:opacity-70'>
          <Avatar image={user?.image} />
          <span className='sr-only'>Profile</span>
        </button>
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
