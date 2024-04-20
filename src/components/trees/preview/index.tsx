import Avatar from './avatar'
import DeviceOverlay from './device-overlay'
import AddLink from './add-link'
import SocialProfiles from './social-profiles'

export default function TreePreview() {
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
              experience.
            </p>
            <SocialProfiles />
          </header>
          <AddLink />
        </div>
      </div>
    </section>
  )
}
