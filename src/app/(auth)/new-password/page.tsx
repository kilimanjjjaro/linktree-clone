import { Suspense } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import NewPasswordForm from '@/components/auth/new-password-form'
import Link from 'next/link'

export default async function NewPasswordPage() {
  return (
    <div className='grid place-items-center gap-y-3'>
      <Card className='w-[350px]'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-medium'>
            We&apos;re almost done!
          </CardTitle>
          <CardDescription>
            Enter your new password to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={null}>
            <NewPasswordForm />
          </Suspense>
        </CardContent>
      </Card>
      <Link href='/login' className='text-sm xl:hover:underline'>
        Log In
      </Link>
    </div>
  )
}
