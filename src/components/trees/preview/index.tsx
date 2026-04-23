'use client'

import { useEffect } from 'react'

import DeviceOverlay from '@/components/trees/preview/device-overlay'
import TreeAvatar from '@/components/trees/preview/avatar'
import TreeName from '@/components/trees/preview/name'
import TreeDescription from '@/components/trees/preview/description'
import TreeSocialProfiles from '@/components/trees/preview/social-profiles'
import TreeLinks from '@/components/trees/preview/links'
import AddLink from '@/components/trees/preview/link/add-link'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useStore } from '@/lib/store/store'
import { loadFont, getFontFamily } from '@/lib/utils/fonts'
import { getBackgroundStyle } from '@/lib/utils/get-background-style'
import { getCornerClassName } from '@/lib/utils/get-corner-class-name'
import { BG_VIDEO, CONTAINER_BG_COLOR } from '@/lib/constants/appearance'
import { PREVIEW_VIEWPORT } from '@/lib/constants/trees'
import { cn } from '@/lib/utils'

export default function TreePreview() {
  const selectedTree = useStore((state) => state.selectedTree)
  const previewViewport = useStore((state) => state.previewViewport)

  const appearance = selectedTree.appearance
  const fontId = appearance.font ?? 0
  const isDesktop = previewViewport === PREVIEW_VIEWPORT.DESKTOP
  const backgroundStyle = getBackgroundStyle(appearance.background)
  const hasVideoBackground =
    appearance.background.type === BG_VIDEO &&
    Boolean(appearance.background.settings.url)

  useEffect(() => {
    loadFont(fontId)
  }, [fontId])

  const content = (
    <div
      className={cn(
        appearance.general.contentContainer.enabled &&
          'mx-auto mt-16 mb-4 px-3 py-4',
        appearance.general.contentContainer.enabled &&
          getCornerClassName(appearance.general.cornerStyle)
      )}
      style={
        appearance.general.contentContainer.enabled
          ? { backgroundColor: CONTAINER_BG_COLOR }
          : undefined
      }
    >
      <header
        className={cn(
          'mb-4 flex flex-col items-center',
          appearance.general.contentContainer.enabled ? 'mt-4' : 'mt-16'
        )}
      >
        <TreeAvatar />
        <TreeName />
        <TreeDescription />
        <TreeSocialProfiles />
      </header>
      <TreeLinks />
    </div>
  )

  if (isDesktop) {
    return (
      <>
        <div
          aria-hidden
          className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'
          style={backgroundStyle}
        >
          {hasVideoBackground && (
            <video
              src={appearance.background.settings.url}
              className='size-full object-cover'
              muted
              autoPlay
              loop
              playsInline
            />
          )}
        </div>
        <section className='relative flex h-full w-full flex-col items-center justify-start self-stretch'>
          <ScrollArea
            className='h-full w-full'
            scrollHideDelay={0}
            style={{ fontFamily: getFontFamily(fontId) }}
          >
            <div className='mx-auto w-full max-w-120 px-6'>{content}</div>
          </ScrollArea>
          <AddLink />
        </section>
      </>
    )
  }

  return (
    <section className='flex flex-col items-center self-center'>
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
          {hasVideoBackground && (
            <video
              src={appearance.background.settings.url}
              className='absolute inset-0 size-full object-cover'
              muted
              autoPlay
              loop
              playsInline
            />
          )}
          <ScrollArea
            className='h-full px-4'
            scrollHideDelay={0}
            style={{
              fontFamily: getFontFamily(fontId),
              maskImage:
                'linear-gradient(to bottom, black 70%, transparent 100%)'
            }}
          >
            {content}
          </ScrollArea>
          <AddLink />
        </div>
      </div>
    </section>
  )
}
