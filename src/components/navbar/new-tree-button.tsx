'use client'

import { useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { LoaderCircle, Plus } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { createDefaultTree } from '@/lib/actions/trees/create-default-tree'
import { useStore } from '@/lib/store/store'

export default function NewTreeButton() {
  const setShowSaveTreeDialog = useStore((state) => state.setShowSaveTreeDialog)
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const router = useRouter()

  const handleCreate = async () => {
    const localTree = localStorage.getItem('__LOCAL_TREE__')

    if (localTree !== null) {
      setShowSaveTreeDialog(true)
      return
    }

    startTransition(async () => {
      const response = await createDefaultTree()

      if (response.data === null) {
        toast.error(response.error)
      } else {
        const params = new URLSearchParams()
        const slug = response.data.slug

        params.set('slug', slug)
        router.replace(`${pathname}?slug=${slug}`, {
          scroll: false
        })

        toast.success(response.success)
      }
    })
  }

  return (
    <Button
      variant='secondary'
      className='h-full'
      onClick={handleCreate}
      disabled={isPending}
    >
      {isPending ? (
        <>
          Creating
          <LoaderCircle className='size-4 animate-spin' aria-hidden />
        </>
      ) : (
        <>
          New tree
          <Plus className='size-4' aria-hidden />
        </>
      )}
    </Button>
  )
}
