import { CircleHelp } from 'lucide-react'
import DescriptionInput from './input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export default function LinkDescription() {
  return (
    <section className='flex flex-col gap-y-3 border-b border-lt-light-gray p-5'>
      <div className='flex items-center gap-x-2'>
        <Label htmlFor='link-description'>Description</Label>
        <Popover>
          <PopoverTrigger>
            <CircleHelp className='size-3.5' />
          </PopoverTrigger>
          <PopoverContent>
            Short description for your link. This will be used in the header and
            to improve the SEO of your link.
          </PopoverContent>
        </Popover>
      </div>
      <DescriptionInput />
    </section>
  )
}
