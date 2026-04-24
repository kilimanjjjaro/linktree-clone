import { Settings2, Trash } from 'lucide-react'
import { type TreeLink } from '@/generated/prisma/browser'

import { Button, buttonVariants } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import useLinks from '@/lib/hooks/useLinks'
import { getCornerClassName } from '@/lib/utils/get-corner-class-name'
import { cn } from '@/lib/utils'

interface Props {
  link: TreeLink
}

export default function TextLink({ link }: Props) {
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedLink = useStore((state) => state.setSelectedLink)
  const setShowAddLinkDialog = useStore((state) => state.setShowAddLinkDialog)
  const { removeLink } = useLinks()

  const cornerStyle = selectedTree?.appearance.general.cornerStyle ?? 3

  const updateLink = (link: TreeLink) => {
    setSelectedLink(link)
    setShowAddLinkDialog(true)
  }

  return (
    <div className='group relative flex items-center'>
      <a
        className={cn(
          buttonVariants({ variant: 'default' }),
          'bg-lt-white w-full py-7',
          getCornerClassName(cornerStyle)
        )}
        href={link.url}
        target='_blank'
        rel='noopener noreferrer'
      >
        {link.name}
      </a>
      <Button
        aria-label='Delete link'
        className='bg-lt-white absolute left-3 h-auto rounded-full p-1 opacity-0 transition-opacity group-hover:xl:opacity-100'
        onClick={() => {
          removeLink(link.id)
        }}
      >
        <Trash className='size-4' strokeWidth={2.5} />
      </Button>
      <Button
        aria-label='Update link'
        className='bg-lt-white absolute right-3 h-auto rounded-full p-1 opacity-0 transition-opacity group-hover:xl:opacity-100'
        onClick={() => {
          updateLink(link)
        }}
      >
        <Settings2 className='size-4' strokeWidth={2.5} />
      </Button>
    </div>
  )
}
