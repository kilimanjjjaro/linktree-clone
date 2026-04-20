'use client'

import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorTooltip } from '@/components/ui/error-tooltip'
import { HelpPopover } from '@/components/ui/help-popover'
import { useStore } from '@/lib/store/store'
import { UpdateTreeSchema } from '@/lib/schemas/tree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'

export default function TreeName() {
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const setHasUnsavedChanges = useStore((state) => state.setHasUnsavedChanges)
  const [name, setName] = useState(selectedTree.name)
  const [prevTree, setPrevTree] = useState(selectedTree)
  const [errors, setErrors] = useState<string[]>([])

  if (selectedTree !== prevTree) {
    setPrevTree(selectedTree)
    if (selectedTree !== null) {
      setName(selectedTree.name)
    }
  }

  const savedTree = useStore((state) => state.savedTree)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setName(value)
    setHasUnsavedChanges(value !== savedTree?.name)
  }

  const handleBlur = () => {
    if (selectedTree === null) return
    if (name === selectedTree.name) return

    const validated = UpdateTreeSchema.safeParse({ name })

    if (!validated.success) {
      setErrors(validated.error.issues.map((issue) => issue.message))
      return
    }

    setErrors([])

    setSelectedTree({ ...selectedTree, name })
    setHasUnsavedChanges(true)
  }

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
          name='name'
          type='text'
          className='peer'
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={DEMO_TREE_VALUES.name}
          aria-invalid={errors.length > 0}
        />
        <ErrorTooltip errors={errors} />
      </div>
    </section>
  )
}
