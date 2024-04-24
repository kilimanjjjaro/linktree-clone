import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { type ChildrenType } from '@/lib/types/globals'

export default function AuthLayout({ children }: { children: ChildrenType }) {
  return (
    <main className='grid h-dvh min-h-dvh grid-cols-2'>
      <section className='border-r border-lt-light-gray/60 bg-lt-gray' />
      <section className='relative flex items-center justify-center'>
        <Link
          className='absolute right-6 top-6 flex items-center gap-x-2 text-sm xl:hover:underline'
          href='/'
        >
          <ArrowLeft className='size-3' />
          Back
        </Link>
        {children}
      </section>
    </main>
  )
}
