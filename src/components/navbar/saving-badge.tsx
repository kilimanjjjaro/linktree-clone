'use client'

import { useStore } from '@/lib/store/store'
import { cn } from '@/lib/utils'
import { geistMono } from '@/lib/utils/fonts'

export default function SavingBadge() {
  const savingTree = useStore((state) => state.savingTree)

  return (
    <span
      className={cn(
        'border-lt-lightest-gray/50 font-geist-mono text-lt-white flex items-center gap-1 rounded-full border px-2 py-1.5 text-[10px] leading-none opacity-0 transition-opacity',
        savingTree && 'opacity-100',
        geistMono
      )}
    >
      <span className='bg-lt-green size-1.5 rounded-full' aria-hidden />
      Saving
    </span>
  )
}
