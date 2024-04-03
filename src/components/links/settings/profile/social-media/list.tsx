import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import SocialMediaIcon from './icon'
import { useStore } from '@/lib/store/store'

export default function SocialMediaList() {
  const linkMedia = useStore((state) => state.linkMedia)

  return (
    <ul className='flex items-center gap-2'>
      <TooltipProvider delayDuration={0}>
        {linkMedia.map((media) => (
          <li key={media.id}>
            <Tooltip>
              <TooltipTrigger>
                {media.link.length > 0 ? (
                  <a
                    aria-label={media.name}
                    className='transition-opacity xl:hover:opacity-70'
                    href={media.link + media.inputValue}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <SocialMediaIcon className='size-5' name={media.slug} />
                  </a>
                ) : (
                  <span
                    aria-label={media.name}
                    className='transition-opacity xl:hover:opacity-70'
                  >
                    <SocialMediaIcon className='size-5' name={media.slug} />
                  </span>
                )}
              </TooltipTrigger>
              <TooltipContent>
                <span>{media.name}</span>
              </TooltipContent>
            </Tooltip>
          </li>
        ))}
      </TooltipProvider>
    </ul>
  )
}
