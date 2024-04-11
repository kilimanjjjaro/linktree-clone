'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import { cn } from '@/lib/utils'

export default function SocialMediaList() {
  const linkMedia = useStore((state) => state.linkMedia)
  const setLinkMedia = useStore((state) => state.setLinkMedia)

  const removeSocialMedia = (socialMediaId: number) => {
    const newSocialMedia = linkMedia.filter(
      (socialMedia) => socialMedia.id !== socialMediaId
    )

    setLinkMedia(newSocialMedia)
  }

  return (
    <ul
      className={cn('hidden flex-wrap gap-2', linkMedia.length > 0 && 'flex')}
    >
      {linkMedia.map((media) => (
        <li
          className='flex items-center gap-x-2 rounded-full border border-lt-light-gray/60 py-1 pl-3 pr-1 text-sm leading-none'
          key={media.id}
        >
          {media.name}
          <Button
            aria-label='Remove'
            className='h-auto rounded-full p-1'
            variant='ghost'
            onClick={() => {
              removeSocialMedia(media.id)
            }}
          >
            <X className='size-3' />
          </Button>
        </li>
      ))}
    </ul>
  )
}
