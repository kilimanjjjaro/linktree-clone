'use client'

import { useState } from 'react'

import DropAvatar from '@/components/trees/settings/avatar/drop-avatar'
import CropAvatar from '@/components/trees/settings/avatar/crop-avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

export default function UploadAvatarDialog() {
  const [avatarToCrop, setAvatarToCrop] = useState('')
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button id='tree-avatar'>Upload</Button>
      </DialogTrigger>
      <DialogContent className='p-0 outline-none'>
        <DialogHeader>
          <DialogTitle>Upload avatar</DialogTitle>
        </DialogHeader>
        <main className='mt-12 p-5'>
          {avatarToCrop.length === 0 ? (
            <DropAvatar setAvatarToCrop={setAvatarToCrop} />
          ) : (
            <CropAvatar
              closeDialog={() => {
                setOpen(false)
              }}
              avatarToCrop={avatarToCrop}
              setAvatarToCrop={setAvatarToCrop}
            />
          )}
        </main>
      </DialogContent>
    </Dialog>
  )
}
