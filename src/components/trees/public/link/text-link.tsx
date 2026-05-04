import { type TreeLink } from '@/generated/prisma/browser'
import { buttonVariants } from '@/components/ui/button'
import { getCornerClassName } from '@/lib/utils/get-corner-class-name'
import { cn } from '@/lib/utils/cn'

interface Props {
  link: TreeLink
  cornerStyle: number
}

export default function TextLink({ link, cornerStyle }: Props) {
  return (
    <a
      className={cn(
        buttonVariants({ variant: 'default' }),
        'bg-lt-white w-full py-7 transition-transform xl:active:scale-[0.97]',
        getCornerClassName(cornerStyle)
      )}
      href={link.url}
      target='_blank'
      rel='noopener noreferrer'
    >
      {link.name}
    </a>
  )
}
