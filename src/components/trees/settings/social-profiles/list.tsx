'use client'

import { X } from 'lucide-react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { type Prisma } from '@/generated/prisma/browser'

import { useStore } from '@/lib/store/store'
import useSocialProfiles from '@/lib/hooks/useSocialProfiles'
import { cn } from '@/lib/utils'
import { SOCIAL_PROFILES } from '@/lib/constants/social-profiles'

interface Props {
  setOpen: (open: boolean) => void
}

export default function SocialProfilesList({ setOpen }: Props) {
  const setStep = useStore((state) => state.setStep)
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedSocialProfile = useStore(
    (state) => state.setSelectedSocialProfile
  )
  const [parent] = useAutoAnimate({ duration: 200 })
  const { removeProfile } = useSocialProfiles()

  const updateSocialProfile = (
    socialProfile: Prisma.TreeSocialProfileUpdateInput
  ) => {
    const profileToUpdate = SOCIAL_PROFILES.find(
      (profile) => profile.type === socialProfile.type
    )

    if (profileToUpdate !== undefined) {
      setStep(2)
      setSelectedSocialProfile(profileToUpdate)
      setOpen(true)
    }
  }

  if (selectedTree === null) return

  return (
    <ul
      ref={parent}
      className={cn(
        'hidden flex-wrap gap-2',
        selectedTree.socialProfiles.length > 0 && 'flex'
      )}
    >
      {selectedTree.socialProfiles.map((socialProfile) => (
        <li
          className='border-lt-light-gray/60 has-[:hover]:bg-lt-light-gray flex items-center gap-x-1 rounded-full border pr-1 text-sm leading-none transition-colors'
          key={socialProfile.type}
        >
          <button
            aria-label='Update URL'
            className='py-1.5 pl-3'
            onClick={() => {
              updateSocialProfile(socialProfile)
            }}
          >
            {socialProfile.name}
          </button>
          <button
            aria-label='Remove'
            className='xl:hover:bg-lt-gray h-auto rounded-full p-1 transition-colors'
            onClick={async () => {
              await removeProfile(socialProfile.type)
            }}
          >
            <X className='size-3' aria-hidden />
          </button>
        </li>
      ))}
    </ul>
  )
}
