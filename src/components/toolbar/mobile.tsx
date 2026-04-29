'use client'

import { Eye, Palette, Plus, SlidersHorizontal } from 'lucide-react'
import { toast } from 'sonner'

import TreeBackground from '@/components/trees/appearance/background'
import TreeFont from '@/components/trees/appearance/font'
import TreeGeneral from '@/components/trees/appearance/general'
import TreeAvatar from '@/components/trees/settings/avatar'
import TreeName from '@/components/trees/settings/name'
import TreeUrl from '@/components/trees/settings/url'
import TreeDescription from '@/components/trees/settings/description'
import TreeSocialProfiles from '@/components/trees/settings/social-profiles'
import TreeStatus from '@/components/toolbar/tree-status'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { useStore } from '@/lib/store/store'
import useCurrentUser from '@/lib/hooks/useCurrentUser'
import { cn } from '@/lib/utils'

export default function MobileToolbar({ className }: { className?: string }) {
  const selectedTree = useStore((state) => state.selectedTree)
  const setShowAddLinkDialog = useStore((state) => state.setShowAddLinkDialog)
  const setSelectedLink = useStore((state) => state.setSelectedLink)
  const user = useCurrentUser()

  const isViewDisabled = selectedTree === null || selectedTree.url.length === 0

  const handleView = () => {
    if (isViewDisabled) return

    if (user === null) {
      localStorage.setItem('__LOCAL_TREE__', JSON.stringify(selectedTree))
    }

    window.open(`/${selectedTree.url}`, '_blank', 'noopener,noreferrer')
  }

  const handleAddLink = () => {
    if (selectedTree === null) {
      toast.error('Select a tree first.')
      return
    }
    setSelectedLink(null)
    setShowAddLinkDialog(true)
  }

  return (
    <div
      className={cn(
        'fixed inset-x-3 bottom-[max(env(safe-area-inset-bottom),12px)] z-40',
        className
      )}
    >
      <div className='border-lt-light-gray/60 bg-lt-gray flex h-14 w-full items-center justify-between gap-2 rounded-full border px-2'>
        <div className='flex items-center gap-1'>
          <TreeStatus />
          <button
            type='button'
            aria-label='View tree'
            disabled={isViewDisabled}
            onClick={handleView}
            className={cn(
              'focus-visible:ring-lt-white focus-visible:ring-offset-lt-gray flex size-11 shrink-0 items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              isViewDisabled
                ? 'text-lt-lightest-gray/40 cursor-not-allowed'
                : 'text-lt-lightest-gray xl:active:bg-lt-light-gray/40 cursor-pointer'
            )}
          >
            <Eye className='size-5' aria-hidden />
          </button>
        </div>

        <div className='flex items-center gap-1'>
          <Sheet>
            <SheetTrigger asChild>
              <button
                type='button'
                aria-label='Settings'
                className='focus-visible:ring-lt-white focus-visible:ring-offset-lt-gray text-lt-lightest-gray xl:active:bg-lt-light-gray/40 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
              >
                <SlidersHorizontal className='size-5' aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent className='flex flex-col p-0'>
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
              </SheetHeader>
              <ScrollArea className='min-h-0 flex-1' scrollHideDelay={0}>
                <TreeAvatar />
                <Separator />
                <TreeName />
                <Separator />
                <TreeUrl />
                <Separator />
                <TreeDescription />
                <Separator />
                <TreeSocialProfiles />
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <button
                type='button'
                aria-label='Appearance'
                className='focus-visible:ring-lt-white focus-visible:ring-offset-lt-gray text-lt-lightest-gray xl:active:bg-lt-light-gray/40 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
              >
                <Palette className='size-5' aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent className='flex flex-col p-0'>
              <SheetHeader>
                <SheetTitle>Appearance</SheetTitle>
              </SheetHeader>
              <ScrollArea className='min-h-0 flex-1' scrollHideDelay={0}>
                <TreeBackground />
                <Separator />
                <TreeFont />
                <Separator />
                <TreeGeneral />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>

        <div className='flex items-center'>
          <button
            type='button'
            aria-label='Add link'
            onClick={handleAddLink}
            className='bg-lt-white text-lt-black focus-visible:ring-lt-white focus-visible:ring-offset-lt-gray xl:active:bg-lt-white/85 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
          >
            <Plus className='size-5' aria-hidden strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
