import { ChevronsUpDown } from 'lucide-react'
import SelectedTree from '@/components/navbar/tree-selector/selected'
import TreeList from '@/components/navbar/tree-selector/list'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

import { getTrees } from '@/lib/services/get-trees'
import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'
import { type ExtendedTreeType } from '@/lib/types/trees'

export default async function TreeSelector() {
  const data = await getTrees()
  let trees: ExtendedTreeType[] = [DEFAULT_THREE_VALUE]

  if (data.length > 0) trees = data

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          role='combobox'
          className='h-full p-0 text-xl font-normal transition-opacity xl:hover:bg-transparent xl:hover:opacity-70'
        >
          <SelectedTree trees={trees} />
          <ChevronsUpDown className='size-4 shrink-0' aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-60 p-0'>
        <TreeList trees={trees} />
      </PopoverContent>
    </Popover>
  )
}
