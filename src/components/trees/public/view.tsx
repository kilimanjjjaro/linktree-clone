import Image from 'next/image'

import PublicSocialProfiles from '@/components/trees/public/social-profiles'
import FontLoader from '@/components/trees/public/font-loader'
import PublicLinks from '@/components/trees/public/links'
import PublicFooter from '@/components/trees/public/footer'
import PrivateNotice from '@/components/trees/public/private-notice'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BG_VIDEO, CONTAINER_BG_COLOR } from '@/lib/constants/appearance'
import { getCornerClassName } from '@/lib/utils/get-corner-class-name'
import { getBackgroundStyle } from '@/lib/utils/get-background-style'
import { getFontFamily } from '@/lib/utils/fonts'
import { cn } from '@/lib/utils'
import { type TreeInterface } from '@/lib/types/trees'

interface Props {
  tree: TreeInterface
  isPrivate?: boolean
}

export default function PublicTreeView({ tree, isPrivate = false }: Props) {
  const { appearance } = tree
  const fontId = appearance.font ?? 0
  const cornerStyle = appearance.general.cornerStyle ?? 3
  const hasContainer = appearance.general.contentContainer.enabled

  return (
    <>
      <FontLoader fontId={fontId} />
      {isPrivate && <PrivateNotice />}
      <main
        className='relative flex items-start justify-center'
        style={getBackgroundStyle(appearance.background)}
      >
        {appearance.background.type === BG_VIDEO &&
          appearance.background.settings.url && (
            <video
              src={appearance.background.settings.url}
              className='fixed inset-0 size-full object-cover'
              muted
              autoPlay
              loop
              playsInline
            />
          )}
        <section
          className='max-w-120 py-12'
          style={{ fontFamily: getFontFamily(fontId) }}
        >
          <header className='mb-6 flex flex-col items-center'>
            <div className='border-lt-light-gray/60 relative size-28 overflow-hidden rounded-full border'>
              <Image
                className='absolute size-full object-cover object-center'
                src={tree.avatar}
                alt={`${tree.name}'s avatar`}
                width={150}
                height={150}
                priority
              />
            </div>
            <div
              className={cn(
                'flex w-full flex-col items-center',
                hasContainer && 'mt-4 px-4 py-6',
                hasContainer && getCornerClassName(cornerStyle)
              )}
              style={
                hasContainer
                  ? { backgroundColor: CONTAINER_BG_COLOR }
                  : undefined
              }
            >
              <h1
                className={cn(
                  'text-center text-3xl leading-none font-semibold',
                  !hasContainer && 'mt-5'
                )}
              >
                {tree.name}
              </h1>
              {tree.description && (
                <p className='mt-3 text-center text-sm text-balance text-zinc-400'>
                  {tree.description}
                </p>
              )}
              <PublicSocialProfiles socialProfiles={tree.socialProfiles} />
            </div>
          </header>
          <PublicLinks links={tree.links} cornerStyle={cornerStyle} />
          <PublicFooter cornerStyle={cornerStyle} />
        </section>
      </main>
    </>
  )
}
