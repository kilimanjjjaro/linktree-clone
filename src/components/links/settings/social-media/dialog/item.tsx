import { ChevronRight } from 'lucide-react'
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
      <div className='flex items-center gap-x-1'>
        <span
          className={cn(
            'opacity-0 text-xs rounded-full border border-lt-lightest-gray px-2 py-1 leading-none',
            isAdded && 'opacity-100'
          )}
        >
          Added
        </span>
        <ChevronRight className='ml-auto size-4' />
      </div>
    </CommandItem>
  )
}
