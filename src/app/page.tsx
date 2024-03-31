import LinkConfig from '@/components/link-config/link-config'
import LinkPreview from '@/components/link-preview/link-preview'

export default function Home() {
  return (
    <main className='h-dvh min-h-dvh'>
      <div className='relative flex h-full items-center justify-between px-4 pb-4 pt-[98px]'>
        <LinkPreview />
        <LinkConfig />
      </div>
    </main>
  )
}
