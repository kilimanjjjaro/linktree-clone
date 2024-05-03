'use client'

import DropAvatar from '@/components/trees/settings/avatar/drop-avatar'
import CropAvatar from '@/components/trees/settings/avatar/crop-avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useStore } from '@/lib/store/store'
import { DIALOG } from '@/lib/constants/globals'

export default function UploadAvatarDialog() {
  const avatarToCrop = useStore((state) => state.avatarToCrop)
  const showDialog = useStore((state) => state.showDialog)
  const setShowDialog = useStore((state) => state.setShowDialog)

  return (
    <Dialog
      open={showDialog === DIALOG.UPLOAD_AVATAR}
      onOpenChange={() => {
        setShowDialog(DIALOG.HIDDEN)
      }}
    >
      <DialogContent className='p-0 outline-none'>
        <DialogHeader>
          <DialogTitle>Upload avatar</DialogTitle>
        </DialogHeader>
        <main className='mt-12 p-5'>
          {avatarToCrop.length === 0 ? <DropAvatar /> : <CropAvatar />}
        </main>
      </DialogContent>
    </Dialog>
  )
}
