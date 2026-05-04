import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import DitherBackground from '@/components/dither-background'
import LinktreeLogo from '@/components/icons/linktree-logo'
import { type ChildrenType } from '@/lib/types/globals'

export default function AuthLayout({ children }: { children: ChildrenType }) {
  return (
    <main className='grid h-dvh min-h-dvh grid-cols-1 md:grid-cols-2'>
      <section className='border-lt-light-gray/60 bg-lt-gray relative hidden items-center justify-center overflow-hidden border-r md:flex'>
        <DitherBackground />
        <LinktreeLogo className='text-lt-white pointer-events-none absolute size-16 mix-blend-difference' />
      </section>
      <section className='relative flex items-center justify-center px-4'>
        <Link
          className='absolute top-6 right-6 flex items-center gap-x-2 text-sm xl:hover:underline'
          href='/'
        >
          <ArrowLeft className='size-3' aria-hidden />
          Back
        </Link>
        {children}
      </section>
    </main>
  )
}
