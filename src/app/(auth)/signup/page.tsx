import SignUpForm from '@/components/auth/signup/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function SignUpPage() {
  return (
    <main className='relative flex h-dvh min-h-dvh items-center justify-center p-3 pt-[88px]'>
      <Card className='max-w-sm'>
        <CardHeader>
          <CardTitle className='text-xl'>Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </main>
  )
}
