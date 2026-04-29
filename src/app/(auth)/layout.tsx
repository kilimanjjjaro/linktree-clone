import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { type ChildrenType } from '@/lib/types/globals'

export default function AuthLayout({ children }: { children: ChildrenType }) {
  return (
    <main className='grid h-dvh min-h-dvh grid-cols-1 md:grid-cols-2'>
      <section className='border-lt-light-gray/60 bg-lt-gray hidden border-r md:block' />
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
