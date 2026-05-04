import { type TreeLink } from '@/generated/prisma/browser'
import { getCornerClassName } from '@/lib/utils/get-corner-class-name'
import { cn } from '@/lib/utils/cn'

interface Props {
  link: TreeLink
  cornerStyle: number
}

export default function FeaturedLink({ link, cornerStyle }: Props) {
  return (
    <a
      href={link.url}
      target='_blank'
      rel='noopener noreferrer'
      className='transition-transform xl:active:scale-[0.97]'
    >
      <div
        className={cn(
          'relative flex aspect-video items-end overflow-hidden bg-cover bg-center',
          getCornerClassName(cornerStyle)
        )}
        style={{
          backgroundImage: `url(${link.image ?? ''})`
        }}
      >
        <div className='absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/95 to-black/0' />
        <div className='z-10 p-5'>
          <h3 className='text-xl leading-none text-balance'>{link.name}</h3>
        </div>
      </div>
    </a>
  )
}
