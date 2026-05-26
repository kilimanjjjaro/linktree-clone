import { Suspense } from "react"
import type { Metadata } from "next"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import ConfirmAccount from "@/components/auth/confirm-account"

export const metadata: Metadata = {
  title: "Confirm Account",
  description: "Confirm your Linktree Clone account.",
  alternates: {
    canonical: "/confirm-account"
  },
  openGraph: {
    title: "Confirm Account",
    description: "Confirm your Linktree Clone account.",
    url: "/confirm-account"
  }
}

export default async function ConfirmAccountPage() {
  return (
    <Card className="w-86 border-none bg-transparent">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-medium">
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
