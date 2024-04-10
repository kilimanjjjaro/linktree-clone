'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import SocialMediaSelector from './selector'
import SocialMediaOptions from './options'
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

export default function SocialMediaDialog() {
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
        <Button>
          Add
          <Plus className='size-3.5' />
        </Button>
      </DialogTrigger>
      <DialogContent className='p-0 outline-none'>
        <DialogHeader>
          <DialogTitle>Add social media</DialogTitle>
        </DialogHeader>
        {step === 1 && <SocialMediaSelector />}
        {step === 2 && <SocialMediaOptions setShowDialog={setShowDialog} />}
      </DialogContent>
    </Dialog>
  )
}
