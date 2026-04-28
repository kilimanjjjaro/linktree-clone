'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import SocialProfileIcon from '@/components/trees/settings/social-profiles/icon'
import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/lib/store/store'
import { getSocialProfileUrl } from '@/lib/utils/get-social-profile-url'

export default function TreeSocialProfiles() {
  const selectedTree = useStore((state) => state.selectedTree)
  const isStoreReady = useStore((state) => state.isStoreReady)
  const [parent] = useAutoAnimate({ duration: 200 })

  if (!isStoreReady) {
    return (
      <div className='mt-4 flex flex-wrap items-center justify-center gap-3 px-6'>
        <Skeleton className='size-7 rounded-full' />
        <Skeleton className='size-7 rounded-full' />
        <Skeleton className='size-7 rounded-full' />
        <Skeleton className='size-7 rounded-full' />
      </div>
    )
  }

  if (selectedTree.socialProfiles.length === 0) return

  return (
    <ul
      ref={parent}
      className='mt-4 flex flex-wrap items-center justify-center gap-3 px-6 mix-blend-difference'
    >
      {selectedTree.socialProfiles.map((socialProfile) => (
        <a
          key={socialProfile.type}
          className='size-7 rounded-full bg-zinc-400 p-1 text-black transition active:scale-90 xl:hover:bg-zinc-200'
          href={getSocialProfileUrl(socialProfile.type, socialProfile.url)}
          target='_blank'
          rel='noopener noreferrer'
        >
          <SocialProfileIcon icon={socialProfile.type} className='size-full' />
        </a>
      ))}
    </ul>
  )
}
