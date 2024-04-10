import { Lock, Plus } from 'lucide-react'
import Link from 'next/link'
import LinkSelector from '@/components/navbar/link-selector'
import LinktreeLogo from '@/components/icons/linktree-logo'
import { Button } from '@/components/ui/button'
import { Separator } from '../ui/separator'

export default function Navbar() {
  return (
    <header className='fixed inset-x-3 top-3 z-50 flex h-16 items-center justify-between rounded-full border border-lt-light-gray bg-lt-gray pl-6 pr-4'>
      <nav className='flex items-center gap-x-5'>
        <Link href='/'>
          <LinktreeLogo className='w-7' />
        </Link>
        <Separator orientation='vertical' className='h-5' />
        <LinkSelector />
      </nav>
      <nav className='flex gap-3'>
        <Button variant='outline'>
          Add new
          <Plus className='size-4' aria-hidden />
        </Button>
        <Button className='gap-x-1.5'>
          Log in
          <Lock className='size-3.5' aria-hidden />
        </Button>
      </nav>
    </header>
  )
}
