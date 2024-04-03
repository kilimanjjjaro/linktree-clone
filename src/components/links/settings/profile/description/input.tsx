'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

export default function DescriptionInput() {
  const [textareaLength, setTextareaLength] = useState(0)

  const updateLength = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const length = event.target.value.length

    setTextareaLength(length)
  }

  return (
    <div className='relative flex'>
      <Textarea
        id='link-description'
        className='min-h-[86px] resize-none p-3'
        placeholder="I'm a Full Stack Developer and these are my projects."
        maxLength={120}
        onChange={updateLength}
      />
      <span className='absolute bottom-3 right-3 text-xs leading-none'>
        {textareaLength}/120
      </span>
    </div>
  )
}
