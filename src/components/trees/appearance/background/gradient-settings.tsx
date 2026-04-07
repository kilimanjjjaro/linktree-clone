import { Plus, Trash2 } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { hexToRgb } from '@/lib/utils/hex-to-rgb'
import { rgbToHex } from '@/lib/utils/rgb-to-hex'

interface Props {
  steps: Array<[number, number, number]>
  angle: number
  onChange: (updates: {
    steps?: Array<[number, number, number]>
    angle?: number
  }) => void
}

export default function GradientSettings({ steps, angle, onChange }: Props) {
  const canAdd = steps.length < 5
  const canRemove = steps.length > 2

  return (
    <div className='flex flex-col gap-3'>
      <Label className='text-lt-lightest-gray'>Colors</Label>
      <div className='flex flex-col gap-2'>
        {steps.map((step, index) => (
          <div key={index} className='flex items-center gap-2'>
            <Input
              type='color'
              value={rgbToHex(step)}
              onChange={(e) => {
                const newSteps = [...steps]
                newSteps[index] = hexToRgb(e.target.value)
                onChange({ steps: newSteps })
              }}
              className='size-8 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0'
            />
            <span className='text-lt-lightest-gray flex-1 text-xs'>
              {rgbToHex(step).toUpperCase()}
            </span>
            {canRemove && (
              <button
                type='button'
                className='text-lt-lightest-gray hover:text-lt-white transition-colors'
                onClick={() => {
                  const newSteps = steps.filter((_, i) => i !== index)
                  onChange({ steps: newSteps })
                }}
              >
                <Trash2 className='size-3.5' aria-hidden />
                <span className='sr-only'>Remove color</span>
              </button>
            )}
          </div>
        ))}
      </div>
      {canAdd && (
        <button
          type='button'
          className='border-lt-light-gray/60 hover:bg-lt-light-gray/30 flex items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-colors'
          onClick={() => {
            onChange({ steps: [...steps, [128, 128, 128]] })
          }}
        >
          <Plus className='size-3' aria-hidden />
          Add color
        </button>
      )}
      <div className='mt-1'>
        <Label className='text-lt-lightest-gray'>Angle</Label>
        <div className='mt-2 flex items-center gap-3'>
          <input
            type='range'
            min={0}
            max={360}
            value={angle}
            onChange={(e) => onChange({ angle: Number(e.target.value) })}
            className='flex-1'
          />
          <span className='text-lt-lightest-gray w-10 text-right text-xs'>
            {angle}°
          </span>
        </div>
      </div>
    </div>
  )
}
