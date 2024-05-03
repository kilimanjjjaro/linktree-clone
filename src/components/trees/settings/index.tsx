import TreeAvatar from '@/components/trees/settings/avatar'
import TreeName from '@/components/trees/settings/name'
import TreeUrl from '@/components/trees/settings/url'
import TreeDescription from '@/components/trees/settings/description'
import TreeSocialProfiles from '@/components/trees/settings/social-profiles'
import TreeStatus from '@/components/trees/settings/status'
import { Separator } from '@/components/ui/separator'

export default function TreeSettings() {
  return (
    <aside className='flex w-[340px] flex-col rounded-2xl border border-lt-light-gray/60 bg-lt-gray'>
      <h2 className='flex h-12 items-center justify-center px-4 text-lg leading-none'>
        Settings
      </h2>
      <Separator />
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
    </aside>
  )
}
