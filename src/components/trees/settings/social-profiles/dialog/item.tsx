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
  const setStep = useStore((state) => state.setStep)
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedSocialProfile = useStore(
    (state) => state.setSelectedSocialProfile
  )

  const selectSocialProfile = (socialProfile: SocialProfileInterface) => {
    setSelectedSocialProfile(socialProfile)
    setStep(2)
  }

  if (selectedTree === null) return

  const isAdded = selectedTree.socialProfiles.some(
    (item) => item.type === socialProfile.type
  )

  return (
    <CommandItem
      key={socialProfile.type}
      value={socialProfile.type}
      onSelect={() => {
        selectSocialProfile(socialProfile)
      }}
    >
      <span className='flex items-center gap-x-2'>
        <SocialProfileIcon className='size-5' icon={socialProfile.type} />
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
        <ChevronRight className='ml-auto size-4' aria-hidden />
      </div>
    </CommandItem>
  )
}
