import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function TreeNotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold sm:text-4xl">Tree not found</h1>
      <p className="max-w-md text-balance text-zinc-400">
        The tree you are looking for doesn&apos;t exist or isn&apos;t published
        yet.
      </p>
      <Button asChild className="mt-2">
        <Link href="/">Go home</Link>
      </Button>
    </main>
  )
}
