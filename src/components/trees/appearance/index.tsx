import TreeGeneral from '@/components/trees/appearance/general'
import TreeFont from '@/components/trees/appearance/font'
import TreeBackground from '@/components/trees/appearance/background'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

export default function TreeAppearance({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        'border-lt-light-gray/60 bg-lt-gray relative flex max-h-[calc(100dvh-100px)] w-85 flex-col overflow-hidden rounded-2xl border',
        className
      )}
    >
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
