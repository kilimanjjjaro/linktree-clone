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
import { SocialProfileTypes } from '@prisma/client'

interface Props {
  className?: string
  icon: SocialProfileTypes
}

const getIcon = (icon: SocialProfileTypes) => {
  switch (icon) {
    case SocialProfileTypes.EMAIL:
      return <EmailIcon />
    case SocialProfileTypes.FACEBOOK:
      return <FacebookIcon />
    case SocialProfileTypes.DISCORD:
      return <DiscordIcon />
    case SocialProfileTypes.INSTAGRAM:
      return <InstagramIcon />
    case SocialProfileTypes.LINKEDIN:
      return <LinkedInIcon />
    case SocialProfileTypes.PINTEREST:
      return <PinterestIcon />
    case SocialProfileTypes.REDDIT:
      return <RedditIcon />
    case SocialProfileTypes.TELEGRAM:
      return <TelegramIcon />
    case SocialProfileTypes.THREADS:
      return <ThreadsIcon />
    case SocialProfileTypes.TIKTOK:
      return <TikTokIcon />
    case SocialProfileTypes.TWITCH:
      return <TwitchIcon />
    case SocialProfileTypes.TWITTER:
      return <TwitterIcon />
    case SocialProfileTypes.WHATSAPP:
      return <WhatsAppIcon />
    case SocialProfileTypes.YOUTUBE:
      return <YouTubeIcon />
    default:
      return null
  }
}

export default function SocialProfileIcon({ className, icon }: Props) {
  return (
    <i aria-hidden className={cn('inline-block', className)}>
      {getIcon(icon)}
    </i>
  )
}
