import { buttonVariants } from '@/components/ui/button'
import { type TreeLink as TreeLinkType } from '@prisma/client'

export default function TextLink({ link }: { link: TreeLinkType }) {
  return (
    <a
      className={buttonVariants({ variant: 'default' })}
      href={link.url}
      target='_blank'
      rel='noopener noreferrer'
    >
      {link.name}
    </a>
  )
}
