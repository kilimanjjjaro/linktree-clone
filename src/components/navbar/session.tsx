import Image from 'next/image'
import LogInButton from './login-button'
import LogOutButton from './logout-button'
import DeleteAccountButton from './delete-account-button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { auth } from '@/lib/auth/auth'

export default async function Session() {
  const session = await auth()

  return (
    <>
      {session === null ? (
        <LogInButton />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='relative aspect-square h-full w-auto overflow-hidden rounded-full border border-lt-light-gray/60 outline-none ring-lt-white ring-offset-2 ring-offset-lt-gray transition-[box-shadow,opacity] focus-visible:ring-2 xl:hover:opacity-70'>
              <Image
                className='absolute h-auto w-full object-cover object-center'
                src='/images/default-user-avatar.svg'
                alt='Gonzalo'
                fill
                sizes='(max-width: 768px) 100vw, 33vw'
              />
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
      )}
    </>
  )
}
