import LinkSocialMedia from './social-media'
import LinkAvatar from './avatar'
import LinkUrl from './url'
import LinkStatus from './status'
import LinkDescription from './description'
import { Separator } from '@/components/ui/separator'

export default function LinkSettings() {
  return (
    <aside className='flex w-[340px] flex-col rounded-2xl border border-lt-light-gray/60 bg-lt-gray'>
      <h2 className='flex h-12 items-center justify-center px-4 text-lg leading-none'>
        Settings
      </h2>
      <Separator />
      <LinkAvatar />
      <Separator />
      <LinkUrl />
      <Separator />
      <LinkDescription />
      <Separator />
      <LinkSocialMedia />
      <Separator />
      <LinkStatus />
    </aside>
  )
}
