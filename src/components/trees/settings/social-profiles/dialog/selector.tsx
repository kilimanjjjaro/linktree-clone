import SocialProfile from "@/components/trees/settings/social-profiles/dialog/item"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList
} from "@/components/ui/command"
import { SOCIAL_PROFILES } from "@/lib/constants/social-profiles"

export default function SocialProfilesSelector() {
  return (
    <Command className="mt-12">
      <CommandInput placeholder="Type to search..." />
      <CommandList>
        <CommandEmpty>No social profiles found.</CommandEmpty>
        <CommandGroup>
          {SOCIAL_PROFILES.map((socialProfile) => (
            <SocialProfile
              key={socialProfile.type}
              socialProfile={socialProfile}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
