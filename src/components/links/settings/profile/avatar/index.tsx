'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import DropAvatar from '@/components/links/settings/profile/avatar/drop-avatar'
import CropAvatar from '@/components/links/settings/profile/avatar/crop-avatar'
import Avatar from '@/components/ui/custom/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useStore } from '@/lib/store/store'
import { DEFAULT_USER_AVATAR } from '@/lib/constants/avatar'

export default function LinkAvatar() {
  const avatar = useStore((state) => state.avatar)
  const setAvatar = useStore((state) => state.setAvatar)
  const avatarToCrop = useStore((state) => state.avatarToCrop)
  const [showDialog, setShowDialog] = useState(false)

  const removeAvatar = () => {
    if (avatar === DEFAULT_USER_AVATAR) return

    setAvatar(DEFAULT_USER_AVATAR)
    toast.success('Your avatar was removed!')

    // TODO: Delete avatar from cloudinary
  }

  return (
    <section className='flex items-center gap-x-5 p-5'>
      <Avatar className='size-20 ring-transparent' src={avatar} alt='Gonzalo' />
      <div className='grid flex-1 grid-cols-2 gap-x-3'>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button
              variant='secondary'
              onClick={() => {
                removeAvatar()
              }}
            >
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
        <Button
          variant='outline'
          onClick={() => {
            removeAvatar()
          }}
        >
          Remove
        </Button>
      </div>
    </section>
  )
}
