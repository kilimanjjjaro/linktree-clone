import Image from 'next/image'

interface Props {
  image: string | null | undefined
  name: string | null | undefined
}

export default function Avatar({ image, name }: Props) {
  if (image == null || name == null) return

  return (
    <button className='border-lt-light-gray/60 focus-visible:ring-lt-white focus-visible:ring-offset-lt-gray relative flex aspect-square h-full items-center justify-center overflow-hidden rounded-full border transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-offset-2 xl:hover:opacity-70'>
      <Image
        className='absolute size-full object-cover object-center'
        src={image}
        alt={`${name}'s avatar`}
        width={50}
        height={50}
        preload
      />
    </button>
  )
}
