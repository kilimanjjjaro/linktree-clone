'use client'

import { useEffect, useState, useTransition } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { LoaderCircle } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorTooltip } from '@/components/ui/error-tooltip'
import { HelpPopover } from '@/components/ui/help-popover'
import { updateTree } from '@/lib/actions/trees/update-tree'
import { useStore } from '@/lib/store/store'
import { UpdateTreeSchema } from '@/lib/schemas/tree'
import { cn } from '@/lib/utils'
import { type ExtendedTree } from '@/lib/types/trees'

export default function TreeName() {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<string[]>([])
  const [treeName, setTreeName] = useState('')

  const updateName = useDebouncedCallback(() => {
    if (selectedTree === null) return

    startTransition(async () => {
      const validatedFields = UpdateTreeSchema.safeParse({ name: treeName })

      if (!validatedFields.success) {
        const errors = validatedFields.error.errors.map(
          (error) => error.message
        )
        setErrors(errors)

        return
      } else {
        setErrors([])
      }

      const { name } = validatedFields.data

      if (name === undefined) return

      const updatedTree = await updateTree({
        ...selectedTree,
        name
      })

      if (updatedTree !== null) {
        setSelectedTree(updatedTree)
        localStorage.setItem('__SELECTED_TREE__', JSON.stringify(updatedTree))
      }

      if (updatedTree === null) {
        const localTree = localStorage.getItem('__SELECTED_TREE__')

        if (localTree === null) return

        const tree = JSON.parse(localTree) as ExtendedTree

        setSelectedTree({ ...tree, name })
        localStorage.setItem(
          '__SELECTED_TREE__',
          JSON.stringify({ ...tree, name })
        )
      }
    })
  }, 300)

  useEffect(() => {
    if (selectedTree === null) return

    setTreeName(selectedTree.name)
  }, [selectedTree])

  const renderErrors = errors.length > 0 && !isPending

  return (
    <section className='flex flex-col gap-y-3 p-5'>
      <div className='flex items-center gap-x-2'>
        <Label htmlFor='tree-name'>Name</Label>
        <HelpPopover>
          This will be used as the name and for SEO of your tree. You can change
          it as many times as you want.
        </HelpPopover>
      </div>
      <div className='relative flex items-center'>
        <Input
          id='tree-name'
          type='text'
          value={treeName}
          placeholder='Tree Demonstration'
          onChange={(event) => {
            setTreeName(event.target.value)
            updateName()
          }}
          aria-invalid={errors.length > 0}
        />
        <LoaderCircle
          className={cn(
            'absolute right-3 size-4 transition-opacity animate-spin opacity-0',
            isPending && 'opacity-100'
          )}
          aria-hidden
        />
        {renderErrors && <ErrorTooltip errors={errors} />}
      </div>
    </section>
  )
}
