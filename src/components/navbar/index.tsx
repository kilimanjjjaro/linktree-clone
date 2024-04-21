import { Suspense } from 'react'
import Link from 'next/link'
import TreeSelector from './tree-selector'
import Changelog from './changelog'
import SessionBar from './session'
import NewTree from './add-tree'
import LinktreeLogo from '@/components/icons/linktree-logo'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default async function Navbar() {
  return (
    <header className='fixed inset-x-3 top-3 z-50 flex h-16 justify-between rounded-full border border-lt-light-gray/60 bg-lt-gray py-3 pl-6 pr-3'>
      <nav className='flex items-center'>
        <Link className='transition-opacity xl:hover:opacity-70' href='/'>
          <LinktreeLogo className='w-7' />
        </Link>
        <Separator orientation='vertical' className='ml-[18px] mr-5 h-5' />
        <TreeSelector />
      </nav>
      <nav className='flex gap-x-3'>
        <Changelog />
        <NewTree />
        <Suspense
          fallback={
            <Skeleton className='aspect-square h-full w-auto rounded-full' />
          }
        >
          <SessionBar />
        </Suspense>
      </nav>
    </header>
  )
}
