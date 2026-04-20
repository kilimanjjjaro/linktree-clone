'use client'

import { useActionState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import EmailButton from '@/components/auth/submit-button'
import Feedback from '@/components/auth/feedback'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSearchParams } from 'next/navigation'
import { newPassword } from '@/lib/actions/auth/new-password'

export default function NewPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [state, formAction] = useActionState(newPassword, {
    error: '',
    success: '',
    token: token ?? ''
  })
  const [parent] = useAutoAnimate({ duration: 200 })

  return (
    <form action={formAction} className='grid gap-y-3' ref={parent}>
      <Feedback data={state} />
      <div className='grid gap-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          type='password'
          name='password'
          placeholder='••••••••••••'
          autoComplete='new-password'
          required
        />
      </div>
      <div className='grid gap-y-2'>
        <Label htmlFor='password'>Confirm Password</Label>
        <Input
          id='confirm-password'
          type='password'
          name='confirm-password'
          placeholder='••••••••••••'
          autoComplete='new-password'
          required
        />
      </div>
      <EmailButton text='Reset Password' />
    </form>
  )
}
