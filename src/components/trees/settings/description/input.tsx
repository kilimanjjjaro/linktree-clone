'use client'

import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { Textarea } from '@/components/ui/textarea'
import { ErrorTooltip } from '@/components/ui/error-tooltip'
import { useStore } from '@/lib/store/store'
import { useTree } from '@/lib/hooks/useTree'
import { UpdateTreeSchema } from '@/lib/schemas/tree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'

export default function DescriptionInput() {
  const selectedTree = useStore((state) => state.selectedTree)
  const [textareaLength, setTextareaLength] = useState(0)
  const [errors, setErrors] = useState<string[]>([])
  const { saveTree } = useTree()

  const updateDescription = useDebouncedCallback(
    async (treeDescription: string) => {
      const validatedFields = UpdateTreeSchema.safeParse({
        description: treeDescription
      })

      if (!validatedFields.success) {
        const errors = validatedFields.error.errors.map(
          (error) => error.message
        )
        setErrors(errors)

        return
      } else {
        setErrors([])
      }

      const { description } = validatedFields.data

      if (description === undefined) return

      await saveTree({ description })
    },
    300
  )

  return (
    <div className='relative flex'>
      <Textarea
        id='tree-description'
        className='min-h-[86px] resize-none'
        defaultValue={selectedTree?.description}
        placeholder={DEMO_TREE_VALUES.description}
        aria-invalid={errors.length > 0}
        maxLength={120}
        onChange={async (event) => {
          setTextareaLength(event.target.value.length)
          await updateDescription(event.target.value)
        }}
      />
      <span className='pointer-events-none absolute bottom-2.5 right-3 select-none text-[11px] leading-none text-lt-lightest-gray'>
        {textareaLength}/120
      </span>
      <ErrorTooltip errors={errors} isDescription />
    </div>
  )
}
