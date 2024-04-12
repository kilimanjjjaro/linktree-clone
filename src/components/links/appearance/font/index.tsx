'use client'

import Font from './font'
import { FONT_VARIANTS } from '@/lib/constants/link-appearance'
import { RadioGroup } from '@/components/ui/radio-group'

export default function LinkFont() {
  return (
    <section className='relative'>
      <div className='sticky top-0 z-10 mr-2 bg-lt-gray/95 px-5 pb-3 pt-5 backdrop-blur-sm'>
        <h3 className='text-sm font-medium leading-none'>Font</h3>
      </div>
      <RadioGroup
        className='grid-cols-3 gap-3 px-5 pb-5'
        defaultValue={FONT_VARIANTS[0].slug}
      >
        {FONT_VARIANTS.map((font) => (
          <Font key={font.id} name={font.name} slug={font.slug} />
        ))}
      </RadioGroup>
    </section>
  )
}
