'use client'

import { useFormState } from 'react-dom'
import SubmitButton from './submit-buttom'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { logInWithEmail } from '@/lib/actions/login-with-email'

const INITIAL_STATE = {
  message: '',
  success: false,
  error: false
}

export default function LogInForm() {
  const [state, formAction] = useFormState(logInWithEmail, INITIAL_STATE)

  return (
    <form action={formAction} className='grid gap-4'>
      <fieldset className='grid gap-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          name='email'
          placeholder='m@example.com'
          required
        />
      </fieldset>
      <fieldset className='grid gap-2'>
        <Label htmlFor='username'>Username</Label>
        <Input id='username' name='username' placeholder='Robinson' required />
      </fieldset>
      <fieldset className='grid gap-2'>
        <Label htmlFor='password'>Password</Label>
        <Input id='password' name='password' type='password' />
      </fieldset>
      <fieldset className='grid gap-2'>
        <Label htmlFor='password'>Confirm Password</Label>
        <Input id='confirm-password' name='confirm-password' type='password' />
      </fieldset>
      <SubmitButton />
    </form>
  )
}
