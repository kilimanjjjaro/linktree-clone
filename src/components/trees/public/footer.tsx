import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { getCornerClassName } from '@/lib/utils/get-corner-class-name'
import { cn } from '@/lib/utils/cn'

interface Props {
  cornerStyle: number
}

export default function PublicFooter({ cornerStyle }: Props) {
  return (
    <footer className='mt-12 flex flex-col items-center gap-6'>
      <Link
        href='/signup'
        className={cn(
          buttonVariants({ variant: 'default' }),
          'bg-lt-white px-6 py-5 text-sm transition-transform xl:active:scale-[0.97]',
          getCornerClassName(cornerStyle)
        )}
      >
        Join Linktree Clone
      </Link>
      <p className='text-center text-xs text-zinc-400'>
        Clone developed by{' '}
        <a
          href='https://www.linkedin.com/in/gonzaloemanuelcastillo/'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-lt-white underline-offset-2 transition-colors hover:underline'
        >
          Gonzalo Castillo
        </a>
        {' · '}
        <a
          href='https://github.com/kilimanjjjaro/linktree-clone'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-lt-white underline-offset-2 transition-colors hover:underline'
        >
          GitHub
        </a>
      </p>
    </footer>
  )
}
