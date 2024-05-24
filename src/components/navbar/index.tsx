import Link from 'next/link'

import TreeSelector from '@/components/navbar/tree-selector'
import NotificationsTab from '@/components/navbar/notifications-tab'
import SessionBar from '@/components/navbar/session'
import NewTreeButton from '@/components/navbar/new-tree-button'
import LogInButton from '@/components/navbar/login-button'
import SavingBadge from '@/components/navbar/saving-badge'
import LinktreeLogo from '@/components/icons/linktree-logo'
import { Separator } from '@/components/ui/separator'
import { getCurrentUser } from '@/lib/services/get-current-user'

export default async function Navbar({ slug }: { slug: string | undefined }) {
  const user = await getCurrentUser()

  return (
    <header className='fixed inset-x-3 top-3 z-50 flex h-16 justify-between rounded-full border border-lt-light-gray/60 bg-lt-gray py-3 pl-6 pr-3'>
      <nav className='flex items-center'>
        <Link
          className='text-lt-green transition-colors xl:hover:text-lt-lightest-gray'
          href='/'
        >
          <LinktreeLogo className='w-7' />
        </Link>
        <Separator orientation='vertical' className='ml-[18px] mr-5 h-5' />
        <TreeSelector slug={slug} userId={user?.id} />
      </nav>
      <nav className='flex items-center gap-x-5'>
        <SavingBadge />
        <NotificationsTab />
        <div className='flex h-full items-center gap-x-3'>
          <NewTreeButton />
          {user === null ? <LogInButton /> : <SessionBar user={user} />}
        </div>
      </nav>
    </header>
  )
}
