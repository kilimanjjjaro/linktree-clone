'use client'

import { useState, useTransition } from 'react'
import { LoaderCircle, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import useLinks from '@/lib/hooks/useLinks'

export default function AddLink() {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const { addLink } = useLinks()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    startTransition(async () => {
      const formData = new FormData(event.currentTarget)

      const newLink = {
        name: formData.get('name') as string,
        url: formData.get('url') as string,
        featured: formData.get('featured') !== null ?? false
      }

      const response = await addLink(newLink)

      if (response !== null) {
        setOpen(false)
      }
    })
  }

  return (
    <footer className='absolute inset-x-5 bottom-8'>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className='w-full'>
            Add link <Plus className='size-3.5' aria-hidden />
          </Button>
        </DialogTrigger>
        <DialogContent className='p-0'>
          <DialogHeader>
            <DialogTitle>Add link</DialogTitle>
          </DialogHeader>
          <main className='mt-12 flex gap-5 p-5'>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-y-5'>
              <div className='flex flex-col gap-y-3'>
                <Label htmlFor='link-name'>Name</Label>
                <Input
                  type='text'
                  id='link-name'
                  name='name'
                  placeholder='Example link'
                  required
                  autoFocus
                />
              </div>
              <div className='flex flex-col gap-y-3'>
                <Label htmlFor='link-url'>URL</Label>
                <Input
                  type='url'
                  id='link-url'
                  name='url'
                  placeholder='https://www.example.com/'
                  required
                />
              </div>
              <div className='flex items-center gap-x-3 rounded-2xl border border-lt-light-gray/60 p-5'>
                <div className='flex flex-col gap-y-1.5'>
                  <Label htmlFor='featured-link'>Featured link</Label>
                  <p className='text-balance text-sm text-lt-lightest-gray'>
                    This will be displayed with a background image. We took it
                    from the link. Soon you will able to upload one.
                  </p>
                </div>
                <Switch id='featured-link' name='featured' />
              </div>
              <Button
                type='submit'
                variant='secondary'
                className='w-full'
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    Adding
                    <LoaderCircle className='size-4 animate-spin' aria-hidden />
                  </>
                ) : (
                  <>
                    Add
                    <Plus className='size-4' aria-hidden />
                  </>
                )}
              </Button>
            </form>
          </main>
        </DialogContent>
      </Dialog>
    </footer>
  )
}
