'use client'

import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import DropAvatar from './drop-avatar'
import CropAvatar from './crop-avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useStore } from '@/lib/store/store'
import { DEFAULT_TREE_AVATAR } from '@/lib/constants/trees'
import { Label } from '@/components/ui/label'

export default function TreeAvatar() {
  const avatar = useStore((state) => state.avatar)
  const setAvatar = useStore((state) => state.setAvatar)
  const avatarToCrop = useStore((state) => state.avatarToCrop)
  const [showDialog, setShowDialog] = useState(false)

  const removeAvatar = () => {
    setAvatar(DEFAULT_TREE_AVATAR)
    toast.success('Your avatar was removed!')

    // TODO: Delete avatar from cloudinary
  }

  return (
    <section className='p-5'>
      <Label htmlFor='tree-avatar'>Profile picture</Label>
      <div className='mt-2 flex items-center gap-x-5'>
        <div className='relative size-20 overflow-hidden rounded-full border border-lt-light-gray/60'>
          <Image
            className='absolute h-auto w-full object-cover object-center'
            src={avatar}
            alt='Gonzalo'
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
          />
        </div>
        <div className='grid flex-1 grid-cols-2 gap-x-3'>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button id='tree-avatar' variant='secondary'>
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent className='p-0 outline-none'>
              <DialogHeader>
                <DialogTitle>Upload avatar</DialogTitle>
              </DialogHeader>
              <main className='mt-12 p-5'>
                {avatarToCrop.length === 0 ? (
                  <DropAvatar />
                ) : (
                  <CropAvatar setShowDialog={setShowDialog} />
                )}
              </main>
            </DialogContent>
          </Dialog>
          <Button variant='outline' onClick={removeAvatar}>
            Remove
          </Button>
        </div>
      </div>
    </section>
  )
}
