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

export default function SaveTreeDialog () {
  const showSaveTreeDialog = useStore((state) => state.showSaveTreeDialog)
  const setShowSaveTreeDialog = useStore((state) => state.setShowSaveTreeDialog)
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const [isPending, startTransition] = useTransition()

  const saveTree = async () => {
    if (selectedTree === null) return

    startTransition(async () => {
      const { data, error } = await createTree(selectedTree)

      if (data !== null) {
        setSelectedTree(data)
        localStorage.removeItem('__LOCAL_TREE__')
        setShowSaveTreeDialog(false)
      } else {
        toast.error(error)
      }
    })
  }

  const discardTree = () => {
    localStorage.removeItem('__LOCAL_TREE__')
    setShowSaveTreeDialog(false)
  }

  const saveButtonText = isPending ? 'Saving' : 'Save'

  return (
    <Dialog open={showSaveTreeDialog} onOpenChange={setShowSaveTreeDialog}>
      <DialogContent className='max-w-sm p-0'>
        <DialogHeader>
          <DialogTitle>Save tree</DialogTitle>
        </DialogHeader>
        <main className='mt-12 grid gap-y-5 p-5'>
          <p className=' text-center text-lt-lightest-gray'>
            Before continue, save or discard this tree.
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
