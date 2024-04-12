import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { Check } from 'lucide-react'

interface Props {
  name: string
  slug: string
}

export default function Font({ name, slug }: Props) {
  return (
    <div>
      <RadioGroupItem
        id={`${slug}-font`}
        className='peer'
        value={slug}
        hidden
      />
      <Label
        htmlFor={`${slug}-font`}
        className='relative flex aspect-square cursor-pointer flex-col items-center gap-y-1.5 peer-data-[state=checked]:[&>div:nth-child(2)]:opacity-100'
      >
        <div className='relative size-full rounded-2xl bg-lt-light-gray'>
          <Image
            className='bg-cover'
            src={`/images/font-variants/${slug}.png`}
            alt={name}
            fill
            sizes='(min-width: 1280px) 50vw, 100vw'
          />
        </div>
        <div className='absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-lt-white opacity-0'>
          <Check className='mt-px w-2.5 text-lt-black' strokeWidth={4} />
          <span className='sr-only'>Selected</span>
        </div>
        <span className='text-center text-xs text-lt-lightest-gray'>
          {name}
        </span>
      </Label>
    </div>
  )
}
