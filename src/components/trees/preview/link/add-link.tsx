'use client'

import { useTransition } from 'react'
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
import { useStore } from '@/lib/store/store'
import useLinks from '@/lib/hooks/useLinks'

export default function AddLink() {
  const selectedTree = useStore((state) => state.selectedTree)
  const selectedLink = useStore((state) => state.selectedLink)
  const setSelectedLink = useStore((state) => state.setSelectedLink)
  const showAddLinkDialog = useStore((state) => state.showAddLinkDialog)
  const setShowAddLinkDialog = useStore((state) => state.setShowAddLinkDialog)
  const [isPending, startTransition] = useTransition()
  const { addLink } = useLinks()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (selectedTree === null) return
    event.preventDefault()

    startTransition(async () => {
      const formData = new FormData(event.currentTarget)

      const newLink = {
        treeId: selectedTree.id,
        name: formData.get('name') as string,
        url: formData.get('url') as string,
        featured: formData.get('featured') !== null
      }

      const response = await addLink(newLink)

      if (response !== null) {
        setShowAddLinkDialog(false)
        setSelectedLink(null)
      }
    })
  }

  return (
    <footer className='absolute inset-x-[16.5px] bottom-10 z-10 px-4'>
      <Dialog
        open={showAddLinkDialog}
        onOpenChange={(value) => {
          setShowAddLinkDialog(value)
          setSelectedLink(null)
        }}
      >
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
                  defaultValue={selectedLink?.name}
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
                  defaultValue={selectedLink?.url}
                  placeholder='https://www.example.com/'
                  required
                />
              </div>
              <div className='border-lt-light-gray/60 flex items-center gap-x-3 rounded-2xl border p-5'>
                <div className='flex flex-col gap-y-1.5'>
                  <Label htmlFor='featured-link'>Featured link</Label>
                  <p className='text-lt-lightest-gray text-sm text-balance'>
                    This will be displayed with a background image. We took it
                    from the link. Soon you will able to upload one.
                  </p>
                </div>
                <Switch
                  id='featured-link'
                  name='featured'
                  defaultChecked={selectedLink?.featured}
                />
              </div>
              <Button
                type='submit'
                variant='secondary'
                className='w-full'
                disabled={isPending}
              >
                {selectedLink !== null ? (
                  <>
                    {isPending ? (
                      <>
                        Updating
                        <LoaderCircle
                          className='size-4 animate-spin'
                          aria-hidden
                        />
                      </>
                    ) : (
                      'Update'
                    )}
                  </>
                ) : (
                  <>
                    {isPending ? (
                      <>
                        Adding
                        <LoaderCircle
                          className='size-4 animate-spin'
                          aria-hidden
                        />
                      </>
                    ) : (
                      'Add'
                    )}
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
