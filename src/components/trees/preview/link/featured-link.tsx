import { Settings2, Trash } from 'lucide-react'
import { type TreeLink } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import useLinks from '@/lib/hooks/useLinks'

export default function FeaturedLink ({ link }: { link: TreeLink }) {
  const setSelectedLink = useStore((state) => state.setSelectedLink)
  const setShowAddLinkDialog = useStore((state) => state.setShowAddLinkDialog)
  const { removeLink } = useLinks()

  const updateLink = (link: TreeLink) => {
    setSelectedLink(link)
    setShowAddLinkDialog(true)
  }

  return (
    <div className='group relative'>
      <a href={link.url} target='_blank' rel='noopener noreferrer'>
        <div
          className='relative flex aspect-video items-end overflow-hidden rounded-2xl bg-cover bg-center'
          style={{
            backgroundImage: `url(${link.image ?? ''})`
          }}
        >
          <div className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 to-black/0' />
          <div className='z-10 p-5'>
            <h3 className='text-balance text-xl leading-none'>{link.name}</h3>
          </div>
        </div>
      </a>
      <Button
        aria-label='Delete link'
        className='absolute left-3 top-3 h-auto rounded-full bg-lt-white p-1 opacity-0 transition-opacity group-hover:xl:opacity-100'
        onClick={async () => {
          await removeLink(link.id)
        }}
      >
        <Trash className='size-4' strokeWidth={2.5} />
      </Button>
      <Button
        aria-label='Update link'
        className='absolute right-3 top-3 h-auto rounded-full bg-lt-white p-1 opacity-0 transition-opacity group-hover:xl:opacity-100'
        onClick={() => {
          updateLink(link)
        }}
      >
        <Settings2 className='size-4' strokeWidth={2.5} />
      </Button>
    </div>
  )
}
