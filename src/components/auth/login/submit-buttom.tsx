'use client'

import { useFormStatus } from 'react-dom'
import { LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' className='w-full' disabled={pending}>
      {pending ? (
        <>
          <LoaderCircle className='size-4 animate-spin' />
          Sending
        </>
      ) : (
        'Submit'
      )}
    </Button>
  )
}
