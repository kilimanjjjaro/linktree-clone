'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function NewTree() {
  return (
    <Button variant='outline' className='h-full'>
      New tree
      <Plus className='size-4' aria-hidden />
    </Button>
  )
}
