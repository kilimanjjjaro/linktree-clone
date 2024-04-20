import TreeSocialProfiles from './social-profiles'
import TreeAvatar from './avatar'
import TreeUrl from './url'
import TreeStatus from './status'
import TreeDescription from './description'
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
