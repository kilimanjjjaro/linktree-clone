'use client'

import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { saveNewLink } from '@/lib/actions/trees/save-new-link'

const DEFAULT_VALUES = {
  error: false,
  success: false
}

export default function AddLink() {
  const [state, formAction] = useFormState(saveNewLink, DEFAULT_VALUES)
  const [showDialog, setShowDialog] = useState(false)
  const [featuredLink, setFeaturedLink] = useState(false)

  useEffect(() => console.log('AddLinkState', state), [state])

  return (
    <footer className='absolute bottom-12 w-full px-11'>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button className='w-full'>
            Add link <Plus className='size-3.5' />
          </Button>
        </DialogTrigger>
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
    </footer>
  )
}
