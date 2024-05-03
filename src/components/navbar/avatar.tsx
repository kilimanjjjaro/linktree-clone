import Image from 'next/image'

interface Props {
  image: string | null | undefined
}

export default function Avatar({ image }: Props) {
  const source = image ?? '/images/default-user-avatar.svg'

  return (
    <Image
      className='absolute h-auto w-full object-cover object-center'
      src={source}
      alt='Gonzalo'
      fill
      sizes='(max-width: 768px) 100vw, 33vw'
    />
  )
}
