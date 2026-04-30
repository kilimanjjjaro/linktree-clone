import { Settings2, Trash } from 'lucide-react'
import { type TreeLink } from '@/generated/prisma/browser'

import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store-provider'
import useLinks from '@/lib/hooks/useLinks'
import { getCornerClassName } from '@/lib/utils/get-corner-class-name'
import { cn } from '@/lib/utils'

interface Props {
  link: TreeLink
}

export default function FeaturedLink({ link }: Props) {
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
    <div className='group relative transition-transform xl:active:scale-[0.97]'>
      <a href={link.url} target='_blank' rel='noopener noreferrer'>
        <div
          className={cn(
            'relative flex aspect-video items-end overflow-hidden bg-cover bg-center',
            getCornerClassName(cornerStyle)
          )}
          style={{
            backgroundImage: `url(${link.image ?? ''})`
          }}
        >
          <div className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 to-black/0' />
          <div className='z-10 p-5'>
            <h3 className='text-xl leading-none text-balance'>{link.name}</h3>
          </div>
        </div>
      </a>
      <Button
        aria-label='Delete link'
        className='bg-lt-white absolute top-3 left-3 h-auto rounded-full p-1 opacity-0 transition-opacity group-hover:xl:opacity-100'
        onClick={() => {
          removeLink(link.id)
        }}
      >
        <Trash className='size-4' strokeWidth={2.5} />
      </Button>
      <Button
        aria-label='Update link'
        className='bg-lt-white absolute top-3 right-3 h-auto rounded-full p-1 opacity-0 transition-opacity group-hover:xl:opacity-100'
        onClick={() => {
          updateLink(link)
        }}
      >
        <Settings2 className='size-4' strokeWidth={2.5} />
      </Button>
    </div>
  )
}
