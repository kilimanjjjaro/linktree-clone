import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'min-h-[80px] w-full rounded-xl border border-tl-light-gray bg-tl-darkest-gray px-3 py-2.5 text-sm ring-offset-tl-gray placeholder:text-tl-lightest-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tl-white focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
