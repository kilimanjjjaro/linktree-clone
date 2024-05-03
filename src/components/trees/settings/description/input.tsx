'use client'

import { useState, useTransition } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useStore } from '@/lib/store/store'
import { useDebouncedCallback } from 'use-debounce'
import { updateTree } from '@/lib/actions/trees/update-tree'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type ExtendedTree } from '@/lib/types/trees'

export default function DescriptionInput() {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)
  const [textareaLength, setTextareaLength] = useState(0)
  const [isPending, startTransition] = useTransition()

  const updateDescription = useDebouncedCallback((description: string) => {
    if (selectedTree === null) return

    startTransition(async () => {
      const updatedTree = await updateTree({
        ...selectedTree,
        description
      })

      if (updatedTree !== null) {
        setSelectedTree(updatedTree)
        localStorage.setItem('__SELECTED_TREE__', JSON.stringify(updatedTree))
      }

      if (updatedTree === null) {
        const localTree = localStorage.getItem('__SELECTED_TREE__')

        if (localTree === null) return

        const tree = JSON.parse(localTree) as ExtendedTree

        localStorage.setItem(
          '__SELECTED_TREE__',
          JSON.stringify({ ...tree, description })
        )
        setSelectedTree({ ...tree, description })
      }
    })
  }, 300)

  return (
    <div className='relative flex'>
      <Textarea
        id='tree-description'
        className='min-h-[86px] resize-none'
        defaultValue={selectedTree?.description ?? ''}
        placeholder='Full Stack Developer & UX/UI Designer with +6 years of work experience.'
        maxLength={120}
        onChange={(event) => {
          setTextareaLength(event.target.value.length)
          updateDescription(event.target.value)
        }}
      />
      <span className='pointer-events-none absolute bottom-2.5 right-3 select-none text-[11px] leading-none text-lt-lightest-gray'>
        {textareaLength}/120
      </span>
      <LoaderCircle
        className={cn(
          'absolute right-3 top-3 size-4 transition-opacity animate-spin opacity-0',
          isPending && 'opacity-100'
        )}
        aria-hidden
      />
    </div>
  )
}
