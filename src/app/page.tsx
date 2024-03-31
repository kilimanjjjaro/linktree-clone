import LinkSettings from '@/components/links/settings/link-settings'
import LinkPreview from '@/components/links/preview/link-preview'

export default function Home() {
  return (
    <main className='h-dvh min-h-dvh'>
      <div className='relative flex h-full items-center justify-between px-4 pb-4 pt-[98px]'>
        <LinkPreview />
        <LinkSettings />
      </div>
    </main>
  )
}
