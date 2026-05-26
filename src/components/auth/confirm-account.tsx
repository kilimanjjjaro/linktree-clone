"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useDencrypt } from "use-dencrypt-effect"

import { verifyConfirmationToken } from "@/lib/actions/auth/verifyConfirmationToken"
import { geistMono } from "@/lib/utils/fonts"
import { cn } from "@/lib/utils/cn"

const DICTIONARY = "0123456789qwertyuiopasdfghjklzxcvbnm!?></a`~+*=@#$%"

export default function ConfirmAccount() {
  const [success, setSuccess] = useState("")
  const [verificationError, setVerificationError] = useState("")
  const [text, setText] = useDencrypt({ chars: DICTIONARY })
  const [parent] = useAutoAnimate({ duration: 200 })
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const error = token === null ? "Invalid link" : verificationError

  useEffect(() => {
    if (token === null) return

    verifyConfirmationToken(token)
      .then((data) => {
        setSuccess(data.success)
        setVerificationError(data.error)
      })
      .catch(() => {
        setVerificationError("Error")
      })
  }, [token])

  useEffect(() => {
    void setText("Validating")

    if (error.length > 0) {
      void setText(error)

      return
    }

    if (success.length > 0) {
      void setText(success)

      return
    }

    const interval = setInterval(() => {
      void setText("Validating")
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [setText, error, success])

  return (
    <div className="grid justify-items-center gap-y-3.5" ref={parent}>
      <span
        className={cn(
          "border-lt-light-gray/60 bg-lt-gray font-geist-mono flex h-12 w-36 items-center justify-center rounded-full border pt-px text-base leading-none font-light transition-colors",
          success.length > 0 &&
            "w-auto border-green-800/30 bg-green-950/50 px-4",
          error.length > 0 && "w-auto border-red-800/30 bg-red-950/50 px-4",
          geistMono
        )}
      >
        {text}
      </span>
      {success.length > 0 && (
        <Link
          className="text-lt-lightest-gray text-sm xl:hover:underline"
          href="/login"
        >
          Log In
        </Link>
      )}
    </div>
  )
}
