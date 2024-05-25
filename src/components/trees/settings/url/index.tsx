'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'
import { toast } from 'sonner'

import { ErrorTooltip } from '@/components/ui/error-tooltip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { HelpPopover } from '@/components/ui/help-popover'
import { useStore } from '@/lib/store/store'
import { useTree } from '@/lib/hooks/useTree'
import { UpdateTreeSchema } from '@/lib/schemas/tree'
import { BASE_URL } from '@/lib/constants/globals'

export default function TreeUrl() {
  const selectedTree = useStore((state) => state.selectedTree)
  const [errors, setErrors] = useState<string[]>([])
  const { saveTree } = useTree()

  const updateUrl = useDebouncedCallback(async (treeUrl: string) => {
    const validatedFields = UpdateTreeSchema.safeParse({
      url: treeUrl
    })

    if (!validatedFields.success) {
      const errors = validatedFields.error.errors.map((error) => error.message)
      setErrors(errors)

      return
    } else {
      setErrors([])
    }

    const { url } = validatedFields.data

    if (url === undefined) return

    await saveTree({ url })
  }, 300)

  const copyUrl = () => {
    if (selectedTree === null) return

    navigator.clipboard
      .writeText(`${BASE_URL}/${selectedTree.url}`)
      .then(() => {
        toast.success('Url copied. Go and share it!')
      })
      .catch(() => {
        toast.error('Somethign went wrong!')
      })
  }

  return (
    <section className='flex flex-col gap-y-3 p-5'>
      <div className='flex items-center gap-x-2'>
        <Label htmlFor='tree-url'>URL</Label>
        <HelpPopover>
          This will be used as the URL and for SEO of your tree. You can change
          it as many times as you want.
        </HelpPopover>
      </div>
      <div className='group relative flex h-10 items-center overflow-hidden rounded-full border border-lt-light-gray/60 ring-lt-white ring-offset-2 ring-offset-lt-gray has-[:focus-visible]:ring-2 has-[input[aria-invalid=true]]:ring-2 has-[input[aria-invalid=true]]:ring-red-500'>
        <span className='flex h-full cursor-not-allowed select-none items-center border-r border-lt-light-gray/60 px-3 text-sm text-lt-lightest-gray'>
          linktr.ee/
        </span>
        <Input
          id='tree-url'
          className='rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 aria-[invalid=true]:ring-0'
          type='text'
          defaultValue={selectedTree?.url}
          aria-invalid={errors.length > 0}
          onChange={async (event) => {
            await updateUrl(event.target.value)
          }}
        />
        <ErrorTooltip errors={errors} />
        <Button
          size='icon'
          variant='outline'
          className='absolute right-1.5 size-6 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100'
          onClick={copyUrl}
        >
          <Copy className='size-3' strokeWidth={1.5} aria-hidden />
          <span className='sr-only'>Copy Order ID</span>
        </Button>
      </div>
    </section>
  )
}
