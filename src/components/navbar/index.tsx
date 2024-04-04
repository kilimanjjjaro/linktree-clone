import LinktreeLogo from '@/components/icons/linktree-logo'
import LinksIcon from '@/components/icons/links-icon'
import Avatar from '@/components/ui/custom/avatar'
import Notifications from './notifications'

export default function Navbar() {
  return (
    <header className='fixed inset-x-4 top-4 z-50 flex items-center justify-between rounded-full border border-tl-light-gray bg-tl-gray py-3 pl-6 pr-3'>
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
            className='size-10 ring-tl-light-gray'
            src='/images/default-user-avatar.svg'
            alt='Gonzalo'
          />
        </button>
      </div>
    </header>
  )
}
