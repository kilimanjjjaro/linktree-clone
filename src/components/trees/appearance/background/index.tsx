'use client'

import { useRef, useState } from 'react'
import { Check, X } from 'lucide-react'

import BackgroundThumbnail from '@/components/trees/appearance/background/background-thumbnail'
import BackgroundPopoverContent from '@/components/trees/appearance/background/background-popover-content'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover'
import { useStore } from '@/lib/store/store'
import { updateBackground } from '@/lib/actions/trees/update-background'
import { BG_TYPES, BG_FLAT_COLOR } from '@/lib/constants/appearance'

export default function TreeBackground() {
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const [openPopover, setOpenPopover] = useState<number | null>(null)

  const { type, settings } = selectedTree.appearance.background

  const updatePreview = (
    updates: Partial<
      Omit<typeof selectedTree.appearance.background, 'settings'> & {
        settings: Partial<typeof selectedTree.appearance.background.settings>
      }
    >
  ) => {
    const updatedTree = {
      ...selectedTree,
      appearance: {
        ...selectedTree.appearance,
        background: {
          ...selectedTree.appearance.background,
          ...updates,
          settings: {
            ...selectedTree.appearance.background.settings,
            ...(updates.settings ?? {})
          }
        }
      }
    }

    setSelectedTree(updatedTree)
  }

  const clearBackground = () => {
    updatePreview({
      type: BG_FLAT_COLOR,
      settings: {
        steps: [],
        angle: 0,
        color: [18, 18, 18],
        url: ''
      }
    })
  }

  const handleFileUpload = async (
    file: File,
    resourceType: 'image' | 'video'
  ) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('resourceType', resourceType)

    const response = await updateBackground(formData)

    if (response !== null) {
      updatePreview({ settings: { url: response.secure_url } })
    }
  }

  return (
    <section className='p-5'>
      <h3 className='text-sm leading-none font-medium'>Background</h3>
      <div className='mt-3 grid grid-cols-2 gap-3'>
        {BG_TYPES.map((bg) => {
          const isSelected = type === bg.id

          return (
            <Popover
              key={bg.id}
              open={openPopover === bg.id}
              onOpenChange={(open) => setOpenPopover(open ? bg.id : null)}
            >
              <PopoverTrigger asChild>
                <div
                  role='button'
                  tabIndex={0}
                  onClick={() => {
                    if (!isSelected) updatePreview({ type: bg.id })
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()

                      if (!isSelected) updatePreview({ type: bg.id })
                    }
                  }}
                >
                  <div className='relative flex aspect-video cursor-pointer flex-col items-center gap-y-2'>
                    <div className='size-full overflow-hidden rounded-2xl'>
                      <BackgroundThumbnail bgType={bg.id} />
                    </div>
                    {isSelected && (
                      <>
                        <div className='bg-lt-white absolute top-2 right-2 flex size-4 items-center justify-center rounded-full'>
                          <Check
                            className='text-lt-black w-2.5 translate-y-px'
                            strokeWidth={3.5}
                            aria-hidden
                          />
                        </div>
                        {bg.id !== BG_FLAT_COLOR && (
                          <button
                            type='button'
                            className='absolute top-2 left-2 flex size-4 items-center justify-center rounded-full bg-red-500 transition-opacity hover:bg-red-600'
                            onClick={(event) => {
                              event.stopPropagation()
                              setOpenPopover(null)
                              clearBackground()
                            }}
                          >
                            <X
                              className='text-lt-white w-2.5'
                              strokeWidth={3.5}
                              aria-hidden
                            />
                          </button>
                        )}
                      </>
                    )}
                    <span className='text-lt-lightest-gray text-center text-xs'>
                      {bg.name}
                    </span>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent side='right' sideOffset={12}>
                <BackgroundPopoverContent
                  bgType={bg.id}
                  settings={settings}
                  updatePreview={updatePreview}
                  imageInputRef={imageInputRef}
                  videoInputRef={videoInputRef}
                />
              </PopoverContent>
            </Popover>
          )
        })}
      </div>

      <input
        ref={imageInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={(e) => {
          const file = e.target.files?.[0]

          if (file) handleFileUpload(file, 'image')
        }}
      />
      <input
        ref={videoInputRef}
        type='file'
        accept='video/*'
        className='hidden'
        onChange={(e) => {
          const file = e.target.files?.[0]

          if (file) handleFileUpload(file, 'video')
        }}
      />
    </section>
  )
}
