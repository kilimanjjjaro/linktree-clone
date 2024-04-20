'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function FeaturedLink() {
  const [featured, setFeatured] = useState(false)

  return (
    <>
      <fieldset className='flex flex-col gap-y-3'>
        <div className='flex items-center gap-x-3'>
          <div className='flex flex-col gap-y-1.5'>
            <Label htmlFor='featured-link'>Featured link</Label>
            <p className='text-sm text-lt-lightest-gray'>
              This will be displayed with a background image. We took it from
              the link, or you can upload your own after save it.
            </p>
          </div>
          <Switch
            id='featured-link'
            name='featured-link'
            checked={featured}
            onCheckedChange={setFeatured}
          />
        </div>
      </fieldset>
      {/* {featured && (
        <div
          className='relative aspect-video overflow-hidden rounded-xl bg-cover bg-center'
          style={{
            backgroundImage: 'url(/images/background-variants/lava-lamp.jpg)'
          }}
        >
          <div className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 to-black/0' />
          <div className='absolute bottom-0 left-0 p-5'>
            <h3 className='text-balance text-xl leading-none'>Example link</h3>
          </div>
          <Button
            aria-label='Upload background image'
            className='absolute right-2 top-2 h-auto rounded-full bg-lt-white/90 p-2'
          >
            <Upload className='size-4 translate-y-px' strokeWidth={2.5} />
          </Button>
        </div>
      )} */}
    </>
  )
}
