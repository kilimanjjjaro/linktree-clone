import TreeAvatar from '@/components/trees/settings/avatar'
import TreeName from '@/components/trees/settings/name'
import TreeUrl from '@/components/trees/settings/url'
import TreeDescription from '@/components/trees/settings/description'
import TreeSocialProfiles from '@/components/trees/settings/social-profiles'
import TreeStatus from '@/components/trees/settings/status'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

export default async function TreeSettings() {
  return (
    <aside className='relative flex max-h-[calc(100dvh-100px)] w-[340px] flex-col rounded-2xl border border-lt-light-gray/60 bg-lt-gray'>
      <h2 className='flex h-12 items-center justify-center px-4 text-lg leading-none'>
        Settings
      </h2>
      <Separator />
      <ScrollArea className='h-screen' scrollHideDelay={0}>
        <TreeAvatar />
        <Separator />
        <TreeName />
        <Separator />
        <TreeUrl />
        <Separator />
        <TreeDescription />
        <Separator />
        <TreeSocialProfiles />
        <Separator />
        <TreeStatus />
      </ScrollArea>
    </aside>
  )
}
