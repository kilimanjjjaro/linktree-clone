'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import SocialProfilesSelector from './selector'
import SocialProfileSettings from './settings'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useStore } from '@/lib/store/store'
import { delay } from '@/lib/utils/delay'

export default function SocialProfilesDialog() {
  const step = useStore((state) => state.step)
  const setStep = useStore((state) => state.setStep)
  const [showDialog, setShowDialog] = useState(false)

  return (
    <Dialog
      open={showDialog}
      onOpenChange={(showDialog) => {
        setShowDialog(showDialog)
        void delay(200).then(() => {
          setStep(1)
        })
      }}
    >
      <DialogTrigger asChild>
        <Button id='tree-social-profiles' variant='secondary'>
          Add
          <Plus className='size-3.5' />
        </Button>
      </DialogTrigger>
      <DialogContent className='p-0'>
        <DialogHeader>
          <DialogTitle>Add social profiles</DialogTitle>
        </DialogHeader>
        {step === 1 && <SocialProfilesSelector />}
        {step === 2 && <SocialProfileSettings setShowDialog={setShowDialog} />}
      </DialogContent>
    </Dialog>
  )
}
