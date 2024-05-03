import { Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { HelpPopover } from '@/components/ui/help-popover'

export default function TreeUrl() {
  return (
    <section className='flex flex-col gap-y-3 p-5'>
      <div className='flex items-center gap-x-2'>
        <Label htmlFor='tree-url'>URL</Label>
        <HelpPopover>
          This will be used as the URL and for SEO of your tree. You can change
          it as many times as you want.
        </HelpPopover>
      </div>
      <div className='group relative flex h-10 items-center overflow-hidden rounded-full border border-lt-light-gray/50 ring-lt-white ring-offset-2 ring-offset-lt-gray has-[:focus-visible]:ring-2'>
        <span className='flex h-full cursor-not-allowed select-none items-center border-r border-lt-light-gray px-3 text-sm text-lt-lightest-gray'>
          linktr.ee/
        </span>
        <Input
          id='tree-url'
          className='rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0'
          type='text'
          placeholder='kilimanjjjaro'
        />
        <Button
          size='icon'
          variant='outline'
          className='absolute right-1.5 size-6 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100'
        >
          <Copy className='size-3' strokeWidth={1.5} aria-hidden />
          <span className='sr-only'>Copy Order ID</span>
        </Button>
      </div>
    </section>
  )
}
