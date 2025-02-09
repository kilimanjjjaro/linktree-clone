'use client'

import { useFormState } from 'react-dom'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import EmailButton from '@/components/auth/submit-button'
import Feedback from '@/components/auth/feedback'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resetPassword } from '@/lib/actions/auth/reset-password'

const INITIAL_STATE = {
  success: '',
  error: ''
}

export default function ResetPasswordForm() {
  const [state, formAction] = useFormState(resetPassword, INITIAL_STATE)
  const [parent] = useAutoAnimate({ duration: 200 })

  return (
    <form action={formAction} className='grid gap-y-3' ref={parent}>
      <Feedback data={state} />
      <div className='grid gap-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          name='email'
          placeholder='example@mail.com'
          autoComplete='email'
          required
          autoFocus
        />
      </div>
      <EmailButton text='Submit' />
    </form>
  )
}
