'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import slugify from '@sindresorhus/slugify'
import { toast } from 'sonner'
import { Check, Copy } from 'lucide-react'

import { ErrorTooltip } from '@/components/ui/error-tooltip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { HelpPopover } from '@/components/ui/help-popover'
import { useStore } from '@/lib/store/store'
import useTree from '@/lib/hooks/useTree'
import { BASE_URL } from '@/lib/constants/globals'
import { cn } from '@/lib/utils'

export default function TreeUrl() {
  const selectedTree = useStore((state) => state.selectedTree)
  const savingTree = useStore((state) => state.savingTree)
  const [treeUrl, setTreeUrl] = useState(selectedTree?.url ?? '')
  const [prevTree, setPrevTree] = useState(selectedTree)
  const { saveTree, errors } = useTree()
  const pathname = usePathname()
  const router = useRouter()

  if (selectedTree !== prevTree) {
    setPrevTree(selectedTree)
    if (selectedTree !== null) {
      setTreeUrl(selectedTree.url)
    }
  }

  const updateUrl = async (event: React.FormEvent<HTMLFormElement>) => {
    if (savingTree) return
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const url = formData.get('url') as string

    const response = await saveTree({ url: slugify(url) })

    if (response === null) return

    const params = new URLSearchParams()
    params.set('tree', response.url)
    router.replace(`${pathname}?tree=${response.url}`, {
      scroll: false
    })
  }

  const copyUrl = () => {
    if (selectedTree === null) return

    navigator.clipboard
      .writeText(`${BASE_URL}/${selectedTree.url}`)
      .then(() => {
        toast.success('Url copied. Go and share it!')
      })
      .catch(() => {
        toast.error('Something went wrong.')
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
      <form
        onSubmit={updateUrl}
        className='border-lt-light-gray/60 ring-lt-white ring-offset-lt-gray relative flex h-10 items-center rounded-full border ring-offset-2 has-[:focus-visible]:ring-2 has-[input[aria-invalid=true]]:ring-2 has-[input[aria-invalid=true]]:ring-red-500'
      >
        <span className='border-lt-light-gray/60 text-lt-lightest-gray flex h-full cursor-not-allowed items-center border-r px-3 text-sm select-none'>
          linktr.ee/
        </span>
        <Input
          id='tree-url'
          type='text'
          name='url'
          className='peer overflow-hidden rounded-full rounded-l-none border-none pr-7 focus-visible:ring-0 focus-visible:ring-offset-0 aria-[invalid=true]:ring-0'
          value={treeUrl}
          onChange={(event) => {
            setTreeUrl(event.target.value)
          }}
          aria-invalid={errors.length > 0}
        />
        <ErrorTooltip errors={errors} />
        <Button
          type='submit'
          size='icon'
          className={cn(
            'absolute right-1.5 size-6 border-none opacity-0 transition-opacity peer-focus-visible:opacity-100 focus-visible:opacity-100',
            savingTree && 'opacity-0!'
          )}
        >
          <Check className='size-4 translate-y-px' />
          <span className='sr-only'>Save</span>
        </Button>
      </form>
      <Button onClick={copyUrl}>
        Copy
        <Copy className='size-3.5' aria-hidden />
      </Button>
    </section>
  )
}
