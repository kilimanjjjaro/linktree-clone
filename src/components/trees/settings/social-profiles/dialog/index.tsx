import { Plus } from 'lucide-react'

import SocialProfilesSelector from '@/components/trees/settings/social-profiles/dialog/selector'
import SocialProfileSettings from '@/components/trees/settings/social-profiles/dialog/settings'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useStore } from '@/lib/store/store-provider'
import { delay } from '@/lib/utils/delay'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function SocialProfilesDialog({ open, setOpen }: Props) {
  const step = useStore((state) => state.step)
  const setStep = useStore((state) => state.setStep)

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value)
        void delay(200).then(() => {
          setStep(1)
        })
      }}
    >
      <DialogTrigger asChild>
        <Button id='tree-social-profiles'>
          Add <Plus className='size-3.5' aria-hidden />
        </Button>
      </DialogTrigger>
      <DialogContent className='p-0'>
        <DialogHeader>
          <DialogTitle>Add social profiles</DialogTitle>
        </DialogHeader>
        {step === 1 && <SocialProfilesSelector />}
        {step === 2 && (
          <SocialProfileSettings
            closeDialog={() => {
              setOpen(false)
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
