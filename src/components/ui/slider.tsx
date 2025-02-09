'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none items-center select-none',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className='bg-lt-gray relative h-2 w-full grow overflow-hidden rounded-full'>
      <SliderPrimitive.Range className='bg-lt-lightest-gray absolute h-full' />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className='border-lt-light-gray/60 bg-lt-lightest-gray focus-visible:ring-lt-white focus-visible:ring-offset-lt-black xl:active:bg-lt-white block size-5 cursor-pointer rounded-full border-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
