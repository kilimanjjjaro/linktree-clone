import Image from 'next/image'

interface Props {
  image: string | null | undefined
}

export default function Avatar({ image }: Props) {
  const source = image ?? '/images/default-user-avatar.svg'

  return (
    <button className='relative aspect-square h-full w-auto overflow-hidden rounded-full border border-lt-light-gray/60 outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-lt-white focus-visible:ring-offset-2 focus-visible:ring-offset-lt-gray xl:hover:opacity-70'>
      <Image
        className='absolute h-auto w-full object-cover object-center'
        src={source}
        alt='Gonzalo'
        fill
        sizes='(max-width: 768px) 100vw, 33vw'
      />
    </button>
  )
}
