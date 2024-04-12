import LinkGeneral from './general'
import LinkFont from './font'
import LinkBackground from './background'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function LinkAppearance() {
  return (
    <aside className='flex max-h-full w-[340px] flex-col overflow-hidden rounded-2xl border border-lt-light-gray/60 bg-lt-gray'>
      <h2 className='flex h-12 shrink-0 items-center justify-center px-4 text-lg leading-none'>
        Appearance
      </h2>
      <Separator />
      <ScrollArea className='h-screen' scrollHideDelay={0}>
        <LinkBackground />
        <Separator />
        <LinkFont />
        <Separator />
        <LinkGeneral />
      </ScrollArea>
    </aside>
  )
}
