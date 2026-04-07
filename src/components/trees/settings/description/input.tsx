'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

import { Textarea } from '@/components/ui/textarea'
import { ErrorTooltip } from '@/components/ui/error-tooltip'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import useTree from '@/lib/hooks/useTree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { cn } from '@/lib/utils'

export default function DescriptionInput() {
  const selectedTree = useStore((state) => state.selectedTree)
  const savingTree = useStore((state) => state.savingTree)
  const [textareaLength, setTextareaLength] = useState(selectedTree?.description.length ?? 0)
  const [prevTree, setPrevTree] = useState(selectedTree)
  const { saveTree, errors } = useTree()

  if (selectedTree !== prevTree) {
    setPrevTree(selectedTree)
    if (selectedTree !== null) {
      setTextareaLength(selectedTree.description.length)
    }
  }

  const updateDescription = async (event: React.FormEvent<HTMLFormElement>) => {
    if (savingTree) return
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const description = formData.get('description') as string

    await saveTree({ description })
  }

  return (
    <form onSubmit={updateDescription} className='relative flex'>
      <Textarea
        id='tree-description'
        name='description'
        className='peer min-h-[86px] resize-none pr-7'
        defaultValue={selectedTree?.description}
        placeholder={DEMO_TREE_VALUES.description}
        aria-invalid={errors.length > 0}
        maxLength={120}
        onChange={(event) => {
          setTextareaLength(event.target.value.length)
        }}
      />
      <span className='text-lt-lightest-gray pointer-events-none absolute right-3 bottom-2.5 text-[11px] leading-none select-none'>
        {textareaLength}/120
      </span>
      <ErrorTooltip errors={errors} />
      <Button
        type='submit'
        size='icon'
        className={cn(
          'absolute top-1.5 right-1.5 size-6 border-none opacity-0 transition-opacity peer-focus-visible:opacity-100 focus-visible:opacity-100',
          savingTree && 'opacity-0!'
        )}
      >
        <Check className='size-4 translate-y-px' />
        <span className='sr-only'>Save</span>
      </Button>
    </form>
  )
}
