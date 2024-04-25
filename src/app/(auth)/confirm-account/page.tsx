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
    <Card className='w-[350px] border-none bg-transparent'>
      <CardHeader className='text-center'>
        <CardTitle className='text-2xl font-medium'>
          We&apos;re almost done!
        </CardTitle>
        <CardDescription>
          Validating your data, this will be fast as fuck.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <Suspense fallback={null}>
          <ConfirmAccount />
        </Suspense>
      </CardContent>
    </Card>
  )
}
