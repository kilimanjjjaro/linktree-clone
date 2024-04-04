'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import SocialMediaSelector from './selector'
import SocialMediaOptions from './options'
import { buttonVariants } from '@/components/ui/button'
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
      <DialogTrigger
        id='link-social-media'
        className={`w-full cursor-pointer gap-x-1 ${buttonVariants({ variant: 'outline' })}`}
      >
        <Plus className='size-4' strokeWidth={1.5} />
        Add
      </DialogTrigger>
      <DialogContent className='p-0 outline-none'>
        <DialogHeader>
          <DialogTitle>Add social media</DialogTitle>
        </DialogHeader>
        <main className='mt-12 p-5'>
          {step === 1 && <SocialMediaSelector />}
          {step === 2 && <SocialMediaOptions setShowDialog={setShowDialog} />}
        </main>
      </DialogContent>
    </Dialog>
  )
}
