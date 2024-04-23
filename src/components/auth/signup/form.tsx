'use client'

import { useFormState } from 'react-dom'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import EmailButton from '@/components/auth/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUpWithEmail } from '@/lib/actions/auth/signup-with-email'

const INITIAL_STATE = {
  error: '',
  success: ''
}

export default function SignUpForm() {
  const [state, formAction] = useFormState(signUpWithEmail, INITIAL_STATE)
  const [parent] = useAutoAnimate({ duration: 200 })

  console.log('SignUpState', state)

  return (
    <form action={formAction} className='grid gap-y-3' ref={parent}>
      <div className='grid gap-y-2'>
        <Label htmlFor='email'>Name</Label>
        <Input
          id='name'
          type='text'
          name='name'
          placeholder='Hugo'
          autoComplete='name'
          required
          autoFocus
        />
      </div>
      <div className='grid gap-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          name='email'
          placeholder='example@mail.com'
          autoComplete='email'
          required
        />
      </div>
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
      <EmailButton text='Sign Up' />
    </form>
  )
}
