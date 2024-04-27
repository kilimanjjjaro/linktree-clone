import { CircleHelp } from 'lucide-react'
import SocialProfilesList from './list'
import SocialProfilesDialog from './dialog'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export default function TreeSocialProfiles() {
  return (
    <section className='flex flex-col gap-y-3 p-5'>
      <div className='flex items-center gap-x-2'>
        <Label htmlFor='tree-social-profiles'>Social profiles & more</Label>
        <Popover>
          <PopoverTrigger>
            <CircleHelp className='size-3.5' aria-hidden />
            <span className='sr-only'>Show help</span>
          </PopoverTrigger>
          <PopoverContent>
            Add icons linking to your social profiles, email and more.
          </PopoverContent>
        </Popover>
      </div>
      <SocialProfilesList />
      <SocialProfilesDialog />
    </section>
  )
}
