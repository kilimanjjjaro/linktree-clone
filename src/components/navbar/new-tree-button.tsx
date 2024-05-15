'use client'

import { useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LoaderCircle, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { createDefaultTree } from '@/lib/actions/trees/create-default-tree'

export default function NewTreeButton() {
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const router = useRouter()

  const handleCreate = async () => {
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
