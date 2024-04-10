import { CircleHelp } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { LINK_STATUS } from '@/lib/constants/links'

export default function LinkStatus() {
  return (
    <section className='flex flex-col gap-y-3 p-5'>
      <div className='flex items-center gap-x-2'>
        <Label htmlFor='link-status'>Status</Label>
        <Popover>
          <PopoverTrigger>
            <CircleHelp className='size-3.5' strokeWidth={1.5} />
            <span className='sr-only'>Show help</span>
          </PopoverTrigger>
          <PopoverContent>
            You can have your links as drafts or simply publish them. By
            default, when you create a new one it stays as a draft.
          </PopoverContent>
        </Popover>
      </div>
      <ToggleGroup
        type='single'
        variant='outline'
        className='*:flex-1'
        defaultValue={LINK_STATUS.DRAFT}
      >
        <ToggleGroupItem value={LINK_STATUS.DRAFT}>Draft</ToggleGroupItem>
        <ToggleGroupItem value={LINK_STATUS.PUBLISHED}>
          Published
        </ToggleGroupItem>
      </ToggleGroup>
    </section>
  )
}
