import { type TreeSocialProfile } from '@prisma/client'

import { InstagramIcon } from '@/components/icons/instagram-icon'

interface Props {
  profiles: TreeSocialProfile[]
}

export default function SocialProfiles({ profiles }: Props) {
  return (
    <ul className='mt-4 flex flex-wrap items-center justify-center gap-3 px-6'>
      {profiles.map((profile) => (
        <a
          key={profile.id}
          className='size-7 rounded-full bg-zinc-400 p-1 text-black transition-colors xl:hover:bg-zinc-200'
          href='/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <InstagramIcon />
        </a>
      ))}
    </ul>
  )
}
