'use client'

import Font from './font'
import { FONT_VARIANTS } from '@/lib/constants/link-appearance'
import { RadioGroup } from '@/components/ui/radio-group'

export default function LinkFont() {
  return (
    <section className='p-5'>
      <h3 className='text-sm font-medium leading-none'>Font</h3>
      <RadioGroup
        className='mt-3 grid-cols-3 gap-3'
        defaultValue={FONT_VARIANTS[0].slug}
      >
        {FONT_VARIANTS.map((font) => (
          <Font key={font.id} name={font.name} slug={font.slug} />
        ))}
      </RadioGroup>
    </section>
  )
}
