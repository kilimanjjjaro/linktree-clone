import Image from 'next/image'
import { FilmIcon, ImageIcon } from 'lucide-react'

import GradientSettings from '@/components/trees/appearance/background/gradient-settings'
import FlatColorSettings from '@/components/trees/appearance/background/flat-color-settings'
import { Label } from '@/components/ui/label'
import {
  BG_GRADIENT,
  BG_FLAT_COLOR,
  BG_IMAGE,
  BG_VIDEO
} from '@/lib/constants/appearance'
import { type TreeAppearanceInterface } from '@/lib/types/trees'

type BackgroundSettings = TreeAppearanceInterface['background']['settings']

interface Props {
  bgType: number
  settings: BackgroundSettings
  updatePreview: (
    updates: Partial<{
      type: number
      settings: Partial<BackgroundSettings>
    }>
  ) => void
  imageInputRef: React.RefObject<HTMLInputElement | null>
  videoInputRef: React.RefObject<HTMLInputElement | null>
}

export default function BackgroundPopoverContent({
  bgType,
  settings,
  updatePreview,
  imageInputRef,
  videoInputRef
}: Props) {
  if (bgType === BG_GRADIENT) {
    return (
      <GradientSettings
        steps={settings.steps}
        angle={settings.angle}
        onChange={(updates) => updatePreview({ settings: updates })}
      />
    )
  }

  if (bgType === BG_FLAT_COLOR) {
    return (
      <FlatColorSettings
        color={settings.color}
        onChange={(color) => updatePreview({ settings: { color } })}
      />
    )
  }

  if (bgType === BG_IMAGE) {
    return (
      <div className='flex flex-col gap-3'>
        <Label className='text-lt-lightest-gray'>Upload image</Label>
        <button
          type='button'
          className='border-lt-light-gray/60 hover:bg-lt-light-gray/30 flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors'
          onClick={() => imageInputRef.current?.click()}
        >
          <ImageIcon className='size-4' aria-hidden />
          Choose image
        </button>
        {settings.url && (
          <div className='relative aspect-video overflow-hidden rounded-lg'>
            <Image
              src={settings.url}
              alt='Background preview'
              className='size-full object-cover'
            />
          </div>
        )}
      </div>
    )
  }

  if (bgType === BG_VIDEO) {
    return (
      <div className='flex flex-col gap-3'>
        <Label className='text-lt-lightest-gray'>Upload video</Label>
        <button
          type='button'
          className='border-lt-light-gray/60 hover:bg-lt-light-gray/30 flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors'
          onClick={() => videoInputRef.current?.click()}
        >
          <FilmIcon className='size-4' aria-hidden />
          Choose video
        </button>
        {settings.url && (
          <div className='relative aspect-video overflow-hidden rounded-lg'>
            <video
              src={settings.url}
              className='size-full object-cover'
              muted
              autoPlay
              loop
              playsInline
            />
          </div>
        )}
      </div>
    )
  }

  return null
}
