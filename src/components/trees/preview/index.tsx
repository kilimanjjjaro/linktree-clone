import DeviceOverlay from '@/components/trees/preview/device-overlay'
import TreeAvatar from '@/components/trees/preview/avatar'
import TreeName from '@/components/trees/preview/name'
import TreeDescription from '@/components/trees/preview/description'
import TreeSocialProfiles from '@/components/trees/preview/social-profiles'
import TreeLinks from '@/components/trees/preview/links'
import AddLink from '@/components/trees/preview/link/add-link'
import { ScrollArea } from '@/components/ui/scroll-area'

export default async function TreePreview() {
  return (
    <section className='flex flex-col items-center self-center'>
      <div className='relative flex aspect-[320/630] w-[360px] items-start justify-center overflow-hidden'>
        <DeviceOverlay />
        <div className='relative h-full w-[91%] overflow-hidden px-1.5'>
          <ScrollArea scrollHideDelay={0} className='h-full px-3.5'>
            <header className='mb-4 mt-[29%] flex flex-col items-center'>
              <TreeAvatar />
              <TreeName />
              <TreeDescription />
              <TreeSocialProfiles />
            </header>
            <TreeLinks />
          </ScrollArea>
          <AddLink />
        </div>
      </div>
    </section>
  )
}
