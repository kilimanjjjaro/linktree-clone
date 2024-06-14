import TreeGeneral from './general'
import TreeFont from './font'
import TreeBackground from './background'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function TreeAppearance () {
  return (
    <aside className='relative flex max-h-[calc(100dvh-100px)] w-[340px] flex-col overflow-hidden rounded-2xl border border-lt-light-gray/60 bg-lt-gray'>
      <h2 className='sticky top-0 flex h-12 shrink-0 items-center justify-center px-4 text-lg leading-none'>
        Appearance
      </h2>
      <Separator />
      <ScrollArea className='h-screen' scrollHideDelay={0}>
        <TreeBackground />
        <Separator />
        <TreeFont />
        <Separator />
        <TreeGeneral />
      </ScrollArea>
    </aside>
  )
}
