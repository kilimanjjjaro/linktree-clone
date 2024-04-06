import LinkSettings from '@/components/links/settings'
import LinkPreview from '@/components/links/preview'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'

export default function Home() {
  return (
    <ResizablePanelGroup
      direction='horizontal'
      tagName='main'
      className='min-h-dvh pl-14 pt-14'
      style={{ height: '100dvh' }}
    >
      <ResizablePanel
        tagName='section'
        className='bg-lt-gray'
        defaultSize={20}
        minSize={20}
      >
        <LinkSettings />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        tagName='section'
        className='grid w-full place-content-center'
        defaultSize={80}
        minSize={25}
      >
        <LinkPreview />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
