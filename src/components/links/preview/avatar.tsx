'use client'

import Image from 'next/image'
import { useStore } from '@/lib/store/store'

export default function Avatar() {
  const avatar = useStore((state) => state.avatar)

  return (
    <div className='relative size-28 overflow-hidden rounded-full border border-lt-light-gray/60'>
      <Image
        className='absolute h-auto w-full object-cover object-center'
        src={avatar}
        alt='Gonzalo'
        fill
        sizes='(max-width: 768px) 100vw, 33vw'
      />
    </div>
  )
}
