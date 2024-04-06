import LinkSocialMedia from './profile/social-media'
import LinkAvatar from '@/components/links/settings/profile/avatar'
import LinkName from '@/components/links/settings/profile/name'
import LinkDescription from '@/components/links/settings/profile/description'
import { TypographyH3 } from '@/components/ui/typography/typography-h3'
import { Separator } from '@/components/ui/separator'

export default function LinkSettings() {
  return (
    <>
      <TypographyH3 className='flex h-12 items-center border-b border-lt-light-gray px-4 text-lg'>
        Profile
      </TypographyH3>
      <LinkAvatar />
      <Separator />
      <LinkName />
      <Separator />
      <LinkDescription />
      <Separator />
      <LinkSocialMedia />
    </>
  )
}
