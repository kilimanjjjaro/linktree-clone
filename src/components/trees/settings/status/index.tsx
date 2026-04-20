'use client'

import { useEffect, useState } from 'react'
import { CircleHelp } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useStore } from '@/lib/store/store'
import { TREE_STATUS } from '@/lib/constants/trees'

export default function TreeStatus() {
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const setHasUnsavedChanges = useStore((state) => state.setHasUnsavedChanges)
  const [published, setPublished] = useState(false)

  const updateStatus = (treeStatus: boolean) => {
    if (selectedTree === null) return

    setPublished(treeStatus)

    const status = treeStatus ? TREE_STATUS.PUBLISHED : TREE_STATUS.DRAFT
    setSelectedTree({ ...selectedTree, status })
    setHasUnsavedChanges(true)
  }

  useEffect(() => {
    if (selectedTree === null) return

    setPublished(selectedTree.status === TREE_STATUS.PUBLISHED)
  }, [selectedTree])

  return (
    <section className='flex justify-between p-5'>
      <div className='flex items-center gap-x-2'>
        <Label htmlFor='tree-status'>Status</Label>
        <Popover>
          <PopoverTrigger>
            <CircleHelp className='size-3.5' aria-hidden />
            <span className='sr-only'>Show help</span>
          </PopoverTrigger>
          <PopoverContent>
            By default, new trees are in draft status. If you want that people
            can access to it, you need to publish it.
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex items-center gap-x-3'>
        <span className='text-lt-lightest-gray text-sm'>
          {published ? 'Published' : 'Draft'}
        </span>
        <Switch
          id='tree-status'
          checked={published}
          onCheckedChange={updateStatus}
          required
        />
      </div>
    </section>
  )
}
