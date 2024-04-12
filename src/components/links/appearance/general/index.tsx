'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function LinkGeneral() {
  const [cornerStyle, setCornerStyle] = useState(true)
  const [contendContainer, setContendContainer] = useState(false)

  const cornerStyleText = cornerStyle ? 'Rounded' : 'Straight'
  const contendContainerText = contendContainer ? 'Show' : 'Hide'

  return (
    <section className='relative'>
      <div className='sticky top-0 z-10 mr-2 bg-lt-gray/95 px-5 pb-3 pt-5 backdrop-blur-sm'>
        <h3 className='text-sm font-medium leading-none'>General</h3>
      </div>
      <section className='flex flex-col gap-3 pb-5'>
        <div className='flex items-center justify-between px-5 text-lt-lightest-gray'>
          <Label htmlFor='corner-style'>Corner style</Label>
          <div className='flex items-center gap-x-3'>
            <span className='text-sm'>{cornerStyleText}</span>
            <Switch
              id='corner-style'
              checked={cornerStyle}
              onCheckedChange={setCornerStyle}
              required
            />
          </div>
        </div>
        <div className='flex items-center justify-between px-5 text-lt-lightest-gray'>
          <Label htmlFor='content-container'>Content container</Label>
          <div className='flex items-center gap-x-3'>
            <span className='text-sm'>{contendContainerText}</span>
            <Switch
              id='content-container'
              checked={contendContainer}
              onCheckedChange={setContendContainer}
              required
            />
          </div>
        </div>
      </section>
    </section>
  )
}
