'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LoaderCircle, UserX } from 'lucide-react'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { deleteAccount } from '@/lib/actions/auth/delete-account'

export default function DeleteAccountButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const onConfirm = () => {
    startTransition(async () => {
      const { error } = await deleteAccount()

      if (error.length > 0) {
        toast.error(error)
        return
      }

      toast.success('Account deleted.')
      router.replace('/')
      router.refresh()
    })
  }

  const deleteButtonText = isPending ? 'Deleting' : 'Delete'

  return (
    <>
      <DropdownMenuItem
        onSelect={(event) => {
          event.preventDefault()
          setOpen(true)
        }}
      >
        <UserX className='mr-2 size-4' aria-hidden />
        <span>Delete account</span>
      </DropdownMenuItem>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-sm p-0'>
          <DialogHeader>
            <DialogTitle>Delete account</DialogTitle>
          </DialogHeader>
          <main className='mt-12 grid gap-y-5 p-5'>
            <p className='text-lt-lightest-gray text-center'>
              This will permanently delete your account, all your trees and
              uploaded images. This action cannot be undone.
            </p>
            <div className='grid grid-cols-2 gap-x-3'>
              <Button
                variant='secondary'
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                variant='destructive'
                onClick={onConfirm}
                disabled={isPending}
              >
                {isPending && (
                  <LoaderCircle className='size-4 animate-spin' aria-hidden />
                )}
                {deleteButtonText}
              </Button>
            </div>
          </main>
        </DialogContent>
      </Dialog>
    </>
  )
}
