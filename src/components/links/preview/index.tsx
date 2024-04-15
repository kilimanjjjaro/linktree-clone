import Avatar from './avatar'
import DeviceOverlay from './device-overlay'
import { InstagramIcon } from '@/components/icons/instagram-icon'
import { TwitchIcon } from '@/components/icons/twitch-icon'
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'
import { TelegramIcon } from '@/components/icons/telegram-icon'
import { TikTokIcon } from '@/components/icons/tiktok-icon'
import AddLink from './add-link/dialog'

export default function LinkPreview() {
  return (
    <section className='flex flex-col items-center self-center'>
      <div className='relative flex aspect-[320/630] w-[360px] items-center justify-center'>
        <DeviceOverlay />
        <div className='flex h-[95%] w-[91%] flex-col items-center overflow-hidden'>
          <header className='flex flex-col items-center px-6 pt-[20%]'>
            <Avatar />
            <h1 className='mt-5 text-3xl font-semibold leading-none'>
              Gonzalo
            </h1>
            <p className='mt-3 text-balance text-center text-sm text-zinc-400'>
              Full Stack Developer & UX/UI Designer with +6 years of work
              experiencie.
            </p>
            <ul className='mt-4 flex flex-wrap items-center justify-center gap-3 px-6'>
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
          </header>
          <AddLink />
        </div>
      </div>
    </section>
  )
}
