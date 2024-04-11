import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'
import Image from 'next/image'

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
        className='group flex aspect-square cursor-pointer flex-col items-center gap-y-2 peer-data-[state=checked]:[&>div]:border-4 peer-data-[state=checked]:[&>div]:border-lt-lightest-gray'
      >
        <div className='relative size-full rounded-2xl border-4 border-lt-light-gray bg-lt-light-gray transition-colors'>
          <Image
            className='bg-cover transition-opacity xl:group-hover:opacity-70'
            src={`/images/font-variants/${slug}.png`}
            alt={name}
            fill
            sizes='(min-width: 1280px) 50vw, 100vw'
          />
        </div>
        <span className='text-center text-xs text-lt-lightest-gray'>
          {name}
        </span>
      </Label>
    </div>
  )
}
