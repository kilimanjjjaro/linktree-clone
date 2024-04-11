import LinkAppearance from '@/components/links/appearance'
import LinkPreview from '@/components/links/preview'
import LinkSettings from '@/components/links/settings'

export default function Home() {
  return (
    <main className='relative flex h-dvh min-h-dvh items-start justify-between p-3 pt-[88px]'>
      <LinkAppearance />
      <LinkPreview />
      <LinkSettings />
    </main>
  )
}
