import Link from 'next/link'

import TreeSelector from '@/components/navbar/tree-selector'
import SessionBar from '@/components/navbar/session'
import NewTreeButton from '@/components/navbar/new-tree-button'
import LogInButton from '@/components/navbar/login-button'
import SaveButton from '@/components/navbar/save-button'
import LinktreeLogo from '@/components/icons/linktree-logo'
import { Separator } from '@/components/ui/separator'
import { getCurrentUser } from '@/lib/services/get-current-user'

interface Props {
  treeUrl: string | undefined
}

export default async function Navbar({ treeUrl }: Props) {
  const user = await getCurrentUser()

  return (
    <>
      <header className='border-lt-light-gray/60 bg-lt-gray fixed inset-x-3 top-3 z-50 flex h-16 justify-between rounded-full border py-3 pr-3 pl-4 md:pl-6'>
        <nav className='flex min-w-0 items-center'>
          <Link
            className='text-lt-green xl:hover:text-lt-lightest-gray transition-colors'
            href='/'
          >
            <LinktreeLogo className='w-7' />
          </Link>
          <Separator
            orientation='vertical'
            className='mr-3 ml-3 h-5 md:mr-5 md:ml-4.5'
          />
          <TreeSelector treeUrl={treeUrl} />
        </nav>
        <nav className='flex items-center gap-x-2 md:gap-x-5'>
          <div className='flex h-full items-center gap-x-2 md:gap-x-3'>
            <NewTreeButton />
            {user === null ? <LogInButton /> : <SessionBar user={user} />}
          </div>
        </nav>
      </header>
      <SaveButton />
    </>
  )
}
