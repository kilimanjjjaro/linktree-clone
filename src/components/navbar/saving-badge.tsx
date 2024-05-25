'use client'

import { useStore } from '@/lib/store/store'
import { cn } from '@/lib/utils'
import { geistMono } from '@/lib/utils/fonts'

export default function SavingBadge() {
  const savingTree = useStore((state) => state.savingTree)

  return (
    <span
      className={cn(
        'flex items-center gap-1 rounded-full border border-lt-lightest-gray/50 px-2 py-1.5 font-geist-mono text-[10px] leading-none text-lt-white opacity-0 transition-opacity',
        savingTree && 'opacity-100',
        geistMono
      )}
    >
      <span className='size-1.5 rounded-full bg-lt-green' aria-hidden />
      Saving
    </span>
  )
}
