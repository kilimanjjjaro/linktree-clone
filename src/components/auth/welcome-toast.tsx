"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import useCurrentUser from "@/lib/hooks/useCurrentUser"

export const PENDING_WELCOME_TOAST_KEY = "__PENDING_WELCOME_TOAST__"

export default function WelcomeToast() {
  const user = useCurrentUser()

  useEffect(() => {
    if (user === null) return
    if (sessionStorage.getItem(PENDING_WELCOME_TOAST_KEY) !== "1") return

    sessionStorage.removeItem(PENDING_WELCOME_TOAST_KEY)

    const name = user.name?.split(" ")[0]
    toast.success(name != null ? `Welcome, ${name}!` : "Welcome!")
  }, [user])

  return null
}
