import { CircleHelp } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export default function LinkDescription() {
  return (
    <div className='flex flex-col gap-3 p-5'>
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
      <Textarea
        id='link-description'
        className='p-3'
        placeholder="I'm a Full Stack Developer and these are my projects."
      />
    </div>
  )
}
