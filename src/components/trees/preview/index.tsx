import Image from 'next/image'

import DeviceOverlay from '@/components/trees/preview/device-overlay'
import SocialProfiles from '@/components/trees/preview/social-profiles'
import FeaturedLink from '@/components/trees/preview/link/featured-link'
import TextLink from '@/components/trees/preview/link/text-link'
import AddLink from '@/components/trees/preview/add-link'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { type ExtendedTree } from '@/lib/types/trees'

export default function TreePreview({ tree }: { tree: ExtendedTree }) {
  const user = getCurrentUser()

  return (
    <section className='flex flex-col items-center self-center'>
      <div className='relative flex aspect-[320/630] w-[360px] items-center justify-center'>
        <DeviceOverlay />
        <div className='relative flex h-[95%] w-[91%] flex-col gap-y-6 overflow-hidden px-5'>
          <header className='flex flex-col items-center pt-[20%]'>
            <div className='relative size-28 overflow-hidden rounded-full border border-lt-light-gray/60'>
              <Image
                className='absolute size-full object-cover object-center'
                src={tree.avatar}
                alt='Gonzalo'
                width={150}
                height={150}
                priority
              />
            </div>
            <h1 className='mt-5 text-center text-3xl font-semibold leading-none'>
              {tree.name}
            </h1>
            <p className='mt-3 text-balance text-center text-sm text-zinc-400'>
              {tree.description}
            </p>
            <SocialProfiles profiles={tree.socialProfiles} />
          </header>
          <main className='grid grid-cols-1 gap-y-5'>
            {tree.links.map((link) => (
              <div key={link.id} className='relative'>
                {link.featured ? (
                  <FeaturedLink link={link} />
                ) : (
                  <TextLink link={link} />
                )}
              </div>
            ))}
          </main>
          <AddLink treeId={tree.id} isLogged={user !== null ?? false} />
        </div>
      </div>
    </section>
  )
}
