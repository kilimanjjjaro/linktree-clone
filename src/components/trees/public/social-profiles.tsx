import SocialProfileIcon from '@/components/trees/settings/social-profiles/icon'
import { getSocialProfileUrl } from '@/lib/utils/get-social-profile-url'
import { type TreeInterface } from '@/lib/types/trees'

interface Props {
  socialProfiles: TreeInterface['socialProfiles']
}

export default function PublicSocialProfiles({ socialProfiles }: Props) {
  if (socialProfiles.length === 0) return null

  return (
    <ul className='mt-4 flex flex-wrap items-center justify-center gap-3 px-6'>
      {socialProfiles.map((socialProfile) => (
        <a
          key={socialProfile.type}
          className='bg-lt-white size-7 rounded-full p-1 text-black transition xl:hover:bg-zinc-400 xl:active:scale-90'
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
