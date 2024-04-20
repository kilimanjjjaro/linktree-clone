import TreeAvatar from './avatar'
import TreeName from './name'
import TreeUrl from './url'
import TreeDescription from './description'
import TreeSocialProfiles from './social-profiles'
import TreeStatus from './status'
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
