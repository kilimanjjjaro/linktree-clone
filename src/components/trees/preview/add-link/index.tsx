'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import { DIALOG } from '@/lib/constants/globals'

export default function AddLink() {
  const setShowDialog = useStore((state) => state.setShowDialog)

  return (
    <footer className='absolute bottom-12 w-full px-11'>
      <Button
        className='w-full'
        onClick={() => {
          setShowDialog(DIALOG.ADD_LINK)
        }}
      >
        Add link <Plus className='size-3.5' aria-hidden />
      </Button>
    </footer>
  )
}
