import SocialMediaItem from './item'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList
} from '@/components/ui/command'
import { SOCIAL_MEDIA } from '@/lib/constants/social-media'

export default function SocialMediaSelector() {
  return (
    <Command>
      <CommandInput placeholder='Type to search...' />
      <CommandList className='mt-5 h-60'>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {SOCIAL_MEDIA.map((media) => (
            <SocialMediaItem key={media.id} media={media} />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
