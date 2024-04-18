import LogInForm from '@/components/auth/login/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function LogInPage() {
  return (
    <main className='relative flex h-dvh min-h-dvh items-center justify-center p-3 pt-[88px]'>
      <Card className='max-w-sm'>
        <CardHeader>
          <CardTitle className='text-xl'>Log In</CardTitle>
          <CardDescription>Enter your information to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <LogInForm />
        </CardContent>
      </Card>
    </main>
  )
}
