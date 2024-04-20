import SocialProfile from './item'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList
} from '@/components/ui/command'
import { SOCIAL_PROFILES } from '@/lib/constants/social-profiles'

export default function SocialProfilesSelector() {
  return (
    <Command className='mt-12'>
      <CommandInput placeholder='Type to search...' />
      <CommandList>
        <CommandEmpty>No social profiles found.</CommandEmpty>
        <CommandGroup>
          {SOCIAL_PROFILES.map((socialProfile) => (
            <SocialProfile
              key={socialProfile.id}
              socialProfile={socialProfile}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
