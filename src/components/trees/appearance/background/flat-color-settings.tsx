import { Label } from '@/components/ui/label'
import { hexToRgb } from '@/lib/utils/hex-to-rgb'
import { rgbToHex } from '@/lib/utils/rgb-to-hex'

interface Props {
  color: [number, number, number]
  onChange: (color: [number, number, number]) => void
}

export default function FlatColorSettings({ color, onChange }: Props) {
  return (
    <div className='flex flex-col gap-3'>
      <Label className='text-lt-lightest-gray'>Color</Label>
      <div className='flex items-center gap-3'>
        <input
          type='color'
          value={rgbToHex(color)}
          onChange={(e) => onChange(hexToRgb(e.target.value))}
          className='size-10 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0'
        />
        <span className='text-lt-lightest-gray text-xs'>
          {rgbToHex(color).toUpperCase()}
        </span>
      </div>
    </div>
  )
}
