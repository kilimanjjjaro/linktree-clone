'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

export const PENDING_DELETED_ACCOUNT_TOAST_KEY =
  '__PENDING_DELETED_ACCOUNT_TOAST__'

export default function DeletedAccountToast() {
  useEffect(() => {
    if (sessionStorage.getItem(PENDING_DELETED_ACCOUNT_TOAST_KEY) !== '1') {
      return
    }

    sessionStorage.removeItem(PENDING_DELETED_ACCOUNT_TOAST_KEY)
    toast.success('Account deleted.')
  }, [])

  return null
}
