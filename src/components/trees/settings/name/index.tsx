'use client'

import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorTooltip } from '@/components/ui/error-tooltip'
import { HelpPopover } from '@/components/ui/help-popover'
import { updateTree } from '@/lib/actions/trees/update-tree'
import { useStore } from '@/lib/store/store'
import { UpdateTreeSchema } from '@/lib/schemas/tree'
import { type ExtendedTree } from '@/lib/types/trees'

export default function TreeName() {
  const setSavingTree = useStore((state) => state.setSavingTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)
  const [errors, setErrors] = useState<string[]>([])

  const handleChange = useDebouncedCallback(async (treeName: string) => {
    if (selectedTree === null) return

    const validatedFields = UpdateTreeSchema.safeParse({
      name: treeName
    })

    if (!validatedFields.success) {
      const errors = validatedFields.error.errors.map((error) => error.message)
      setErrors(errors)

      return
    } else {
      setErrors([])
    }

    setSavingTree(true)

    const { name } = validatedFields.data

    if (name === undefined) return

    const updatedTree = await updateTree({
      ...selectedTree,
      name
    })

    if (updatedTree !== null) {
      setSelectedTree(updatedTree)
      localStorage.setItem('__SELECTED_TREE__', JSON.stringify(updatedTree))
    } else {
      const localTree = localStorage.getItem('__SELECTED_TREE__')

      if (localTree === null) return

      const tree = JSON.parse(localTree) as ExtendedTree

      setSelectedTree({ ...tree, name })
      localStorage.setItem(
        '__SELECTED_TREE__',
        JSON.stringify({ ...tree, name })
      )
    }

    setSavingTree(false)
  }, 300)

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
          className='peer'
          type='text'
          defaultValue={selectedTree?.name}
          placeholder='Tree Demonstration'
          aria-invalid={errors.length > 0}
          onChange={async (event) => {
            await handleChange(event.target.value)
          }}
        />
        <ErrorTooltip errors={errors} />
      </div>
    </section>
  )
}
