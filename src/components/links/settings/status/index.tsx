'use client'

import { CircleHelp } from 'lucide-react'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

export default function LinkStatus() {
  const [status, setStatus] = useState(false)

  const text = status ? 'Published' : 'Draft'

  return (
    <section className='flex justify-between p-5'>
      <div className='flex items-center gap-x-2'>
        <Label htmlFor='link-status'>Status</Label>
        <Popover>
          <PopoverTrigger>
            <CircleHelp className='size-3.5' />
            <span className='sr-only'>Show help</span>
          </PopoverTrigger>
          <PopoverContent>
            By default, when you create a new link, it is in draft status. Only
            you can access it.
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex items-center gap-x-3'>
        <span className='text-sm text-lt-lightest-gray'>{text}</span>
        <Switch
          id='link-status'
          checked={status}
          onCheckedChange={setStatus}
          required
        />
      </div>
    </section>
  )
}
