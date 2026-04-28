import TreeStatus from '@/components/toolbar/tree-status'
import ViewTree from '@/components/toolbar/view-tree'
import PreviewViewportToggle from '@/components/toolbar/preview-viewport-toggle'
import AddLink from '@/components/trees/preview/link/add-link'
import { Separator } from '@/components/ui/separator'

export default function Toolbar() {
  return (
    <div className='fixed inset-x-0 bottom-3 z-40 flex justify-center'>
      <div className='border-lt-light-gray/60 bg-lt-gray flex h-14 items-center gap-x-3 rounded-full border px-3'>
        <TreeStatus />
        <ViewTree />
        <Separator orientation='vertical' className='h-5' />
        <PreviewViewportToggle />
        <Separator orientation='vertical' className='h-5' />
        <AddLink />
      </div>
    </div>
  )
}
