'use client'

import { useFormState } from 'react-dom'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import EmailButton from './email-button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
      {state.success && (
        <Alert variant='success' className='text-center'>
          <AlertTitle>Magic link sent!</AlertTitle>
          <AlertDescription>
            Check your email, a link was sent.
          </AlertDescription>
        </Alert>
      )}
      {state.error && (
        <Alert variant='error' className='text-center'>
          <AlertTitle>Houston, we have a problem!</AlertTitle>
          <AlertDescription>
            Please try again later, or{' '}
            <a
              className='underline xl:hover:no-underline'
              href='https://github.com/kilimanjjjaro'
              target='_blank'
              rel='noopener noreferrer'
            >
              contact me
            </a>
            .
          </AlertDescription>
        </Alert>
      )}
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
          placeholder='example@mail.com'
          autoComplete='current-password'
          required
        />
      </div>
      <EmailButton />
    </form>
  )
}
