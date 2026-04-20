import { type TreeLink } from '@/generated/prisma/browser'
import { buttonVariants } from '@/components/ui/button'
import { getCornerClassName } from '@/lib/utils/get-corner-class-name'
import { cn } from '@/lib/utils'

interface Props {
  links: TreeLink[]
  cornerStyle: number
}

export default function PublicLinks({ links, cornerStyle }: Props) {
  return (
    <main className='mb-8 grid grid-cols-1 gap-y-4'>
      {links.map((link) =>
        link.featured ? (
          <FeaturedLink key={link.id} link={link} cornerStyle={cornerStyle} />
        ) : (
          <TextLink key={link.id} link={link} cornerStyle={cornerStyle} />
        )
      )}
    </main>
  )
}

function FeaturedLink({
  link,
  cornerStyle
}: {
  link: TreeLink
  cornerStyle: number
}) {
  return (
    <a href={link.url} target='_blank' rel='noopener noreferrer'>
      <div
        className={cn(
          'relative flex aspect-video items-end overflow-hidden bg-cover bg-center',
          getCornerClassName(cornerStyle)
        )}
        style={{
          backgroundImage: `url(${link.image ?? ''})`
        }}
      >
        <div className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 to-black/0' />
        <div className='z-10 p-5'>
          <h3 className='text-xl leading-none text-balance'>{link.name}</h3>
        </div>
      </div>
    </a>
  )
}

function TextLink({
  link,
  cornerStyle
}: {
  link: TreeLink
  cornerStyle: number
}) {
  return (
    <a
      className={cn(
        buttonVariants({ variant: 'default' }),
        'bg-lt-white w-full py-7',
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
