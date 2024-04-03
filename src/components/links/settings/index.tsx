import LinkSocialMedia from './profile/social-media'
import LinkAvatar from '@/components/links/settings/profile/avatar'
import LinkName from '@/components/links/settings/profile/name'
import LinkDescription from '@/components/links/settings/profile/description'
import { TypographyH3 } from '@/components/ui/typography/typography-h3'
import { Separator } from '@/components/ui/separator'

export default function LinkSettings() {
  return (
    <aside className='h-full w-96'>
      <div className='overflow-hidden rounded-xl border border-border bg-background'>
        <TypographyH3 className='h-12 border-b border-b-border p-3 text-center'>
          Profile
        </TypographyH3>
        <LinkAvatar />
        <Separator />
        <LinkName />
        <Separator />
        <LinkDescription />
        <Separator />
        <LinkSocialMedia />
      </div>
    </aside>
  )
}
