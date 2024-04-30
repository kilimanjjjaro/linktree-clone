import Avatar from './avatar'
import LogOutButton from './logout-button'
import DeleteAccountButton from './delete-account-button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export default async function SessionBar({ user }: { user: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='relative aspect-square h-full w-auto overflow-hidden rounded-full border border-lt-light-gray/60 outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-lt-white focus-visible:ring-offset-2 focus-visible:ring-offset-lt-gray xl:hover:opacity-70'>
          <Avatar image={user.image} />
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
