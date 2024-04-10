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
        'relative overflow-hidden rounded-full border border-lt-light-gray/60',
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
