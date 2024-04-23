import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import LogInForm from '@/components/auth/login/form'
import GoogleButton from '@/components/auth/google-button'
import GitHubButton from '@/components/auth/github-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default async function LogInPage() {
  return (
    <main className='grid h-dvh min-h-dvh grid-cols-2'>
      <section className='border-r border-lt-light-gray/60 bg-lt-gray' />
      <section className='relative flex items-center justify-center'>
        <Link
          className='absolute right-6 top-6 flex items-center gap-x-2 text-sm xl:hover:underline'
          href='/'
        >
          <ArrowLeft className='size-3' />
          Back
        </Link>
        <div className='grid place-items-center gap-y-3'>
          <Card className='w-[350px]'>
            <CardHeader className='text-center'>
              <CardTitle className='text-2xl font-medium'>
                Welcome back
              </CardTitle>
              <CardDescription>
                Enter your data below to continue.
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-y-3'>
              <LogInForm />
              <div className='flex items-center gap-x-2'>
                <div className='h-px flex-1 bg-lt-light-gray/60' />
                <h3 className='shrink-0 text-xs uppercase'>Or continue with</h3>
                <div className='h-px flex-1 bg-lt-light-gray/60' />
              </div>
              <div className='grid grid-cols-2 gap-x-2'>
                <GoogleButton />
                <GitHubButton />
              </div>
            </CardContent>
          </Card>
          <Link href='/signup' className='text-sm xl:hover:underline'>
            Don&apos;t have an account yet?
          </Link>
        </div>
      </section>
    </main>
  )
}
