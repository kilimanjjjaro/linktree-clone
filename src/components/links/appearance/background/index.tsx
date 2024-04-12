'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function LinkBackground() {
  return (
    <section className='relative'>
      <div className='sticky top-0 z-10 mr-2 bg-lt-gray/95 px-5 pb-3 pt-5 backdrop-blur-sm'>
        <h3 className='text-sm font-medium leading-none'>Background</h3>
      </div>
      <RadioGroup className='grid-cols-2 gap-3 px-5 pb-5'>
        <article>
          <RadioGroupItem
            id='lava-lamp'
            className='peer'
            value='lava-lamp'
            hidden
          />
          <Label
            htmlFor='lava-lamp'
            className='group flex aspect-video cursor-pointer flex-col items-center gap-y-2 peer-data-[state=checked]:[&>div]:border-4 peer-data-[state=checked]:[&>div]:border-lt-lightest-gray'
          >
            <div className='relative size-full rounded-2xl border-4 border-lt-light-gray bg-lt-light-gray transition-colors'>
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
                  className='bg-cover transition-opacity xl:group-hover:opacity-70'
                  src='/images/background-variants/lava-lamp.jpg'
                  alt='Lava Lamp'
                />
              </picture>
            </div>
            <span className='text-center text-xs text-lt-lightest-gray'>
              Lava Lamp
            </span>
          </Label>
        </article>
        <article>
          <RadioGroupItem id='image' className='peer' value='image' hidden />
          <Label
            htmlFor='image'
            className='group flex aspect-video cursor-pointer flex-col items-center gap-y-2 peer-data-[state=checked]:[&>div]:border-4 peer-data-[state=checked]:[&>div]:border-lt-lightest-gray'
          >
            <div className='relative size-full rounded-2xl border-4 border-lt-light-gray bg-lt-light-gray transition-colors'>
              <picture>
                <source
                  srcSet='/images/background-variants/image.webp'
                  type='image/webp'
                />
                <source
                  srcSet='/images/background-variants/image.jpg'
                  type='image/jpeg'
                />
                <img
                  className='bg-cover transition-opacity xl:group-hover:opacity-70'
                  src='/images/background-variants/image.jpg'
                  alt='Image'
                />
              </picture>
            </div>
            <span className='text-center text-xs text-lt-lightest-gray'>
              Image
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
            className='group flex aspect-video cursor-pointer flex-col items-center gap-y-2 peer-data-[state=checked]:[&>div]:border-4 peer-data-[state=checked]:[&>div]:border-lt-lightest-gray'
          >
            <div className='relative size-full rounded-2xl border-4 border-lt-light-gray bg-lt-light-gray transition-colors'>
              <picture>
                <source
                  srcSet='/images/background-variants/gradient-color.webp'
                  type='image/webp'
                />
                <source
                  srcSet='/images/background-variants/gradient-color.jpg'
                  type='image/jpeg'
                />
                <img
                  className='bg-cover transition-opacity xl:group-hover:opacity-70'
                  src='/images/background-variants/gradient-color.jpg'
                  alt='Gradient Color'
                />
              </picture>
            </div>
            <span className='text-center text-xs text-lt-lightest-gray'>
              Gradient Color
            </span>
          </Label>
        </article>
        <article>
          <RadioGroupItem
            id='solid-color'
            className='peer'
            value='solid-color'
            hidden
          />
          <Label
            htmlFor='solid-color'
            className='group flex aspect-video cursor-pointer flex-col items-center gap-y-2 peer-data-[state=checked]:[&>div]:border-4 peer-data-[state=checked]:[&>div]:border-lt-lightest-gray'
          >
            <div className='relative size-full rounded-2xl border-4 border-lt-light-gray bg-lt-light-gray transition-colors'>
              <picture>
                <source
                  srcSet='/images/background-variants/solid-color.webp'
                  type='image/webp'
                />
                <source
                  srcSet='/images/background-variants/solid-color.jpg'
                  type='image/jpeg'
                />
                <img
                  className='bg-cover transition-opacity xl:group-hover:opacity-70'
                  src='/images/background-variants/solid-color.jpg'
                  alt='Solid Color'
                />
              </picture>
            </div>
            <span className='text-center text-xs text-lt-lightest-gray'>
              Solid Color
            </span>
          </Label>
        </article>
      </RadioGroup>
    </section>
  )
}
