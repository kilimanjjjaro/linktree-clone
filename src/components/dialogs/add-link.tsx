'use client'

import { useState } from 'react'
import { useFormState } from 'react-dom'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import { saveNewLink } from '@/lib/actions/trees/save-new-link'
import { DIALOG } from '@/lib/constants/globals'

const DEFAULT_VALUES = {
  error: false,
  success: false
}

export default function AddLinkDialog() {
  const [state, formAction] = useFormState(saveNewLink, DEFAULT_VALUES)
  const showDialog = useStore((state) => state.showDialog)
  const setShowDialog = useStore((state) => state.setShowDialog)
  const [featuredLink, setFeaturedLink] = useState(false)

  console.log(state === null ? 'AddLinkDialog' : 'AddLinkDialog')

  return (
    <Dialog
      open={showDialog === DIALOG.ADD_LINK}
      onOpenChange={() => {
        setShowDialog(DIALOG.HIDDEN)
      }}
    >
      <DialogContent className='p-0'>
        <DialogHeader>
          <DialogTitle>Add link</DialogTitle>
        </DialogHeader>
        <main className='mt-12 flex gap-5 p-5'>
          <form action={formAction}>
            <main>
              <fieldset className='mb-5 flex flex-col gap-y-3'>
                <Label htmlFor='link-name'>Name</Label>
                <Input
                  type='text'
                  id='link-name'
                  name='name'
                  placeholder='Example link'
                  required
                  autoFocus
                />
              </fieldset>
              <fieldset className='mb-5 flex flex-col gap-y-3'>
                <Label htmlFor='link-url'>URL</Label>
                <Input
                  type='url'
                  id='link-url'
                  name='url'
                  placeholder='https://www.example.com/'
                  required
                />
              </fieldset>
              <fieldset className='mb-5 flex items-center gap-x-3'>
                <div className='flex flex-col gap-y-1.5'>
                  <Label htmlFor='featured-link'>Featured link</Label>
                  <p className='text-sm text-lt-lightest-gray'>
                    This will be displayed with a background image. We took it
                    from the link, or you can upload your own.
                  </p>
                </div>
                <Switch
                  id='featured-link'
                  name='featured-link'
                  checked={featuredLink}
                  onCheckedChange={setFeaturedLink}
                />
              </fieldset>
            </main>
            <footer>
              <Button type='submit' variant='secondary' className='w-full'>
                Save
              </Button>
            </footer>
          </form>
        </main>
      </DialogContent>
    </Dialog>
  )
}
