'use client'

import Image from 'next/image'

import UploadAvatarDialog from '@/components/trees/settings/avatar/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useStore } from '@/lib/store/store'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'

export default function TreeAvatar() {
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const setHasUnsavedChanges = useStore((state) => state.setHasUnsavedChanges)

  const removeAvatar = () => {
    if (selectedTree === null) return

    setSelectedTree({ ...selectedTree, avatar: DEMO_TREE_VALUES.avatar })
    setHasUnsavedChanges(true)

    // TODO: Delete avatar from cloudinary
  }

  return (
    <section className='p-5'>
      <Label htmlFor='tree-avatar'>Profile picture</Label>
      <div className='mt-2 flex items-center gap-x-5'>
        <div className='border-lt-light-gray/60 relative flex size-20 items-center justify-center overflow-hidden rounded-full border'>
          <Image
            className='absolute size-full object-cover object-center'
            src={selectedTree.avatar}
            alt={`${selectedTree.name}'s profile picture`}
            width={100}
            height={100}
          />
        </div>
        <div className='grid flex-1 grid-cols-2 gap-x-3'>
          <UploadAvatarDialog />
          <Button variant='secondary' onClick={removeAvatar}>
            Remove
          </Button>
        </div>
      </div>
    </section>
  )
}
