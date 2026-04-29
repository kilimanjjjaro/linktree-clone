import TreeBackground from '@/components/trees/appearance/background'
import TreeFont from '@/components/trees/appearance/font'
import TreeGeneral from '@/components/trees/appearance/general'
import TreeAvatar from '@/components/trees/settings/avatar'
import TreeName from '@/components/trees/settings/name'
import TreeUrl from '@/components/trees/settings/url'
import TreeDescription from '@/components/trees/settings/description'
import TreeSocialProfiles from '@/components/trees/settings/social-profiles'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function TabletPanel({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        'border-lt-light-gray/60 bg-lt-gray relative h-[calc(100dvh-100px)] w-85 flex-col overflow-hidden rounded-2xl border',
        className
      )}
    >
      <Tabs defaultValue='settings' className='flex h-full flex-col gap-0'>
        <header className='border-lt-light-gray/60 flex h-12 shrink-0 items-center justify-center border-b px-4'>
          <TabsList>
            <TabsTrigger value='settings'>Settings</TabsTrigger>
            <TabsTrigger value='appearance'>Appearance</TabsTrigger>
          </TabsList>
        </header>
        <TabsContent
          value='settings'
          className='min-h-0 flex-1 overflow-hidden data-[state=inactive]:hidden'
        >
          <ScrollArea className='h-full' scrollHideDelay={0}>
            <TreeAvatar />
            <Separator />
            <TreeName />
            <Separator />
            <TreeUrl />
            <Separator />
            <TreeDescription />
            <Separator />
            <TreeSocialProfiles />
          </ScrollArea>
        </TabsContent>
        <TabsContent
          value='appearance'
          className='min-h-0 flex-1 overflow-hidden data-[state=inactive]:hidden'
        >
          <ScrollArea className='h-full' scrollHideDelay={0}>
            <TreeBackground />
            <Separator />
            <TreeFont />
            <Separator />
            <TreeGeneral />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </aside>
  )
}
