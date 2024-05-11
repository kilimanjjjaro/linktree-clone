import Image from 'next/image'

import DeviceOverlay from '@/components/trees/preview/device-overlay'
import SocialProfiles from '@/components/trees/preview/social-profiles'
import FeaturedLink from '@/components/trees/preview/link/featured-link'
import TextLink from '@/components/trees/preview/link/text-link'
import AddLink from '@/components/trees/preview/add-link'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { type ExtendedTree } from '@/lib/types/trees'
import { Skeleton } from '@/components/ui/skeleton'

export default function TreePreview({ tree }: { tree: ExtendedTree | null }) {
  const user = getCurrentUser()

  const hasLinks = tree !== null && tree.links.length > 0
  const hasSocialProfiles = tree !== null && tree.socialProfiles.length > 0

  return (
    <section className='flex flex-col items-center self-center'>
      <div className='relative flex aspect-[320/630] w-[360px] items-center justify-center'>
        <DeviceOverlay />
        <div className='relative flex h-[95%] w-[91%] flex-col gap-y-6 overflow-hidden px-5'>
          <header className='flex flex-col items-center pt-[20%]'>
            {tree === null ? (
              <Skeleton className='size-28 rounded-full' />
            ) : (
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
            )}
            <h1 className='mt-5 text-center text-3xl font-semibold leading-none'>
              {tree === null ? (
                <Skeleton className='h-8 w-36 rounded-full' />
              ) : (
                tree.name
              )}
            </h1>
            <p className='mt-3 text-balance text-center text-sm text-zinc-400'>
              {tree === null ? (
                <span className='grid justify-items-center gap-y-1'>
                  <Skeleton className='h-3 w-56 rounded-full' />
                  <Skeleton className='h-3 w-48 rounded-full' />
                </span>
              ) : (
                tree.description
              )}
            </p>
            {!hasSocialProfiles ? (
              <div className='mt-4 flex flex-wrap items-center justify-center gap-3 px-6'>
                <Skeleton className='size-7 rounded-full' />
                <Skeleton className='size-7 rounded-full' />
                <Skeleton className='size-7 rounded-full' />
                <Skeleton className='size-7 rounded-full' />
              </div>
            ) : (
              <SocialProfiles profiles={tree.socialProfiles} />
            )}
          </header>
          <main className='grid grid-cols-1 gap-y-5'>
            {/* Puede que la lista de link necesite ser abstraida */}
            {!hasLinks ? (
              <>
                <Skeleton className='aspect-video h-full rounded-2xl' />
                <Skeleton className='h-14 rounded-2xl' />
              </>
            ) : (
              <>
                {tree.links.map((link) => (
                  <div key={link.id} className='relative'>
                    {link.featured ? (
                      <FeaturedLink link={link} />
                    ) : (
                      <TextLink link={link} />
                    )}
                  </div>
                ))}
              </>
            )}
          </main>
          <AddLink treeId={tree?.id} isLogged={user !== null ?? false} />
        </div>
      </div>
    </section>
  )
}
