import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import ConfirmAccount from '@/components/auth/confirm-account'
import { Suspense } from 'react'

export default async function ConfirmAccountPage() {
  return (
    <Card className='w-full max-w-87.5 border-none bg-transparent'>
      <CardHeader className='text-center'>
        <CardTitle className='text-2xl font-medium'>
          We&apos;re almost done!
        </CardTitle>
        <CardDescription>
          Validating your data, this will be fast as fuck.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={null}>
          <ConfirmAccount />
        </Suspense>
      </CardContent>
    </Card>
  )
}
