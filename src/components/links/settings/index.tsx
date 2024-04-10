import LinkSocialMedia from './social-media'
import LinkAvatar from './avatar'
import LinkUrl from './url'
import LinkStatus from './status'
import LinkDescription from './description'
import { TypographyH3 } from '@/components/ui/typography/typography-h3'
import { Separator } from '@/components/ui/separator'

export default function LinkSettings() {
  return (
    <aside className='flex w-[340px] flex-col rounded-2xl border border-lt-light-gray/60 bg-lt-gray'>
      <TypographyH3 className='flex h-12 items-center justify-center px-4 text-lg'>
        Settings
      </TypographyH3>
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
