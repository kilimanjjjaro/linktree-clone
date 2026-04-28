import { type TreeLink } from '@/generated/prisma/browser'
import FeaturedLink from '@/components/trees/public/link/featured-link'
import TextLink from '@/components/trees/public/link/text-link'

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
