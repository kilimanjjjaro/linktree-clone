'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorTooltip } from '@/components/ui/error-tooltip'
import { HelpPopover } from '@/components/ui/help-popover'
import { updateTree } from '@/lib/actions/trees/update-tree'
import { useStore } from '@/lib/store/store'
import { UpdateTreeSchema } from '@/lib/schemas/tree'
import { type ExtendedTree } from '@/lib/types/trees'

export default function TreeName({ tree }: { tree: ExtendedTree }) {
  const setSavingTree = useStore((state) => state.setSavingTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)
  const [errors, setErrors] = useState<string[]>([])
  const pathname = usePathname()
  const router = useRouter()

  const updateName = useDebouncedCallback(async (treeName: string) => {
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

    const response = await updateTree({
      ...tree,
      name
    })

    const params = new URLSearchParams()

    if (response !== null) {
      setSavingTree(false)

      setSelectedTree(response)
      params.set('slug', response.slug)
      router.replace(`${pathname}?slug=${response.slug}`, {
        scroll: false
      })
    } else {
      setSelectedTree(tree)
      params.set('slug', tree.slug)
      router.replace(`${pathname}?slug=${tree.slug}`, {
        scroll: false
      })
    }
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
            if (selectedTree === null) return

            setSelectedTree({ ...selectedTree, name: event.target.value })
            await updateName(event.target.value)
          }}
        />
        <ErrorTooltip errors={errors} />
      </div>
    </section>
  )
}
