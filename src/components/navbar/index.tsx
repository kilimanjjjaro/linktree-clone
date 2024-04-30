import Link from 'next/link'
import TreeSelector from './tree-selector'
import Changelog from './changelog'
import SessionBar from './session'
import NewTree from './add-tree'
import LinktreeLogo from '@/components/icons/linktree-logo'
import { Separator } from '@/components/ui/separator'
import { getTrees } from '@/lib/services/get-trees'
import { auth } from '@/lib/auth'
import LogInButton from './login-button'
import { type ExtendedTreeType } from '@/lib/types/trees'

export default async function Navbar() {
  const session = await auth()
  let trees: ExtendedTreeType[] = []

  if (session?.user?.id != null) trees = await getTrees(session.user.id)

  const userId = session?.user?.id ?? ''

  return (
    <header className='fixed inset-x-3 top-3 z-50 flex h-16 justify-between rounded-full border border-lt-light-gray/60 bg-lt-gray py-3 pl-6 pr-3'>
      <nav className='flex items-center'>
        <Link className='transition-opacity xl:hover:opacity-70' href='/'>
          <LinktreeLogo className='w-7' />
        </Link>
        <Separator orientation='vertical' className='ml-[18px] mr-5 h-5' />
        <TreeSelector trees={trees} userId={userId} />
      </nav>
      <nav className='flex gap-x-3'>
        <Changelog />
        <NewTree />
        {session?.user == null ? (
          <LogInButton />
        ) : (
          <SessionBar user={session.user} />
        )}
      </nav>
    </header>
  )
}
