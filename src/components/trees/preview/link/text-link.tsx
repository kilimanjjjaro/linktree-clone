import { Settings2 } from 'lucide-react'
import { type TreeLink } from '@prisma/client'

import { Button, buttonVariants } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import { cn } from '@/lib/utils'

interface Props {
  link: TreeLink
  setOpen: (value: boolean) => void
}

export default function TextLink({ link, setOpen }: Props) {
  const setSelectedLink = useStore((state) => state.setSelectedLink)

  const updateLink = (link: TreeLink) => {
    setSelectedLink(link)
    setOpen(true)
  }

  return (
    <div className='relative flex items-center'>
      <a
        className={cn(
          buttonVariants({ variant: 'default' }),
          'py-7 rounded-2xl bg-lt-white w-full'
        )}
        href={link.url}
        target='_blank'
        rel='noopener noreferrer'
      >
        {link.name}
      </a>
      <Button
        aria-label='Update link'
        className='absolute right-3 z-20 h-auto rounded-full bg-lt-white p-1 mix-blend-difference'
        onClick={() => {
          updateLink(link)
        }}
      >
        <Settings2 className='size-4' strokeWidth={2.5} />
      </Button>
    </div>
  )
}
