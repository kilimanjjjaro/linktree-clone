import LinkAppearance from '@/components/links/appearance'
import LinkPreview from '@/components/links/preview'
import LinkSettings from '@/components/links/settings'

export default async function Home() {
  return (
    <main className='relative grid h-dvh min-h-dvh grid-cols-[auto_1fr_auto] items-start justify-center p-3 pt-[88px]'>
      <LinkAppearance />
      <LinkPreview />
      <LinkSettings />
    </main>
  )
}
