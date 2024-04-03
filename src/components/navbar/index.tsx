import LinktreeLogo from '@/components/icons/linktree-logo'
import LinksIcon from '@/components/icons/links-icon'
import Avatar from '@/components/ui/avatar'
import Notifications from './notifications'

export default function Navbar() {
  return (
    <header className='fixed inset-x-4 top-4 z-50 flex items-center justify-between rounded-full border border-border bg-background py-3 pl-6 pr-3'>
      <div className='flex items-center gap-x-6'>
        <LinktreeLogo className='w-6' />
        <nav className='flex items-center gap-x-5'>
          <button className='flex items-center gap-x-2 text-sm'>
            <LinksIcon className='size-4' />
            <span>Links</span>
          </button>
        </nav>
      </div>
      <div className='flex gap-x-5'>
        <Notifications />
        <button
          aria-label='Avatar of Gonzalo'
          className='group flex items-center gap-x-4'
        >
          <Avatar
            className='size-10 outline outline-2 outline-offset-2 outline-transparent transition-[outline] xl:group-hover:outline-border'
            src='/images/default-user-avatar.svg'
            alt='Gonzalo'
          />
        </button>
      </div>
    </header>
  )
}
