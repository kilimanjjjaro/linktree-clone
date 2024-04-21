'use client'

import { Button } from '@/components/ui/button'
import { addNewTree } from '@/lib/actions/trees/add-new'
import { Plus } from 'lucide-react'

export default function NewTree() {
  return (
    <Button
      variant='outline'
      className='h-full'
      onClick={async () => await addNewTree()}
    >
      New tree
      <Plus className='size-4' aria-hidden />
    </Button>
  )
}
