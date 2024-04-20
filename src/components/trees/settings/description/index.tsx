import { CircleHelp } from 'lucide-react'
import DescriptionInput from './input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export default function TreeDescription() {
  return (
    <section className='flex flex-col gap-y-3 p-5'>
      <div className='flex items-center gap-x-2'>
        <Label htmlFor='tree-description'>Description</Label>
        <Popover>
          <PopoverTrigger>
            <CircleHelp className='size-3.5' />
            <span className='sr-only'>Show help</span>
          </PopoverTrigger>
          <PopoverContent>
            Short description for your tree. This will be used in the header and
            to improve the SEO of your tree.
          </PopoverContent>
        </Popover>
      </div>
      <DescriptionInput />
    </section>
  )
}
