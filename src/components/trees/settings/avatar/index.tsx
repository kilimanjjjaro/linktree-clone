'use client'

import { useTransition } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'

import AvatarDialog from '@/components/trees/settings/avatar/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useStore } from '@/lib/store/store'
import useTree from '@/lib/hooks/useTree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'

export default function TreeAvatar() {
  const selectedTree = useStore((state) => state.selectedTree)
  const [isPending, startTransition] = useTransition()
  const { saveTree } = useTree()

  const removeAvatar = () => {
    if (selectedTree === null) return

    startTransition(async () => {
      await saveTree({
        avatar: DEMO_TREE_VALUES.avatar
      })

      toast.success('Your avatar was removed!')
    })

    // TODO: Delete avatar from cloudinary
  }

  return (
    <section className='p-5'>
      <Label htmlFor='tree-avatar'>Profile picture</Label>
      <div className='mt-2 flex items-center gap-x-5'>
        <div className='relative flex size-20 items-center justify-center overflow-hidden rounded-full border border-lt-light-gray/60'>
          {selectedTree !== null ? (
            <Image
              className='absolute size-full object-cover object-center'
              src={selectedTree.avatar}
              alt={`${selectedTree.name}'s profile picture`}
              width={100}
              height={100}
            />
          ) : (
            <Skeleton className='size-full rounded-full' />
          )}
        </div>
        <div className='grid flex-1 grid-cols-2 gap-x-3'>
          <AvatarDialog />
          <Button variant='outline' onClick={removeAvatar} disabled={isPending}>
            {isPending ? 'Removing' : 'Remove'}
          </Button>
        </div>
      </div>
    </section>
  )
}
