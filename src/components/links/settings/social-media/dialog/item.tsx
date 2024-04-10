import { Check, ChevronRight } from 'lucide-react'
import { CommandItem } from '@/components/ui/command'
import MediaIcon from '@/components/links/settings/social-media/icon'
import { useStore } from '@/lib/store/store'
import { cn } from '@/lib/utils'
import type { SocialMediaInterface } from '@/lib/types/globals'

interface Props {
  media: SocialMediaInterface
}

export default function SocialMediaItem({ media }: Props) {
  const linkMedia = useStore((state) => state.linkMedia)
  const setSelectedMedia = useStore((state) => state.setSelectedMedia)
  const setStep = useStore((state) => state.setStep)

  const selectSocialMedia = (media: SocialMediaInterface) => {
    if (isAdded) return

    setSelectedMedia(media)
    setStep(2)
  }

  const isAdded = linkMedia.some((item) => item.id === media.id)

  return (
    <CommandItem
      key={media.id}
      value={media.slug}
      onSelect={() => {
        selectSocialMedia(media)
      }}
    >
      <span className='flex items-center gap-x-2'>
        <MediaIcon className='size-5' name={media.slug} />
        {media.name}
      </span>
      <span className='flex items-center gap-x-2'>
        <Check
          aria-label='Already added!'
          className={cn('mr-2 h-4 w-4 opacity-0', isAdded && 'opacity-100')}
        />
        <ChevronRight aria-label='Options' className='ml-auto size-4' />
      </span>
    </CommandItem>
  )
}
