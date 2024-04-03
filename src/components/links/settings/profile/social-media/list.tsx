import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'

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
    <ul className='flex flex-wrap gap-2'>
      {linkMedia.map((media) => (
        <li
          className='flex items-center gap-2 rounded-full border border-border py-1 pl-3 pr-1 text-sm leading-none'
          key={media.id}
        >
          {media.link.length > 0 ? (
            <a
              className='flex items-center gap-2 transition-opacity xl:hover:opacity-70'
              href={media.link + media.inputValue}
              target='_blank'
              rel='noopener noreferrer'
            >
              {media.name}
            </a>
          ) : (
            <span className='flex items-center gap-2'>{media.name}</span>
          )}
          <Button
            className='h-auto rounded-full p-1'
            variant='ghost'
            onClick={() => {
              removeSocialMedia(media.id)
            }}
          >
            <X className='size-3' />
            <span className='sr-only'>Remove</span>
          </Button>
        </li>
      ))}
    </ul>
  )
}
