'use client'

import SocialProfilesSelector from '@/components/trees/settings/social-profiles/dialog/selector'
import SocialProfileSettings from '@/components/trees/settings/social-profiles/dialog/settings'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useStore } from '@/lib/store/store'
import { DIALOG } from '@/lib/constants/globals'
import { delay } from '@/lib/utils/delay'

export default function AddSocialProfilesDialog() {
  const step = useStore((state) => state.step)
  const setStep = useStore((state) => state.setStep)
  const showDialog = useStore((state) => state.showDialog)
  const setShowDialog = useStore((state) => state.setShowDialog)

  return (
    <Dialog
      open={showDialog === DIALOG.SOCIAL_PROFILES}
      onOpenChange={() => {
        setShowDialog(DIALOG.HIDDEN)
        void delay(200).then(() => {
          setStep(1)
        })
      }}
    >
      <DialogContent className='p-0'>
        <DialogHeader>
          <DialogTitle>Add social profiles</DialogTitle>
        </DialogHeader>
        {step === 1 && <SocialProfilesSelector />}
        {step === 2 && <SocialProfileSettings />}
      </DialogContent>
    </Dialog>
  )
}
