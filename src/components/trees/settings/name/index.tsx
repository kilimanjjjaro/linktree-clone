'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import slugify from '@sindresorhus/slugify'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorTooltip } from '@/components/ui/error-tooltip'
import { HelpPopover } from '@/components/ui/help-popover'
import { useStore } from '@/lib/store/store'
import { useTree } from '@/lib/hooks/useTree'
import { UpdateTreeSchema } from '@/lib/schemas/tree'
import { useCurrentUser } from '@/lib/hooks/useCurrentUser'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'

export default function TreeName() {
  const selectedTree = useStore((state) => state.selectedTree)
  const [errors, setErrors] = useState<string[]>([])
  const user = useCurrentUser()
  const { saveTree } = useTree()
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

    const { name } = validatedFields.data

    if (name === undefined) return

    const response = await saveTree({ name, slug: slugify(name) })

    if (response !== null) {
      const params = new URLSearchParams()
      params.set('slug', response.slug)
      router.replace(`${pathname}?slug=${response.slug}`, {
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
          placeholder={DEMO_TREE_VALUES.name}
          aria-invalid={errors.length > 0}
          onChange={async (event) => {
            await updateName(event.target.value)
          }}
        />
        <ErrorTooltip errors={errors} />
      </div>
    </section>
  )
}
