'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { InstagramIcon } from '@/components/icons/instagram-icon'
import { TwitchIcon } from '@/components/icons/twitch-icon'
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'
import { TelegramIcon } from '@/components/icons/telegram-icon'
import { TikTokIcon } from '@/components/icons/tiktok-icon'

export default function SocialMedia() {
  const [parent] = useAutoAnimate({ duration: 200 })

  return (
    <ul
      ref={parent}
      className='mt-4 flex flex-wrap items-center justify-center gap-3 px-6'
    >
      <a
        className='size-7 rounded-full bg-zinc-400 p-1 text-black transition-colors xl:hover:bg-zinc-200'
        href='/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <InstagramIcon />
      </a>
      <a
        className='size-7 rounded-full bg-zinc-400 p-1 text-black transition-colors xl:hover:bg-zinc-200'
        href='/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <TikTokIcon />
      </a>
      <a
        className='size-7 rounded-full bg-zinc-400 p-1 text-black transition-colors xl:hover:bg-zinc-200'
        href='/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <TwitchIcon />
      </a>
      <a
        className='size-7 rounded-full bg-zinc-400 p-1 text-black transition-colors xl:hover:bg-zinc-200'
        href='/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <WhatsAppIcon />
      </a>
      <a
        className='size-7 rounded-full bg-zinc-400 p-1 text-black transition-colors xl:hover:bg-zinc-200'
        href='/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <TelegramIcon />
      </a>
    </ul>
  )
}
