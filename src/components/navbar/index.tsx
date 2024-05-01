import Link from 'next/link'

import TreeSelector from '@/components/navbar/tree-selector'
import Changelog from '@/components/navbar/changelog'
import SessionBar from '@/components/navbar/session'
import NewTree from '@/components/navbar/add-tree'
import LogInButton from '@/components/navbar/login-button'
import LinktreeLogo from '@/components/icons/linktree-logo'
import { Separator } from '@/components/ui/separator'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { getTrees } from '@/lib/services/get-trees'

export default async function Navbar() {
  const user = await getCurrentUser()
  const trees = await getTrees()

  return (
    <header className='fixed inset-x-3 top-3 z-50 flex h-16 justify-between rounded-full border border-lt-light-gray/60 bg-lt-gray py-3 pl-6 pr-3'>
      <nav className='flex items-center'>
        <Link className='transition-opacity xl:hover:opacity-70' href='/'>
          <LinktreeLogo className='w-7' />
        </Link>
        <Separator orientation='vertical' className='ml-[18px] mr-5 h-5' />
        <TreeSelector trees={trees} />
      </nav>
      <nav className='flex gap-x-3'>
        <Changelog />
        <NewTree />
        {user === null ? <LogInButton /> : <SessionBar user={user} />}
      </nav>
    </header>
  )
}
