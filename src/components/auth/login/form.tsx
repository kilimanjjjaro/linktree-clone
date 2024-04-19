'use client'

import { useFormState } from 'react-dom'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import SubmitButton from './submit-buttom'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { logInWithEmail } from '@/lib/actions/login-with-email'

const INITIAL_STATE = {
  success: false
}

export default function LogInForm() {
  const [state, formAction] = useFormState(logInWithEmail, INITIAL_STATE)
  const [parent] = useAutoAnimate({ duration: 200 })

  return (
    <form action={formAction} className='grid gap-3' ref={parent}>
      {state.success && (
        <Alert variant='success' className='text-center'>
          <AlertTitle>Magic link sent</AlertTitle>
          <AlertDescription>
            Check your email, a link was sent.
          </AlertDescription>
        </Alert>
      )}
      <Input
        id='email'
        type='email'
        name='email'
        placeholder='example@mail.com'
        autoComplete='email'
        required
        autoFocus
      />
      <SubmitButton />
    </form>
  )
}
