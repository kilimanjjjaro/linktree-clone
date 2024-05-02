import SocialProfilesList from '@/components/trees/settings/social-profiles/list'
import SocialProfilesDialog from '@/components/trees/settings/social-profiles/dialog'
import { Label } from '@/components/ui/label'
import { HelpPopover } from '@/components/ui/help-popover'

export default function TreeSocialProfiles() {
  return (
    <section className='flex flex-col gap-y-3 p-5'>
      <div className='flex items-center gap-x-2'>
        <Label htmlFor='tree-social-profiles'>Social profiles & more</Label>
        <HelpPopover>
          Add icons linking to your social profiles, email and more.
        </HelpPopover>
      </div>
      <SocialProfilesList />
      <SocialProfilesDialog />
    </section>
  )
}
