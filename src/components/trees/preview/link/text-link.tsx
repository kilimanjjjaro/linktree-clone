import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type TreeLink as TreeLinkType } from '@prisma/client'

export default function TextLink({ link }: { link: TreeLinkType }) {
  return (
    <a
      className={cn(
        buttonVariants({ variant: 'default' }),
        'py-7 rounded-2xl bg-lt-white'
      )}
      href={link.url}
      target='_blank'
      rel='noopener noreferrer'
    >
      {link.name}
    </a>
  )
}
