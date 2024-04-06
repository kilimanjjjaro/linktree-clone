import LinktreeLogo from '@/components/icons/linktree-logo'

export default function Navbar() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-lt-light-gray bg-lt-gray pr-6'>
      <div className='flex size-14 items-center justify-center border-r border-lt-light-gray'>
        <LinktreeLogo className='w-6' />
      </div>
    </header>
  )
}
