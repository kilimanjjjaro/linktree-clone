import Image from 'next/image'
import LinktreeLogo from '@/components/icons/linktree-logo'
import LinksIcon from '@/components/icons/links-icon'

export default function Navbar() {
  return (
    <header className='bg-linktree-dark-gray fixed left-4 right-4 top-4 flex items-center justify-between rounded-full border border-neutral-900 py-3 pl-6 pr-3'>
      <div className='flex items-center gap-x-6'>
        <LinktreeLogo className='w-6' />
        <nav className='flex items-center gap-x-5'>
          <button className='text-linktree-white flex items-center gap-x-2 text-sm'>
            <LinksIcon className='size-4' />
            <span>Links</span>
          </button>
        </nav>
      </div>
      <button className='group flex items-center gap-x-4'>
        <span>Hi, Gonzalo!</span>
        <div className='xl:group-hover:outline-linktree-green outline-3 relative size-10 overflow-hidden rounded-full outline outline-offset-2 outline-transparent transition-[outline] duration-300 ease-in-out'>
          <Image
            className='absolute rounded-full object-cover object-center'
            src='/images/avatar.webp'
            alt='Gonzalo'
            fill
            sizes='40px'
          />
        </div>
      </button>
    </header>
  )
}
