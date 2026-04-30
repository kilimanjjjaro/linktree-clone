'use client'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useStore } from '@/lib/store/store-provider'
import { CORNER_VARIANTS } from '@/lib/constants/appearance'
import { cn } from '@/lib/utils'

export default function TreeGeneral() {
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)

  const { cornerStyle, contentContainer } = selectedTree.appearance.general

  const updateGeneral = (
    updates: Partial<typeof selectedTree.appearance.general>
  ) => {
    const updatedTree = {
      ...selectedTree,
      appearance: {
        ...selectedTree.appearance,
        general: {
          ...selectedTree.appearance.general,
          ...updates
        }
      }
    }

    setSelectedTree(updatedTree)
  }

  return (
    <section className='p-5'>
      <h3 className='text-sm leading-none font-medium'>General</h3>
      <section className='mt-3 flex flex-col gap-5'>
        <div>
          <Label className='text-lt-lightest-gray'>Corner style</Label>
          <RadioGroup
            className='mt-2 grid-cols-5 gap-2'
            value={String(cornerStyle)}
            onValueChange={(value) => {
              updateGeneral({ cornerStyle: Number(value) })
            }}
          >
            {CORNER_VARIANTS.map((variant) => (
              <article key={variant.id}>
                <RadioGroupItem
                  id={`corner-${variant.id}`}
                  className='peer'
                  value={String(variant.id)}
                  hidden
                />
                <Label
                  htmlFor={`corner-${variant.id}`}
                  className={cn(
                    'border-lt-light-gray/60 flex cursor-pointer items-center justify-center rounded-lg border px-2 py-1.5',
                    'peer-data-[state=checked]:border-lt-white peer-data-[state=checked]:bg-lt-light-gray/30'
                  )}
                >
                  <span className='text-lt-lightest-gray text-xs'>
                    {variant.name}
                  </span>
                </Label>
              </article>
            ))}
          </RadioGroup>
        </div>
        <div className='text-lt-lightest-gray flex items-center justify-between'>
          <Label htmlFor='content-container'>Content container</Label>
          <div className='flex items-center gap-x-3'>
            <span className='text-sm'>
              {contentContainer.enabled ? 'Show' : 'Hide'}
            </span>
            <Switch
              id='content-container'
              checked={contentContainer.enabled}
              onCheckedChange={(checked) => {
                updateGeneral({
                  contentContainer: { enabled: checked }
                })
              }}
              required
            />
          </div>
        </div>
      </section>
    </section>
  )
}
