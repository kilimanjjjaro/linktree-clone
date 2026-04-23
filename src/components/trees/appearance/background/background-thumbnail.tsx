import { FilmIcon, ImageIcon } from 'lucide-react'

interface Props {
  bgType: number
}

export default function BackgroundThumbnail({ bgType }: Props) {
  if (bgType === 0) {
    return <div className='size-full bg-yellow-500' />
  }

  if (bgType === 1) {
    return (
      <div className='size-full bg-linear-to-t from-red-700 to-yellow-300' />
    )
  }

  if (bgType === 2) {
    return (
      <div className='bg-lt-light-gray flex size-full items-center justify-center'>
        <ImageIcon className='text-lt-white size-10' />
      </div>
    )
  }

  if (bgType === 3) {
    return (
      <div className='bg-lt-light-gray flex size-full items-center justify-center'>
        <FilmIcon className='text-lt-white size-10' />
      </div>
    )
  }

  return null
}
