'use client'

import { useFormState } from 'react-dom'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import EmailButton from '@/components/auth/submit-button'
import { Input } from '@/components/ui/input'
import { logInWithEmail } from '@/lib/actions/auth/login-with-email'
import { Label } from '@/components/ui/label'

const INITIAL_STATE = {
  success: false,
  error: false
}

export default function LogInForm() {
  const [state, formAction] = useFormState(logInWithEmail, INITIAL_STATE)
  const [parent] = useAutoAnimate({ duration: 200 })

  return (
    <form action={formAction} className='grid gap-y-3' ref={parent}>
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
      <div className='grid gap-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          type='password'
          name='password'
          placeholder='••••••••••••'
          autoComplete='current-password'
          required
        />
      </div>
      <EmailButton text='Log In' />
    </form>
  )
}
