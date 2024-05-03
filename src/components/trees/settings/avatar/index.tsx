'use client'

import { useEffect, useState, useTransition } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'

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
import { useStore } from '@/lib/store/store'
import { Label } from '@/components/ui/label'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { updateTree } from '@/lib/actions/trees/update-tree'
import { type ExtendedTree } from '@/lib/types/trees'

export default function TreeAvatar() {
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const avatarToCrop = useStore((state) => state.avatarToCrop)
  const setAvatar = useStore((state) => state.setAvatar)
  const avatar = useStore((state) => state.avatar)
  const [showDialog, setShowDialog] = useState(false)
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

  useEffect(() => {
    if (selectedTree === null) return

    setAvatar(selectedTree.avatar)
  }, [selectedTree, setAvatar, avatar])

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
          <Button variant='outline' onClick={removeAvatar} disabled={isPending}>
            {isPending ? 'Removing' : 'Remove'}
          </Button>
        </div>
      </div>
    </section>
  )
}
