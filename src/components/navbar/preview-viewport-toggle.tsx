'use client'

import { Monitor, Smartphone } from 'lucide-react'

import { useStore } from '@/lib/store/store'
import { PREVIEW_VIEWPORT } from '@/lib/constants/trees'
import { cn } from '@/lib/utils'

export default function PreviewViewportToggle() {
  const previewViewport = useStore((state) => state.previewViewport)
  const setPreviewViewport = useStore((state) => state.setPreviewViewport)

  return (
    <div
      role='group'
      aria-label='Preview viewport'
      className='border-lt-light-gray/60 ml-3 flex h-9 items-center gap-x-0.5 rounded-full border p-0.5'
    >
      <button
        type='button'
        aria-label='Mobile preview'
        aria-pressed={previewViewport === PREVIEW_VIEWPORT.MOBILE}
        title='Mobile preview'
        onClick={() => setPreviewViewport(PREVIEW_VIEWPORT.MOBILE)}
        className={cn(
          'focus-visible:ring-lt-white focus-visible:ring-offset-lt-gray flex size-8 cursor-pointer items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2',
          previewViewport === PREVIEW_VIEWPORT.MOBILE
            ? 'bg-lt-light-gray text-lt-white'
            : 'text-lt-lightest-gray xl:hover:bg-lt-light-gray/50'
        )}
      >
        <Smartphone className='size-4' aria-hidden />
      </button>
      <button
        type='button'
        aria-label='Desktop preview'
        aria-pressed={previewViewport === PREVIEW_VIEWPORT.DESKTOP}
        title='Desktop preview'
        onClick={() => setPreviewViewport(PREVIEW_VIEWPORT.DESKTOP)}
        className={cn(
          'focus-visible:ring-lt-white focus-visible:ring-offset-lt-gray flex size-8 cursor-pointer items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2',
          previewViewport === PREVIEW_VIEWPORT.DESKTOP
            ? 'bg-lt-light-gray text-lt-white'
            : 'text-lt-lightest-gray xl:hover:bg-lt-light-gray/50'
        )}
      >
        <Monitor className='size-4' aria-hidden />
      </button>
    </div>
  )
}
