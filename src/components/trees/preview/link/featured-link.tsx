import { Button } from '@/components/ui/button'
import { type TreeLink as TreeLinkType } from '@prisma/client'
import { Upload } from 'lucide-react'

export default function FeaturedLink({ link }: { link: TreeLinkType }) {
  return (
    <div className='relative'>
      <a href={link.url} target='_blank' rel='noopener noreferrer'>
        <div
          className='relative flex aspect-video items-end overflow-hidden rounded-2xl bg-cover bg-center'
          style={{
            backgroundImage: `url(${link.image ?? ''})`
          }}
        >
          <div className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 to-black/0' />
          <div className='z-10 p-5'>
            <h3 className='text-balance text-xl leading-none'>{link.name}</h3>
          </div>
        </div>
      </a>
      <Button
        aria-label='Upload background image'
        className='absolute right-2 top-2 z-20 h-auto rounded-full bg-lt-white/90 p-1.5'
      >
        <Upload className='size-3' strokeWidth={2.5} />
      </Button>
    </div>
  )
}
