'use client'

import { useFormStatus } from 'react-dom'
import { LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' className={cn('w-full', pending)} disabled={pending}>
      {pending ? (
        <>
          <LoaderCircle className='mr-2 size-4 animate-spin' />
          Loading
        </>
      ) : (
        'Create account'
      )}
    </Button>
  )
}
