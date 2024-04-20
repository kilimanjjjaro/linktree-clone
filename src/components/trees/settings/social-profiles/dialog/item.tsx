import { ChevronRight } from 'lucide-react'
import { CommandItem } from '@/components/ui/command'
import SocialProfileIcon from '@/components/trees/settings/social-profiles/icon'
import { useStore } from '@/lib/store/store'
import { cn } from '@/lib/utils'
import type { SocialProfileInterface } from '@/lib/types/globals'

interface Props {
  socialProfile: SocialProfileInterface
}

export default function SocialProfile({ socialProfile }: Props) {
  const socialProfiles = useStore((state) => state.socialProfiles)
  const setSelectedSocialProfile = useStore(
    (state) => state.setSelectedSocialProfile
  )
  const setStep = useStore((state) => state.setStep)

  const selectSocialProfile = (socialProfile: SocialProfileInterface) => {
    if (isAdded) return

    setSelectedSocialProfile(socialProfile)
    setStep(2)
  }

  const isAdded = socialProfiles.some((item) => item.id === socialProfile.id)

  return (
    <CommandItem
      key={socialProfile.id}
      value={socialProfile.slug}
      onSelect={() => {
        selectSocialProfile(socialProfile)
      }}
    >
      <span className='flex items-center gap-x-2'>
        <SocialProfileIcon className='size-5' name={socialProfile.slug} />
        {socialProfile.name}
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
