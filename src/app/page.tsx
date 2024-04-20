import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import LinkAppearance from '@/components/trees/appearance'
import LinkPreview from '@/components/trees/preview'
import TreeSettings from '@/components/trees/settings'

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className='relative grid h-dvh min-h-dvh grid-cols-[auto_1fr_auto] items-start justify-center p-3 pt-[88px]'>
        <LinkAppearance />
        <LinkPreview />
        <TreeSettings />
      </main>
      <Footer />
    </>
  )
}
