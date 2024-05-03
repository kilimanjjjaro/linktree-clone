'use client'

import { Plus } from 'lucide-react'

import SocialProfilesList from '@/components/trees/settings/social-profiles/list'
import { Label } from '@/components/ui/label'
import { HelpPopover } from '@/components/ui/help-popover'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import { DIALOG } from '@/lib/constants/globals'

export default function TreeSocialProfiles() {
  const setShowDialog = useStore((state) => state.setShowDialog)

  return (
    <section className='flex flex-col gap-y-3 p-5'>
      <div className='flex items-center gap-x-2'>
        <Label htmlFor='tree-social-profiles'>Social profiles & more</Label>
        <HelpPopover>
          Add icons linking to your social profiles, email and more.
        </HelpPopover>
      </div>
      <SocialProfilesList />
      <Button
        id='tree-social-profiles'
        variant='secondary'
        onClick={() => {
          setShowDialog(DIALOG.SOCIAL_PROFILES)
        }}
      >
        Add
        <Plus className='size-3.5' aria-hidden />
      </Button>
    </section>
  )
}
