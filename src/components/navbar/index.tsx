import { Lock, Share } from 'lucide-react'
import Link from 'next/link'
import LinkSelector from '@/components/navbar/link-selector'
import LinktreeLogo from '@/components/icons/linktree-logo'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 flex h-14 border-b border-lt-light-gray bg-lt-gray'>
      <Link
        className='flex size-14 shrink-0 items-center justify-center border-r border-lt-light-gray transition-colors xl:hover:bg-lt-light-gray'
        href='/'
      >
        <LinktreeLogo className='w-6' />
      </Link>
      <div className='flex w-full items-center justify-between px-4 py-2'>
        <nav>
          <LinkSelector />
        </nav>
        <nav className='flex gap-2'>
          <Button variant='ghost' className='gap-x-1.5'>
            Share
            <Share className='size-3.5' />
          </Button>
          <Button variant='outline' className='gap-x-1.5'>
            Log in
            <Lock className='size-3.5' />
          </Button>
        </nav>
      </div>
    </header>
  )
}
