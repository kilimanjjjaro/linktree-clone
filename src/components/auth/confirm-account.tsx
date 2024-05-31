'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useDencrypt } from 'use-dencrypt-effect'
import { cn } from '@/lib/utils'
import { geistMono } from '@/lib/utils/fonts'
import { verifyConfirmationToken } from '@/lib/actions/auth/verifyConfirmationToken'

const DICTIONARY = '0123456789qwertyuiopasdfghjklzxcvbnm!?></a`~+*=@#$%'

export default function ConfirmAccount() {
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [text, setText] = useDencrypt({ chars: DICTIONARY })
  const [parent] = useAutoAnimate({ duration: 200 })
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (token === null) {
      setError('Invalid link')
      return
    }

    verifyConfirmationToken(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError('Error')
      })
  }, [token])

  useEffect(() => {
    void setText('Validating')

    if (error.length > 0) {
      void setText(error)

      return
    }

    if (success.length > 0) {
      void setText(success)

      return
    }

    const interval = setInterval(() => {
      void setText('Validating')
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [setText, error, success])

  return (
    <div className='grid justify-items-center gap-y-3.5' ref={parent}>
      <span
        className={cn(
          'rounded-full border border-lt-light-gray/60 bg-lt-gray transition-colors pt-px font-geist-mono leading-none font-light text-base flex w-36 h-12 justify-center items-center',
          success.length > 0 &&
            'border-green-800/30 bg-green-950/50 w-auto px-4',
          error.length > 0 && 'border-red-800/30 bg-red-950/50 w-auto px-4',
          geistMono
        )}
      >
        {text}
      </span>
      {success.length > 0 && (
        <Link
          className='text-sm text-lt-lightest-gray xl:hover:underline'
          href='/login'
        >
          Log In
        </Link>
      )}
    </div>
  )
}
