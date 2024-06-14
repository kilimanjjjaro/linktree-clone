import DeviceOverlay from '@/components/trees/preview/device-overlay'
import TreeAvatar from '@/components/trees/preview/avatar'
import TreeName from '@/components/trees/preview/name'
import TreeDescription from '@/components/trees/preview/description'
import TreeSocialProfiles from '@/components/trees/preview/social-profiles'
import TreeLinks from '@/components/trees/preview/links'
import AddLink from '@/components/trees/preview/link/add-link'
import { ScrollArea } from '@/components/ui/scroll-area'

export default async function TreePreview () {
  return (
    <section className='flex flex-col items-center self-center'>
      <div className='relative flex aspect-[320/630] w-[360px] items-start justify-center overflow-hidden'>
        <DeviceOverlay />
        <div
          className='relative size-full p-[16.5px]'
          style={{
            maskImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzIwJyBoZWlnaHQ9JzYzMCcgdmlld0JveD0nMCAwIDMyMCA2MzAnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTAgNTJDMCAyMy4yODEyIDIzLjI4MTIgMCA1MiAwSDI2OEMyOTYuNzE5IDAgMzIwIDIzLjI4MTIgMzIwIDUyVjU3OEMzMjAgNjA2LjcxOSAyOTYuNzE5IDYzMCAyNjggNjMwSDUyQzIzLjI4MTIgNjMwIDAgNjA2LjcxOSAwIDU3OFY1MlonIGZpbGw9J3doaXRlJy8+PC9zdmc+Cg==")',
            maskPosition: 'center',
            maskRepeat: 'no-repeat',
            maskSize: '100%'
          }}
        >
          <ScrollArea
            className='h-full px-4'
            scrollHideDelay={0}
            style={{
              maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
            }}
          >
            <header className='mb-4 mt-16 flex flex-col items-center'>
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
