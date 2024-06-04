'use client'

import SocialProfileIcon from '@/components/trees/settings/social-profiles/icon'
import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/lib/store/store'

export default function TreeSocialProfiles() {
  const selectedTree = useStore((state) => state.selectedTree)

  if (selectedTree === null) {
    return (
      <div className='mt-4 flex flex-wrap items-center justify-center gap-3 px-6'>
        <Skeleton className='size-7 rounded-full' />
        <Skeleton className='size-7 rounded-full' />
        <Skeleton className='size-7 rounded-full' />
        <Skeleton className='size-7 rounded-full' />
      </div>
    )
  }

  return (
    <ul className='mt-4 flex flex-wrap items-center justify-center gap-3 px-6'>
      {selectedTree.socialProfiles.map((socialProfile) => (
        <a
          key={socialProfile.type}
          className='size-7 rounded-full bg-zinc-400 p-1 text-black transition-colors xl:hover:bg-zinc-200'
          href={socialProfile.url}
          target='_blank'
          rel='noopener noreferrer'
        >
          <SocialProfileIcon icon={socialProfile.type} className='size-full' />
        </a>
      ))}
    </ul>
  )
}
