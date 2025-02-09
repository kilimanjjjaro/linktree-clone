import Image from 'next/image'
import { Check } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { type FONT_VARIANTS } from '@/lib/constants/appearance'

interface Props {
  font: (typeof FONT_VARIANTS)[0]
}

export default function Font({ font }: Props) {
  return (
    <div>
      <RadioGroupItem
        id={`${font.slug}-font`}
        className='peer'
        value={font.slug}
        hidden
      />
      <Label
        htmlFor={`${font.slug}-font`}
        className='relative flex aspect-square cursor-pointer flex-col items-center gap-y-1.5 peer-data-[state=checked]:[&>div:nth-child(2)]:opacity-100'
      >
        <div className='bg-lt-light-gray relative size-full rounded-2xl'>
          <Image
            className='bg-cover'
            src={`/images/font-variants/${font.slug}.png`}
            alt={font.name}
            fill
            sizes='(min-width: 1280px) 50vw, 100vw'
          />
        </div>
        <div className='bg-lt-white absolute top-2 right-2 flex size-4 items-center justify-center rounded-full opacity-0 transition-opacity'>
          <Check
            className='text-lt-black w-2.5 translate-y-px'
            strokeWidth={3.5}
            aria-hidden
          />
          <span className='sr-only'>Selected</span>
        </div>
        <span className='text-lt-lightest-gray text-center text-xs'>
          {font.name}
        </span>
      </Label>
    </div>
  )
}
