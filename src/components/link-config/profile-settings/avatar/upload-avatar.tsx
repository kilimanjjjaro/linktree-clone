/* eslint-disable jsx-a11y/alt-text */

import { type FileWithPath, useDropzone } from 'react-dropzone'
import { Image } from 'lucide-react'
import { useCallback } from 'react'
import { useStore } from '@/lib/store/store'
import { ACCEPTED_FILE_TYPES } from '@/lib/constants/avatar'

export default function DropAndDrag() {
  const setAvatarToCrop = useStore((state) => state.setAvatarToCrop)

  const onDrop = useCallback(
    (files: FileWithPath[]) => {
      const image = URL.createObjectURL(files[0])

      setAvatarToCrop(image)
    },
    [setAvatarToCrop]
  )

  const { getRootProps, getInputProps } = useDropzone({
    accept: ACCEPTED_FILE_TYPES,
    multiple: false,
    maxFiles: 1,
    onDrop
  })

  return (
    <section
      {...getRootProps({ className: 'dropzone' })}
      className='flex aspect-square  cursor-pointer items-center rounded-xl border-2 border-dashed border-border bg-background p-20 outline-none xl:hover:bg-black'
    >
      <input {...getInputProps()} />
      <div className='flex flex-col items-center gap-4 text-muted-foreground'>
        <Image className='size-10' strokeWidth={1.5} />
        <span className='text-balance text-center text-sm'>
          Click to select your image or drag-and-drop here to upload it.
        </span>
      </div>
    </section>
  )
}
