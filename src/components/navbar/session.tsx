import Image from 'next/image'
import { type DefaultSession } from 'next-auth'

import LogOutButton from '@/components/navbar/logout-button'
import DeleteAccountButton from '@/components/navbar/delete-account-button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'

interface Props {
  user: DefaultSession['user']
}

export default async function SessionBar ({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='relative flex aspect-square h-full items-center justify-center overflow-hidden rounded-full border border-lt-light-gray/60 outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-lt-white focus-visible:ring-offset-2 focus-visible:ring-offset-lt-gray xl:hover:opacity-70'>
          {user !== undefined
            ? (
            <Image
              className='absolute size-full object-cover object-center'
              src={user.image ?? DEMO_TREE_VALUES.avatar}
              alt={`${user.name}'s avatar`}
              width={50}
              height={50}
              priority
            />
              )
            : (
            <Skeleton className='aspect-square h-full rounded-full' />
              )}
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
