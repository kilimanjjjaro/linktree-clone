import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'

import FontLoader from '@/components/trees/public/font-loader'
import PublicSocialProfiles from '@/components/trees/public/social-profiles'
import PublicLinks from '@/components/trees/public/links'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getPublishedTree } from '@/lib/services/get-published-tree'
import { BG_VIDEO } from '@/lib/constants/appearance'
import { getFontFamily } from '@/lib/utils/fonts'
import { getBackgroundStyle } from '@/lib/utils/get-background-style'
import { getCornerClassName } from '@/lib/utils/get-corner-class-name'
import { getContainerColor } from '@/lib/utils/get-container-color'
import { cn } from '@/lib/utils'

interface Props {
  params: Promise<{ treeUrl: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { treeUrl } = await params
  const tree = await getPublishedTree(treeUrl)

  if (!tree) return {}

  return {
    title: `${tree.name} | Linktree`,
    description: tree.description,
    openGraph: {
      title: tree.name,
      description: tree.description,
      images: [tree.avatar]
    }
  }
}

export default async function PublicTreePage({ params }: Props) {
  const { treeUrl } = await params
  const tree = await getPublishedTree(treeUrl)

  if (!tree) notFound()

  const { appearance } = tree
  const fontId = appearance.font ?? 0
  const cornerStyle = appearance.general.cornerStyle ?? 3
  const hasContainer = appearance.general.contentContainer.enabled

  return (
    <>
      <FontLoader fontId={fontId} />
      <main
        className='relative flex min-h-dvh items-start justify-center'
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
        <ScrollArea
          className='relative h-dvh w-full max-w-170 px-4'
          scrollHideDelay={0}
          style={{ fontFamily: getFontFamily(fontId) }}
        >
          <div
            className={cn(
              hasContainer && 'mx-auto mt-12 mb-8 px-4 py-6',
              hasContainer && getCornerClassName(cornerStyle)
            )}
            style={
              hasContainer
                ? {
                    backgroundColor: getContainerColor(
                      appearance.general.contentContainer.color
                    )
                  }
                : undefined
            }
          >
            <header
              className={cn(
                'mb-6 flex flex-col items-center',
                hasContainer ? 'mt-4' : 'mt-12'
              )}
            >
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
              <h1 className='mt-5 text-center text-3xl leading-none font-semibold'>
                {tree.name}
              </h1>
              {tree.description && (
                <p className='mt-3 text-center text-sm text-balance text-zinc-400'>
                  {tree.description}
                </p>
              )}
              <PublicSocialProfiles socialProfiles={tree.socialProfiles} />
            </header>
            <PublicLinks links={tree.links} cornerStyle={cornerStyle} />
          </div>
        </ScrollArea>
      </main>
    </>
  )
}
