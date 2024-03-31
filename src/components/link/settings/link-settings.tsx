import LinkAvatar from '@/components/link/settings/profile/avatar/link-avatar'
import LinkName from '@/components/link/settings/profile/name/link-name'
import LinkDescription from '@/components/link/settings/profile/description/link-description'
import { TypographyH3 } from '@/components/ui/typography/typography-h3'
import { Separator } from '@/components/ui/separator'

export default function LinkSettings() {
  return (
    <aside className='flex h-full w-96 flex-col gap-6 overflow-hidden'>
      <section className='rounded-2xl border border-border bg-background'>
        <div className='h-12 border-b border-b-border p-3 text-center'>
          <TypographyH3>Profile</TypographyH3>
        </div>
        <div className='flex flex-col'>
          <LinkAvatar />
          <Separator />
          <LinkName />
          <Separator />
          <LinkDescription />
        </div>
      </section>
    </aside>
  )
}
