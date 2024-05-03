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
import { DIALOG } from '@/lib/constants/globals'

export default function SaveTreeDialog() {
  const setShowDialog = useStore((state) => state.setShowDialog)
  const showDialog = useStore((state) => state.showDialog)
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const [isPending, startTransition] = useTransition()

  const saveTree = async () => {
    if (selectedTree === null) return

    startTransition(async () => {
      const { data, success, error } = await createTree(selectedTree)

      if (data !== null) {
        toast.success(success)
        setSelectedTree(data)
        localStorage.setItem('__SELECTED_TREE__', JSON.stringify(data))
        setShowDialog(DIALOG.SAVE_TREE)
      } else {
        toast.error(error)
      }
    })
  }

  const discardTree = () => {
    localStorage.removeItem('__SELECTED_TREE__')
    setShowDialog(DIALOG.HIDDEN)
    toast('Your tree was discarded.')
  }

  const saveButtonText = isPending ? 'Saving' : 'Save'

  return (
    <Dialog
      open={showDialog === DIALOG.SAVE_TREE}
      onOpenChange={() => {
        setShowDialog(DIALOG.HIDDEN)
      }}
    >
      <DialogContent className='max-w-sm p-0'>
        <DialogHeader>
          <DialogTitle>Save work</DialogTitle>
        </DialogHeader>
        <main className='mt-12 grid gap-y-5 p-5'>
          <p className='text-balance text-center text-lt-lightest-gray'>
            You want to save your tree before continue?
          </p>
          <div className='grid grid-cols-2 gap-x-3'>
            <Button variant='outline' onClick={discardTree}>
              Discard
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
