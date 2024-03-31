'use client'

import { Avatar } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import DropAndDrag from './upload-avatar'
import { useStore } from '@/lib/store/store'
import CropAvatar from './crop-avatar'
import { useMemo } from 'react'

export default function AvatarSettings() {
  const avatar = useStore((state) => state.avatar)
  const avatarToCrop = useStore((state) => state.avatarToCrop)

  const avatarUrl = useMemo(() => {
    return avatar ?? '/images/avatar.webp'
  }, [avatar])

  return (
    <div className='flex items-center gap-x-5 p-5'>
      <Avatar className='size-20' src={avatarUrl} alt='Gonzalo' />
      <div className='grid flex-1 grid-cols-2 gap-3'>
        <Dialog>
          <DialogTrigger
            className={`cursor-pointer ${buttonVariants({ variant: 'secondary' })}`}
          >
            Upload
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className='gap-5'>
              <DialogTitle>Upload your avatar</DialogTitle>
            </DialogHeader>
            {avatarToCrop === null ? <DropAndDrag /> : <CropAvatar />}
          </DialogContent>
        </Dialog>
        <Button variant='outline'>Remove</Button>
      </div>
    </div>
  )
}
