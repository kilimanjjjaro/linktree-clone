import { Lock, Plus } from 'lucide-react'
import Link from 'next/link'
import LinkSelector from './link-selector'
import LinktreeLogo from '@/components/icons/linktree-logo'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function Navbar() {
  return (
    <header className='fixed inset-x-3 top-3 z-50 flex h-16 justify-between rounded-full border border-lt-light-gray/60 bg-lt-gray py-3 pl-6 pr-3'>
      <nav className='flex items-center'>
        <Link className='transition-opacity xl:hover:opacity-70' href='/'>
          <LinktreeLogo className='w-7' />
        </Link>
        <Separator orientation='vertical' className='ml-[18px] mr-5 h-5' />
        <LinkSelector />
      </nav>
      <nav className='flex gap-x-3'>
        <Button variant='outline' className='h-full'>
          Add new
          <Plus className='size-4' aria-hidden />
        </Button>
        <Button className='h-full gap-x-1.5'>
          Log in
          <Lock className='size-3.5' aria-hidden />
        </Button>
      </nav>
    </header>
  )
}
