export default function TreeNotFound() {
  return (
    <main className='flex min-h-dvh flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl font-semibold'>Tree not found</h1>
      <p className='text-zinc-400'>
        The tree you are looking for doesn&apos;t exist or isn&apos;t published
        yet.
      </p>
    </main>
  )
}
