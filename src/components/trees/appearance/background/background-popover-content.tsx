import Image from 'next/image'
import { ImageIcon, LoaderCircle } from 'lucide-react'

import GradientSettings from '@/components/trees/appearance/background/gradient-settings'
import FlatColorSettings from '@/components/trees/appearance/background/flat-color-settings'
import { Label } from '@/components/ui/label'
import {
  BG_GRADIENT,
  BG_FLAT_COLOR,
  BG_IMAGE,
  BG_DITHER
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
  isUploading: boolean
}

export default function BackgroundPopoverContent({
  bgType,
  settings,
  updatePreview,
  imageInputRef,
  isUploading
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

  if (bgType === BG_FLAT_COLOR || bgType === BG_DITHER) {
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
          className='border-lt-light-gray/60 xl:hover:bg-lt-light-gray/30 flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60'
          onClick={() => imageInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <LoaderCircle className='size-4 animate-spin' aria-hidden />
              Uploading
            </>
          ) : (
            <>
              <ImageIcon className='size-4' aria-hidden />
              Choose image
            </>
          )}
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

  return null
}
