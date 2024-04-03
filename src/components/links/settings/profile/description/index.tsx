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
    <section className='flex flex-col gap-3 p-5'>
      <div className='flex items-center gap-2'>
        <Label htmlFor='link-description'>Description</Label>
        <Popover>
          <PopoverTrigger>
            <CircleHelp className='size-3.5' />
          </PopoverTrigger>
          <PopoverContent>
            <p className='text-sm text-muted-foreground'>
              Short description for your link. This will be used in the header
              and to improve the SEO of your link.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <DescriptionInput />
    </section>
  )
}
