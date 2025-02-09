'use client'

import { useActionState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import EmailButton from '@/components/auth/submit-button'
import Feedback from '@/components/auth/feedback'
import { Input } from '@/components/ui/input'
import { logInWithEmail } from '@/lib/actions/auth/login-with-email'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

const INITIAL_STATE = {
  success: '',
  error: ''
}

export default function LogInForm() {
  const [state, formAction] = useActionState(logInWithEmail, INITIAL_STATE)
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
        <Link
          href='/reset-password'
          className='text-lt-lightest-gray text-sm leading-none xl:hover:underline'
        >
          Forgot your password?
        </Link>
      </div>
      <EmailButton text='Log In' />
    </form>
  )
}
