import Link from 'next/link'

import LinktreeLogo from '@/components/icons/linktree-logo'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export default function NavbarSkeleton() {
  return (
    <div className='border-lt-light-gray/60 bg-lt-gray fixed inset-x-3 top-3 z-50 flex h-16 justify-between rounded-full border py-3 pr-3 pl-6'>
      <div className='flex items-center'>
        <Link
          className='text-lt-green xl:hover:text-lt-lightest-gray transition-colors'
          href='/'
        >
          <LinktreeLogo className='w-7' />
        </Link>
        <Separator orientation='vertical' className='mr-5 ml-[18px] h-5' />
        <Skeleton className='h-6 w-[232px] rounded-full' />
      </div>
      <nav className='flex items-center gap-x-5'>
        <Skeleton className='aspect-square size-6 rounded-full' />
        <div className='flex h-full items-center gap-x-3'>
          <Skeleton className='h-full w-32 rounded-full' />
          <Skeleton className='aspect-square h-full w-auto rounded-full' />
        </div>
      </nav>
    </div>
  )
}
