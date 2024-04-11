import { Separator } from '@/components/ui/separator'
import LinkFont from './font'

export default function LinkAppearance() {
  return (
    <aside className='flex w-[340px] flex-col rounded-2xl border border-lt-light-gray/60 bg-lt-gray'>
      <h2 className='flex h-12 items-center justify-center px-4 text-lg leading-none'>
        Appearance
      </h2>
      <Separator />
      <LinkFont />
    </aside>
  )
}
