import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import LogInForm from '@/components/auth/login/form'
import GoogleButton from '@/components/auth/login/google-button'
import { GitHubIcon } from '@/components/icons/github-icon'
import { InstagramIcon } from '@/components/icons/instagram-icon'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/auth/auth'

export default async function LogInPage() {
  const session = await auth()

  if (session !== null) redirect('/')

  return (
    <main className='grid h-dvh min-h-dvh grid-cols-2'>
      <section className='border-r border-lt-light-gray/60 bg-lt-gray' />
      <section className='relative flex items-center justify-center'>
        <Link
          className='absolute right-6 top-6 flex h-auto items-center gap-x-2 p-0 text-sm xl:hover:underline'
          href='/'
        >
          <ArrowLeft className='size-3' />
          Back
        </Link>
        <Card className='w-[350px]'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl font-medium'>
              Log in to Linktree
            </CardTitle>
            <label className='text-lt-lightest-gray' htmlFor='email'>
              Enter your email below to continue.
            </label>
          </CardHeader>
          <CardContent className='flex flex-col'>
            <LogInForm />
            <div className='my-4 flex items-center gap-2'>
              <div className='h-px w-full bg-lt-light-gray/60' />
              <h3 className='shrink-0 text-xs uppercase'>Or continue with</h3>
              <div className='h-px w-full bg-lt-light-gray/60' />
            </div>
            <GoogleButton />
            <Button className='mb-3' variant='secondary'>
              <GitHubIcon className='size-5' aria-hidden />
              GitHub
            </Button>
            <Button variant='secondary'>
              <InstagramIcon className='size-5' aria-hidden />
              Instagram
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
