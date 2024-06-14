import { useCallback } from 'react'
import { type FileWithPath, useDropzone } from 'react-dropzone'
import { ImageIcon } from 'lucide-react'
import { ACCEPTED_FILE_TYPES } from '@/lib/constants/trees'

interface Props {
  setAvatarToCrop: (value: string) => void
}

export default function DropAvatar ({ setAvatarToCrop }: Props) {
  const onDrop = useCallback(
    (files: FileWithPath[]) => {
      const image = URL.createObjectURL(files[0])

      setAvatarToCrop(image)

      return () => {
        URL.revokeObjectURL(image)
      }
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
      className='flex aspect-square cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-lt-light-gray/60 bg-lt-black p-24 text-lt-white outline-none transition-colors focus-visible:border-white xl:hover:border-lt-lightest-gray'
    >
      <input {...getInputProps()} />
      <div className='flex flex-col items-center gap-y-4'>
        <ImageIcon className='size-10' aria-hidden />
        <span className='text-balance text-center text-sm'>
          Click to select your image or drag-and-drop here to upload it.
        </span>
      </div>
    </section>
  )
}
