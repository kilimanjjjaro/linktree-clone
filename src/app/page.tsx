import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import LinkAppearance from '@/components/links/appearance'
import LinkPreview from '@/components/links/preview'
import LinkSettings from '@/components/links/settings'

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className='relative grid h-dvh min-h-dvh grid-cols-[auto_1fr_auto] items-start justify-center p-3 pt-[88px]'>
        <LinkAppearance />
        <LinkPreview />
        <LinkSettings />
      </main>
      <Footer />
    </>
  )
}
