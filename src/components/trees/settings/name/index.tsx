'use client'

import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorTooltip } from '@/components/ui/error-tooltip'
import { HelpPopover } from '@/components/ui/help-popover'
import { useStore } from '@/lib/store/store-provider'
import { UpdateTreeSchema } from '@/lib/schemas/tree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'

export default function TreeName() {
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const [name, setName] = useState(selectedTree.name)
  const [prevTree, setPrevTree] = useState(selectedTree)
  const [errors, setErrors] = useState<string[]>([])

  if (selectedTree !== prevTree) {
    setPrevTree(selectedTree)
    if (selectedTree !== null) {
      setName(selectedTree.name)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedTree === null) return

    const value = event.target.value
    setName(value)
    setSelectedTree({ ...selectedTree, name: value })

    const validated = UpdateTreeSchema.safeParse({ name: value })
    setErrors(
      validated.success
        ? []
        : validated.error.issues.map((issue) => issue.message)
    )
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
          placeholder={DEMO_TREE_VALUES.name}
          aria-invalid={errors.length > 0}
        />
        <ErrorTooltip errors={errors} />
      </div>
    </section>
  )
}
