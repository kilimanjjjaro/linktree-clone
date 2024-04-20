import { DiscordIcon } from '@/components/icons/discord-icon'
import { EmailIcon } from '@/components/icons/email-icon'
import { FacebookIcon } from '@/components/icons/facebook-icon'
import { InstagramIcon } from '@/components/icons/instagram-icon'
import { LinkedInIcon } from '@/components/icons/linkedin-icon'
import { PinterestIcon } from '@/components/icons/pinterest-icon'
import { RedditIcon } from '@/components/icons/reddit-icon'
import { TelegramIcon } from '@/components/icons/telegram-icon'
import { ThreadsIcon } from '@/components/icons/threads-icon'
import { TikTokIcon } from '@/components/icons/tiktok-icon'
import { TwitchIcon } from '@/components/icons/twitch-icon'
import { TwitterIcon } from '@/components/icons/twitter-icon'
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'
import { YouTubeIcon } from '@/components/icons/youtube-icon'
import { cn } from '@/lib/utils'
import type { SocialProfileType } from '@/lib/types/globals'

interface Props {
  className: string
  name: SocialProfileType
}

const getIcon = (name: SocialProfileType) => {
  switch (name) {
    case 'email':
      return <EmailIcon />
    case 'facebook':
      return <FacebookIcon />
    case 'discord':
      return <DiscordIcon />
    case 'instagram':
      return <InstagramIcon />
    case 'linkedin':
      return <LinkedInIcon />
    case 'pinterest':
      return <PinterestIcon />
    case 'reddit':
      return <RedditIcon />
    case 'telegram':
      return <TelegramIcon />
    case 'threads':
      return <ThreadsIcon />
    case 'tiktok':
      return <TikTokIcon />
    case 'twitch':
      return <TwitchIcon />
    case 'twitter':
      return <TwitterIcon />
    case 'whatsapp':
      return <WhatsAppIcon />
    case 'youtube':
      return <YouTubeIcon />
    default:
      return null
  }
}

export default function SocialProfileIcon({ className, name }: Props) {
  const icon = getIcon(name)

  return (
    <i aria-hidden className={cn('inline-block', className)}>
      {icon}
    </i>
  )
}
