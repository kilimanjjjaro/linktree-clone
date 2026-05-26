import Link from "next/link"
import type { Metadata } from "next"
import LogInForm from "@/components/auth/login-form"
import GoogleButton from "@/components/auth/google-button"
import GitHubButton from "@/components/auth/github-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your Linktree Clone account.",
  alternates: {
    canonical: "/login"
  },
  openGraph: {
    title: "Log In",
    description: "Log in to your Linktree Clone account.",
    url: "/login"
  }
}

export default async function LogInPage() {
  return (
    <div className="grid place-items-center gap-y-3">
      <Card className="w-86">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-medium">Welcome back</CardTitle>
          <CardDescription>Enter your data below to continue.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-3">
          <LogInForm />
          <div className="flex items-center gap-x-2">
            <div className="bg-lt-light-gray/60 h-px flex-1" />
            <h3 className="shrink-0 text-xs uppercase">Or continue with</h3>
            <div className="bg-lt-light-gray/60 h-px flex-1" />
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <GoogleButton />
            <GitHubButton />
          </div>
        </CardContent>
      </Card>
      <Link href="/signup" className="text-sm xl:hover:underline">
        Don&apos;t have an account yet?
      </Link>
    </div>
  )
}
