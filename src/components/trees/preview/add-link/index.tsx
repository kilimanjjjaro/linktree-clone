'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Plus, ShieldAlert } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createLink } from '@/lib/actions/trees/create-link'
import { getOgImage } from '@/lib/utils/get-og-image'
import { AddLinkSchema } from '@/lib/schemas/tree'
import { useStore } from '@/lib/store/store'

interface Props {
  treeId: string | undefined
  isLogged: boolean
}

export default function AddLink({ treeId, isLogged }: Props) {
  const selectedTree = useStore((state) => state.selectedTree)
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (treeId === undefined) return

    // CHECK IF ARE NOT A DEMO TREE

    const formData = new FormData(event.currentTarget)

    const validatedFields = AddLinkSchema.safeParse({
      treeId,
      name: formData.get('name'),
      url: formData.get('url'),
      featured: formData.get('featured'),
      image: formData.get('image')
    })

    if (!validatedFields.success) {
      setError('Invalid fields.')
      return
    } else {
      setError('')
    }

    const data = validatedFields.data
    let backgroundImage = ''

    if (data.featured) {
      if (data.image === null) backgroundImage = await getOgImage(data.url)
      if (data.image !== null) backgroundImage = data.image
    }

    if (isLogged) {
      const response = await createLink({
        treeId,
        name: validatedFields.data.name,
        url: validatedFields.data.url,
        featured: validatedFields.data.featured,
        image: backgroundImage
      })

      if (response.success.length > 0) toast.success(response.success)
      if (response.error.length > 0) toast.error(response.error)
    }
  }

  return (
    <footer className='absolute inset-x-5 bottom-8'>
      <Dialog>
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
              {error.length > 0 && (
                <Alert variant='error'>
                  <ShieldAlert aria-hidden />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
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
                    from the link, or you can upload your own.
                  </p>
                </div>
                <Switch id='featured-link' name='featured' />
              </div>
              <Button type='submit' variant='secondary' className='w-full'>
                Save
              </Button>
            </form>
          </main>
        </DialogContent>
      </Dialog>
    </footer>
  )
}
