'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import { createTree } from '@/lib/actions/trees/create-tree'

export default function SaveTreesDialog() {
  const setSaveTreeDialog = useStore((state) => state.setSaveTreeDialog)
  const saveTreeDialog = useStore((state) => state.saveTreeDialog)
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const [isPending, startTransition] = useTransition()

  const saveTree = async () => {
    if (selectedTree === null) return

    startTransition(async () => {
      const response = await createTree(selectedTree)

      if (response.data !== null) {
        toast.success(response.success)
        setSelectedTree(response.data)
        localStorage.setItem('__SELECTED_TREE__', JSON.stringify(response.data))
        setSaveTreeDialog(false)
      } else {
        toast.error(response.error)
      }
    })
  }

  const saveButtonText = isPending ? 'Saving' : 'Save'

  return (
    <Dialog open={saveTreeDialog} onOpenChange={setSaveTreeDialog}>
      <DialogContent className='max-w-sm p-0'>
        <DialogHeader>
          <DialogTitle>Save work</DialogTitle>
        </DialogHeader>
        <main className='mt-12 grid gap-y-5 p-5'>
          <p className='text-balance text-center text-lt-lightest-gray'>
            You want to save your tree before continue?
          </p>
          <div className='grid grid-cols-2 gap-x-3'>
            <Button
              variant='outline'
              onClick={() => {
                setSaveTreeDialog(false)
              }}
            >
              Dissmis
            </Button>
            <Button variant='secondary' onClick={saveTree} disabled={isPending}>
              {isPending && (
                <LoaderCircle className='size-4 animate-spin' aria-hidden />
              )}
              {saveButtonText}
            </Button>
          </div>
        </main>
      </DialogContent>
    </Dialog>
  )
}
