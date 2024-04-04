/* eslint-disable jsx-a11y/alt-text */

import { useCallback } from 'react'
import { type FileWithPath, useDropzone } from 'react-dropzone'
import { Image } from 'lucide-react'
import { useStore } from '@/lib/store/store'
import { ACCEPTED_FILE_TYPES } from '@/lib/constants/avatar'

export default function DropAvatar() {
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
      className='flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-tl-light-gray bg-tl-darkest-gray p-28 text-tl-white outline-none transition-colors focus-visible:border-white xl:hover:border-tl-lightest-gray'
    >
      <input {...getInputProps()} />
      <div className='flex flex-col items-center gap-y-4'>
        <Image className='size-10' strokeWidth={1.5} />
        <span className='text-balance text-center text-sm'>
          Click to select your image or drag-and-drop here to upload it.
        </span>
      </div>
    </section>
  )
}
