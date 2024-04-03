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
    <Command className='rounded-none'>
      <CommandInput placeholder='Type to search...' className='h-10 py-0' />
      <CommandList className='mt-5 h-60'>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup className='py-0 pl-0'>
          {SOCIAL_MEDIA.map((media) => (
            <SocialMediaItem key={media.id} media={media} />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
