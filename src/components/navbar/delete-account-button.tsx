'use client'

import { useState, useTransition } from 'react'
import { signOut } from 'next-auth/react'
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
import { PENDING_DELETED_ACCOUNT_TOAST_KEY } from '@/components/auth/deleted-account-toast'
import { deleteAccount } from '@/lib/actions/auth/delete-account'
import { useStore } from '@/lib/store/store-provider'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'

export default function DeleteAccountButton() {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const onConfirm = () => {
    startTransition(async () => {
      const { error } = await deleteAccount()

      if (error.length > 0) {
        toast.error(error)
        return
      }

      setSelectedTree(DEMO_TREE_VALUES)
      sessionStorage.setItem(PENDING_DELETED_ACCOUNT_TOAST_KEY, '1')
      await signOut({ redirectTo: '/' })
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
