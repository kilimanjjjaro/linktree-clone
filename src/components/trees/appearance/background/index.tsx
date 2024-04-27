/* eslint-disable jsx-a11y/alt-text */
'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Check, Film, Image } from 'lucide-react'

export default function TreeBackground() {
  return (
    <section className='p-5'>
      <h3 className='text-sm font-medium leading-none'>Background</h3>
      <RadioGroup className='mt-3 grid-cols-2 gap-3' defaultValue='lava-lamp'>
        <article>
          <RadioGroupItem
            id='lava-lamp'
            className='peer'
            value='lava-lamp'
            hidden
          />
          <Label
            htmlFor='lava-lamp'
            className='relative flex aspect-video cursor-pointer flex-col items-center gap-y-1.5 peer-data-[state=checked]:[&>div:nth-child(2)]:opacity-100'
          >
            <div className='size-full overflow-hidden rounded-2xl'>
              <picture>
                <source
                  srcSet='/images/background-variants/lava-lamp.webp'
                  type='image/webp'
                />
                <source
                  srcSet='/images/background-variants/lava-lamp.jpg'
                  type='image/jpeg'
                />
                <img
                  className='bg-cover'
                  src='/images/background-variants/lava-lamp.jpg'
                  alt='Lava Lamp'
                />
              </picture>
            </div>
            <div className='absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-lt-white opacity-0 transition-opacity'>
              <Check
                className='w-2.5 translate-y-px text-lt-black'
                strokeWidth={3.5}
                aria-hidden
              />
            </div>
            <span className='text-center text-xs text-lt-lightest-gray'>
              Lava Lamp
            </span>
          </Label>
        </article>
        <article>
          <RadioGroupItem
            id='pattern'
            className='peer'
            value='pattern'
            hidden
          />
          <Label
            htmlFor='pattern'
            className='relative flex aspect-video cursor-pointer flex-col items-center gap-y-2 peer-data-[state=checked]:[&>div:nth-child(2)]:opacity-100'
          >
            <div className='size-full overflow-hidden rounded-2xl'>
              <picture>
                <source
                  srcSet='/images/background-variants/pattern.webp'
                  type='image/webp'
                />
                <source
                  srcSet='/images/background-variants/pattern.jpg'
                  type='image/jpeg'
                />
                <img
                  className='bg-cover'
                  src='/images/background-variants/pattern.jpg'
                  alt='Pattern'
                />
              </picture>
            </div>
            <div className='absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-lt-white opacity-0 transition-opacity'>
              <Check
                className='w-2.5 translate-y-px text-lt-black'
                strokeWidth={3.5}
                aria-hidden
              />
            </div>
            <span className='text-center text-xs text-lt-lightest-gray'>
              Pattern
            </span>
          </Label>
        </article>
        <article>
          <RadioGroupItem id='image' className='peer' value='image' hidden />
          <Label
            htmlFor='image'
            className='relative flex aspect-video cursor-pointer flex-col items-center gap-y-2 peer-data-[state=checked]:[&>div:nth-child(2)]:opacity-100'
          >
            <div className='flex size-full items-center justify-center rounded-2xl bg-lt-light-gray'>
              <Image className='size-10 text-lt-white' />
            </div>
            <div className='absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-lt-white opacity-0 transition-opacity'>
              <Check
                className='w-2.5 translate-y-px text-lt-black'
                strokeWidth={3.5}
                aria-hidden
              />
            </div>
            <span className='text-center text-xs text-lt-lightest-gray'>
              Image
            </span>
          </Label>
        </article>
        <article>
          <RadioGroupItem id='video' className='peer' value='video' hidden />
          <Label
            htmlFor='video'
            className='relative flex aspect-video cursor-pointer flex-col items-center gap-y-2 peer-data-[state=checked]:[&>div:nth-child(2)]:opacity-100'
          >
            <div className='flex size-full items-center justify-center rounded-2xl bg-lt-light-gray'>
              <Film className='size-10 text-lt-white' />
            </div>
            <div className='absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-lt-white opacity-0 transition-opacity'>
              <Check
                className='w-2.5 translate-y-px text-lt-black'
                strokeWidth={3.5}
                aria-hidden
              />
            </div>
            <span className='text-center text-xs text-lt-lightest-gray'>
              Video
            </span>
          </Label>
        </article>
        <article>
          <RadioGroupItem
            id='gradient-color'
            className='peer'
            value='gradient-color'
            hidden
          />
          <Label
            htmlFor='gradient-color'
            className='relative flex aspect-video cursor-pointer flex-col items-center gap-y-2 peer-data-[state=checked]:[&>div:nth-child(2)]:opacity-100'
          >
            <div className='size-full rounded-2xl bg-gradient-to-t from-red-700 to-yellow-300' />
            <div className='absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-lt-white opacity-0 transition-opacity'>
              <Check
                className='w-2.5 translate-y-px text-lt-black'
                strokeWidth={3.5}
                aria-hidden
              />
            </div>
            <span className='text-center text-xs text-lt-lightest-gray'>
              Gradient Color
            </span>
          </Label>
        </article>
        <article>
          <RadioGroupItem
            id='flat-color'
            className='peer'
            value='flat-color'
            hidden
          />
          <Label
            htmlFor='flat-color'
            className='relative flex aspect-video cursor-pointer flex-col items-center gap-y-2 peer-data-[state=checked]:[&>div:nth-child(2)]:opacity-100'
          >
            <div className='size-full rounded-2xl bg-yellow-500' />
            <div className='absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-lt-white opacity-0 transition-opacity'>
              <Check
                className='w-2.5 translate-y-px text-lt-black'
                strokeWidth={3.5}
                aria-hidden
              />
            </div>
            <span className='text-center text-xs text-lt-lightest-gray'>
              Flat Color
            </span>
          </Label>
        </article>
      </RadioGroup>
    </section>
  )
}
