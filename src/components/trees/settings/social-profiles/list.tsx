'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import { cn } from '@/lib/utils'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function SocialProfilesList() {
  const socialProfiles = useStore((state) => state.socialProfiles)
  const setSocialProfiles = useStore((state) => state.setSocialProfiles)
  const [parent] = useAutoAnimate({ duration: 200 })

  const removeSocialProfile = (socialProfileId: number) => {
    const filteredSocialProfiles = socialProfiles.filter(
      (socialProfile) => socialProfile.id !== socialProfileId
    )

    setSocialProfiles(filteredSocialProfiles)
  }

  return (
    <ul
      ref={parent}
      className={cn(
        'hidden flex-wrap gap-2',
        socialProfiles.length > 0 && 'flex'
      )}
    >
      {socialProfiles.map((socialProfile) => (
        <li
          className='flex items-center gap-x-2 rounded-full border border-lt-light-gray/60 py-1 pl-3 pr-1 text-sm leading-none'
          key={socialProfile.id}
        >
          {socialProfile.name}
          <Button
            aria-label='Remove'
            className='h-auto rounded-full p-1'
            variant='ghost'
            onClick={() => {
              removeSocialProfile(socialProfile.id)
            }}
          >
            <X className='size-3' />
          </Button>
        </li>
      ))}
    </ul>
  )
}
