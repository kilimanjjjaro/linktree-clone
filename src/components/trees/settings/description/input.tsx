'use client'

import { useEffect, useState } from 'react'
import { Forward } from 'lucide-react'

import { Textarea } from '@/components/ui/textarea'
import { ErrorTooltip } from '@/components/ui/error-tooltip'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import useTree from '@/lib/hooks/useTree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { cn } from '@/lib/utils'

export default function DescriptionInput () {
  const selectedTree = useStore((state) => state.selectedTree)
  const savingTree = useStore((state) => state.savingTree)
  const [textareaLength, setTextareaLength] = useState(0)
  const { saveTree, errors } = useTree()

  const updateDescription = async (event: React.FormEvent<HTMLFormElement>) => {
    if (savingTree) return
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const description = formData.get('description') as string

    await saveTree({ description })
  }

  useEffect(() => {
    if (selectedTree === null) return

    setTextareaLength(selectedTree.description.length)
  }, [selectedTree])

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
      <span className='pointer-events-none absolute bottom-2.5 right-3 select-none text-[11px] leading-none text-lt-lightest-gray'>
        {textareaLength}/120
      </span>
      <ErrorTooltip errors={errors} />
      <Button
        type='submit'
        size='icon'
        variant='outline'
        className={cn(
          'absolute right-1.5 top-1.5 size-6 border-none opacity-0 transition-opacity focus-visible:opacity-100 peer-focus-visible:opacity-100',
          savingTree && '!opacity-0'
        )}
      >
        <Forward className='size-4 translate-y-px rotate-180' />
        <span className='sr-only'>Save</span>
      </Button>
    </form>
  )
}
