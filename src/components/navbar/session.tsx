import Avatar from './avatar'
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
import { auth } from '@/lib/auth'

export default async function SessionBar() {
  const session = await auth()

  console.log('SESSION: ', session)

  if (session === null) return <LogInButton />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar image={session.user?.image} />
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
