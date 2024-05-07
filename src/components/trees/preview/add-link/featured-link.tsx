'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function FeaturedLink() {
  const [featured, setFeatured] = useState(false)

  return (
    <fieldset className='flex flex-col gap-y-3'>
      <div className='flex items-center gap-x-3'>
        <div className='flex flex-col gap-y-1.5'>
          <Label htmlFor='featured-link'>Featured link</Label>
          <p className='text-sm text-lt-lightest-gray'>
            This will be displayed with a background image. We took it from the
            link, or you can upload your own after save it.
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
  )
}
