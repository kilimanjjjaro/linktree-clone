'use client'

import { useState } from 'react'
import { CircleHelp, Plus } from 'lucide-react'
import MediaSelector from '@/components/links/settings/profile/social-media/media-selector'
import { buttonVariants } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { SOCIAL_MEDIA } from '@/lib/constants/globals'

export default function LinkSocialMedia() {
  const [selectedMedia, setSelectedMedia] = useState('')

  return (
    <div className='flex flex-col gap-3 p-5'>
      <div className='flex items-center gap-2'>
        <Label htmlFor='link-description'>Social media</Label>
        <Popover>
          <PopoverTrigger>
            <CircleHelp className='h-3.5 w-3.5' />
          </PopoverTrigger>
          <PopoverContent>
            <p className='text-sm text-muted-foreground'>
              Add icons linking to your social profiles, email and more.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <Dialog>
        <DialogTrigger
          className={`w-full cursor-pointer gap-x-1 ${buttonVariants({ variant: 'outline' })}`}
        >
          <Plus className='size-4' strokeWidth={1.5} />
          Add
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className='absolute left-0 top-0 flex h-12 w-full items-center justify-center border-b border-border p-3'>
            <DialogTitle>
              {selectedMedia.length > 0
                ? `Add ${SOCIAL_MEDIA.find((media) => media.value === selectedMedia)?.label ?? ''}`
                : 'Add social media'}
            </DialogTitle>
          </DialogHeader>
          <main className='mt-12 p-5'>
            <MediaSelector
              selectedMedia={selectedMedia}
              setSelectedMedia={setSelectedMedia}
            />
          </main>
        </DialogContent>
      </Dialog>
    </div>
  )
}
