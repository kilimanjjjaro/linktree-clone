import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full text-sm font-medium outline-none transition-[background-color,color,border,opacity] focus-visible:ring-2 focus-visible:ring-lt-white focus-visible:ring-offset-2 focus-visible:ring-offset-lt-gray disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-lt-green text-lt-black xl:hover:bg-lt-lightest-gray',
        destructive: 'bg-red-700 text-lt-white xl:hover:bg-red-700/70',
        outline: 'border border-lt-light-gray/60 xl:hover:bg-lt-light-gray',
        secondary:
          'bg-lt-light-gray text-lt-white xl:hover:bg-lt-light-gray/60',
        ghost: 'text-lt-white xl:hover:bg-lt-light-gray',
        link: 'text-lt-white underline-offset-4 xl:hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'size-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
