import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { getCornerClassName } from '@/lib/utils/get-corner-class-name'
import { cn } from '@/lib/utils'

interface Props {
  cornerStyle: number
}

export default function PublicFooter({ cornerStyle }: Props) {
  return (
    <footer className='mt-12 flex justify-center'>
      <Link
        href='/signup'
        className={cn(
          buttonVariants({ variant: 'default' }),
          'bg-lt-white px-6 py-5 text-sm transition-transform active:scale-[0.97]',
          getCornerClassName(cornerStyle)
        )}
      >
        Join Linktree Clone
      </Link>
    </footer>
  )
}
