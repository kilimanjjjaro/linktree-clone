'use client'

import { Forward } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ErrorTooltip } from '@/components/ui/error-tooltip'
import { HelpPopover } from '@/components/ui/help-popover'
import { useStore } from '@/lib/store/store'
import useTree from '@/lib/hooks/useTree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { cn } from '@/lib/utils'

export default function TreeName() {
  const selectedTree = useStore((state) => state.selectedTree)
  const savingTree = useStore((state) => state.savingTree)
  const { saveTree, errors } = useTree()

  const updateName = async (event: React.FormEvent<HTMLFormElement>) => {
    if (savingTree) return
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string

    await saveTree({ name })
  }

  return (
    <form
      onSubmit={async (event) => {
        await updateName(event)
      }}
      className='flex flex-col gap-y-3 p-5'
    >
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
          className='peer pr-7'
          defaultValue={selectedTree?.name}
          placeholder={DEMO_TREE_VALUES.name}
          aria-invalid={errors.length > 0}
        />
        <ErrorTooltip errors={errors} />
        <Button
          type='submit'
          size='icon'
          variant='outline'
          className={cn(
            'absolute right-1.5 size-6 border-none opacity-0 transition-opacity peer-focus-visible:opacity-100 focus-visible:opacity-100',
            savingTree && '!opacity-0'
          )}
        >
          <Forward className='size-4 translate-y-px rotate-180' />
          <span className='sr-only'>Save</span>
        </Button>
      </div>
    </form>
  )
}
