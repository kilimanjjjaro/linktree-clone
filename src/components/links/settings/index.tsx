import LinkSocialMedia from './social-media'
import LinkAvatar from './avatar'
import LinkName from './name'
import LinkDescription from './description'
import { TypographyH3 } from '@/components/ui/typography/typography-h3'
import { Separator } from '@/components/ui/separator'

export default function LinkSettings() {
  return (
    <aside className='flex w-[340px] flex-col rounded-xl border border-lt-light-gray bg-lt-gray'>
      <TypographyH3 className='flex h-12 items-center justify-center px-4 text-lg'>
        Settings
      </TypographyH3>
      <Separator />
      <LinkAvatar />
      <Separator />
      <LinkName />
      <Separator />
      <LinkDescription />
      <Separator />
      <LinkSocialMedia />
    </aside>
  )
}
