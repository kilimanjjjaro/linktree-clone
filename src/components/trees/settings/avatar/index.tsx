'use client'

import { useTransition } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useStore } from '@/lib/store/store'
import { updateTree } from '@/lib/actions/trees/update-tree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { DIALOG } from '@/lib/constants/globals'
import { type ExtendedTree } from '@/lib/types/trees'

export default function TreeAvatar() {
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const setShowDialog = useStore((state) => state.setShowDialog)
  const setAvatar = useStore((state) => state.setAvatar)
  const avatar = useStore((state) => state.avatar)
  const [isPending, startTransition] = useTransition()

  const removeAvatar = () => {
    if (selectedTree === null) return

    startTransition(async () => {
      const defaultAvatar = DEMO_TREE_VALUES.avatar

      const response = await updateTree({
        ...selectedTree,
        avatar: defaultAvatar
      })

      if (response !== null) {
        setSelectedTree(response)
        localStorage.setItem('__SELECTED_TREE__', JSON.stringify(response))
      } else {
        const localTree = localStorage.getItem('__SELECTED_TREE__')

        if (localTree === null) return

        const tree = JSON.parse(localTree) as ExtendedTree

        localStorage.setItem(
          '__SELECTED_TREE__',
          JSON.stringify({ ...tree, avatar: defaultAvatar })
        )

        setSelectedTree({ ...tree, avatar: defaultAvatar })
        setAvatar(defaultAvatar)
      }

      toast.success('Your avatar was removed!')
    })

    // TODO: Delete avatar from cloudinary
  }

  return (
    <section className='p-5'>
      <Label htmlFor='tree-avatar'>Profile picture</Label>
      <div className='mt-2 flex items-center gap-x-5'>
        <div className='relative flex size-20 items-center justify-center overflow-hidden rounded-full border border-lt-light-gray/60'>
          <Image
            className='absolute size-full object-cover object-center'
            src={avatar}
            alt={`${selectedTree?.name ?? ''}'s avatar`}
            width={100}
            height={100}
          />
        </div>
        <div className='grid flex-1 grid-cols-2 gap-x-3'>
          <Button
            id='tree-avatar'
            variant='secondary'
            onClick={() => {
              setShowDialog(DIALOG.UPLOAD_AVATAR)
            }}
          >
            Upload
          </Button>
          <Button variant='outline' onClick={removeAvatar} disabled={isPending}>
            {isPending ? 'Removing' : 'Remove'}
          </Button>
        </div>
      </div>
    </section>
  )
}
