import DeviceOverlay from '@/components/trees/preview/device-overlay'
import TreeAvatar from '@/components/trees/preview/avatar'
import TreeName from '@/components/trees/preview/name'
import TreeDescription from '@/components/trees/preview/description'
import TreeSocialProfiles from '@/components/trees/preview/social-profiles'
import TreeLinks from '@/components/trees/preview/links'

export default async function TreePreview() {
  return (
    <section className='flex flex-col items-center self-center'>
      <div className='relative flex aspect-[320/630] w-[360px] items-center justify-center'>
        <DeviceOverlay />
        <div className='relative flex h-[95%] w-[91%] flex-col gap-y-6 overflow-hidden px-5'>
          <header className='flex flex-col items-center pt-[22%]'>
            <TreeAvatar />
            <TreeName />
            <TreeDescription />
            <TreeSocialProfiles />
          </header>
          <TreeLinks />
          {/* <AddLink /> */}
        </div>
      </div>
    </section>
  )
}
