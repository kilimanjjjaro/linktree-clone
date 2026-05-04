'use client'

import { useEffect } from 'react'

import DeviceOverlay from '@/components/trees/preview/device-overlay'
import TreeAvatar from '@/components/trees/preview/avatar'
import TreeName from '@/components/trees/preview/name'
import TreeDescription from '@/components/trees/preview/description'
import TreeSocialProfiles from '@/components/trees/preview/social-profiles'
import TreeLinks from '@/components/trees/preview/links'
import DitherBackground from '@/components/dither-background'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useStore } from '@/lib/store/store-provider'
import useMediaQuery from '@/lib/hooks/useMediaQuery'
import { BG_DITHER, CONTAINER_BG_COLOR } from '@/lib/constants/appearance'
import { PREVIEW_VIEWPORT } from '@/lib/constants/trees'
import { getCornerClassName } from '@/lib/utils/get-corner-class-name'
import { getBackgroundStyle } from '@/lib/utils/get-background-style'
import { loadFont, getFontFamily } from '@/lib/utils/fonts'
import { cn } from '@/lib/utils/cn'

export default function TreePreview() {
  const selectedTree = useStore((state) => state.selectedTree)
  const previewViewport = useStore((state) => state.previewViewport)
  const isMobileViewport = useMediaQuery('(max-width: 767px)')

  const appearance = selectedTree.appearance
  const fontId = appearance.font ?? 0
  const isFullscreenPreview =
    isMobileViewport || previewViewport === PREVIEW_VIEWPORT.DESKTOP
  const backgroundStyle = getBackgroundStyle(appearance.background)
  const hasDitherBackground = appearance.background.type === BG_DITHER
  const isContentContainerEnabled = appearance.general.contentContainer.enabled

  useEffect(() => {
    loadFont(fontId)
  }, [fontId])

  const content = (
    <>
      <header className='mt-26 mb-4 flex flex-col items-center xl:mt-16'>
        <TreeAvatar />
        <div
          className={cn(
            'flex w-full flex-col items-center',
            isContentContainerEnabled && 'mt-4 px-4 py-6',
            isContentContainerEnabled &&
              getCornerClassName(appearance.general.cornerStyle)
          )}
          style={
            isContentContainerEnabled
              ? { backgroundColor: CONTAINER_BG_COLOR }
              : undefined
          }
        >
          <TreeName />
          <TreeDescription />
          <TreeSocialProfiles />
        </div>
      </header>
      <TreeLinks />
    </>
  )

  if (isFullscreenPreview) {
    return (
      <>
        <div
          aria-hidden
          className='fixed inset-0 -z-10 overflow-hidden'
          style={backgroundStyle}
        >
          {hasDitherBackground && (
            <DitherBackground color={appearance.background.settings.color} />
          )}
        </div>
        <section className='relative flex h-full w-full flex-col items-center justify-start self-stretch'>
          <div
            className='mx-auto w-full max-w-120 xl:px-6'
            style={{ fontFamily: getFontFamily(fontId) }}
          >
            {content}
          </div>
        </section>
      </>
    )
  }

  return (
    <section className='-mt-17 flex flex-col items-center self-center [@media(max-height:800px)]:scale-60 [@media(max-height:900px)]:scale-80'>
      <div className='relative flex aspect-320/630 w-90 items-start justify-center overflow-hidden'>
        <DeviceOverlay />
        <div
          className='relative size-full p-[16.5px]'
          style={{
            maskImage:
              'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzIwJyBoZWlnaHQ9JzYzMCcgdmlld0JveD0nMCAwIDMyMCA2MzAnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTAgNTJDMCAyMy4yODEyIDIzLjI4MTIgMCA1MiAwSDI2OEMyOTYuNzE5IDAgMzIwIDIzLjI4MTIgMzIwIDUyVjU3OEMzMjAgNjA2LjcxOSAyOTYuNzE5IDYzMCAyNjggNjMwSDUyQzIzLjI4MTIgNjMwIDAgNjA2LjcxOSAwIDU3OFY1MlonIGZpbGw9J3doaXRlJy8+PC9zdmc+Cg==")',
            maskPosition: 'center',
            maskRepeat: 'no-repeat',
            maskSize: '100%',
            ...backgroundStyle
          }}
        >
          {hasDitherBackground && (
            <DitherBackground color={appearance.background.settings.color} />
          )}
          <ScrollArea
            className='h-full px-4'
            scrollHideDelay={0}
            style={{
              fontFamily: getFontFamily(fontId)
            }}
          >
            {content}
          </ScrollArea>
        </div>
      </div>
    </section>
  )
}
