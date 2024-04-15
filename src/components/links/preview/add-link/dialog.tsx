import HightlightLink from './highlight-link'
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

export default function AddLink() {
  return (
    <footer className='absolute bottom-12 w-full px-11'>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='w-full'>Add link</Button>
        </DialogTrigger>
        <DialogContent className='p-0'>
          <DialogHeader>
            <DialogTitle>Add link</DialogTitle>
          </DialogHeader>
          <main className='mt-12 flex gap-5 p-5'>
            <form className='flex w-full flex-col gap-y-5'>
              <fieldset className='flex flex-col gap-y-3'>
                <Label htmlFor='individual-link-name'>Name</Label>
                <Input
                  type='text'
                  id='individual-link-name'
                  name='individual-link-name'
                  placeholder='Example link'
                  required
                  autoFocus
                />
              </fieldset>
              <fieldset className='flex flex-col gap-y-3'>
                <Label htmlFor='individual-link-url'>URL</Label>
                <Input
                  type='text'
                  id='individual-link-url'
                  name='individual-link-url'
                  placeholder='https://www.example.com/'
                  required
                />
              </fieldset>
              <HightlightLink />
              <footer className='grid grid-cols-2 gap-x-3'>
                <Button type='submit' variant='secondary' className='order-2'>
                  Add
                </Button>
                <Button variant='outline' className='order-1'>
                  Close
                </Button>
              </footer>
            </form>
          </main>
        </DialogContent>
      </Dialog>
    </footer>
  )
}
