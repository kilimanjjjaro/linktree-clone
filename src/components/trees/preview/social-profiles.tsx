'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { InstagramIcon } from '@/components/icons/instagram-icon'
import { TwitchIcon } from '@/components/icons/twitch-icon'
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'
import { TelegramIcon } from '@/components/icons/telegram-icon'
import { TikTokIcon } from '@/components/icons/tiktok-icon'

export default function SocialProfiles() {
  const [parent] = useAutoAnimate({ duration: 200 })

  return (
    <ul
      ref={parent}
      className='mt-4 flex flex-wrap items-center justify-center gap-3 px-6 [&>a]:size-7 [&>a]:rounded-full [&>a]:bg-zinc-400 [&>a]:p-1 [&>a]:text-black [&>a]:transition-colors [&>a]:xl:hover:bg-zinc-200'
    >
      <a href='/' target='_blank' rel='noopener noreferrer'>
        <InstagramIcon />
      </a>
      <a href='/' target='_blank' rel='noopener noreferrer'>
        <TikTokIcon />
      </a>
      <a href='/' target='_blank' rel='noopener noreferrer'>
        <TwitchIcon />
      </a>
      <a href='/' target='_blank' rel='noopener noreferrer'>
        <WhatsAppIcon />
      </a>
      <a href='/' target='_blank' rel='noopener noreferrer'>
        <TelegramIcon />
      </a>
    </ul>
  )
}
