import Link from 'next/link'
import { Unlock } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export default function LogInButton() {
  return (
    <Link
      className={`h-full ${buttonVariants({ variant: 'default' })}`}
      href='/login'
    >
      Log in
      <Unlock className='size-3.5' aria-hidden />
    </Link>
  )
}
