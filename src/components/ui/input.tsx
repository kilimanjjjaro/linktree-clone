import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'h-10 w-full rounded-full border autofill:shadow-[inset_0_0_0px_1000px_rgb(18,18,18)] border-lt-light-gray/60 bg-transparent px-3 py-2 text-sm ring-offset-lt-gray file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-lt-lightest-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lt-white focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
