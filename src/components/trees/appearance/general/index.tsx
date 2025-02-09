'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function TreeGeneral() {
  const [cornerStyle, setCornerStyle] = useState(true)
  const [contendContainer, setContendContainer] = useState(false)

  const cornerStyleText = cornerStyle ? 'Rounded' : 'Straight'
  const contendContainerText = contendContainer ? 'Show' : 'Hide'

  return (
    <section className='p-5'>
      <h3 className='text-sm leading-none font-medium'>General</h3>
      <section className='mt-3 flex flex-col gap-3'>
        <div className='text-lt-lightest-gray flex items-center justify-between'>
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
        <div className='text-lt-lightest-gray flex items-center justify-between'>
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
