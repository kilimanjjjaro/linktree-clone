import Link from 'next/link'
import type { Metadata } from 'next'
import ResetPasswordForm from '@/components/auth/reset-password-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your Linktree Clone account password.',
  alternates: {
    canonical: '/reset-password'
  },
  openGraph: {
    title: 'Reset Password',
    description: 'Reset your Linktree Clone account password.',
    url: '/reset-password'
  }
}

export default async function ResetPasswordPage() {
  return (
    <div className='grid place-items-center gap-y-3'>
      <Card className='w-86'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-medium'>Reset password</CardTitle>
          <CardDescription>Enter your data below to continue.</CardDescription>
        </CardHeader>
        <CardContent className='grid gap-y-3'>
          <ResetPasswordForm />
        </CardContent>
      </Card>
      <Link href='/login' className='text-sm xl:hover:underline'>
        Did you remember it already?
      </Link>
    </div>
  )
}
