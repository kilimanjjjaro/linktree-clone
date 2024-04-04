import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Props {
  className: string
  src: string
  alt: string
}

export default function Avatar({ className, src, alt }: Props) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full border border-tl-light-gray ring-offset-2 ring-offset-tl-gray transition focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none xl:hover:ring-2',
        className
      )}
    >
      <Image
        className='absolute h-auto w-full object-cover object-center'
        src={src}
        alt={alt}
        fill
        sizes='(max-width: 768px) 100vw, 33vw'
      />
    </div>
  )
}
