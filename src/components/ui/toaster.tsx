'use client'

import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position='top-center'
      pauseWhenPageIsHidden
      toastOptions={{
        classNames: {
          toast:
            'rounded-2xl backdrop-blur-sm text-lt-white justify-center text-center has-[button]:justify-start has-[button]:text-left',
          default: 'border-lt-light-gray/[.2] bg-lt-light-gray/[.3]',
          success: '!border-green-900/[.1] !bg-green-950/[.4]',
          error: '!border-red-900/[.1] !bg-red-950/[.4]',
          warning: '!border-yellow-300/[.1] !bg-yellow-400/[.4]',
          description: 'text-lt-lightest-gray text-balance',
          cancelButton:
            '!bg-transparent xl:hover:!bg-lt-light-gray !transition',
          actionButton:
            '!bg-lt-white !text-lt-black xl:hover:!bg-lt-white/80 !transition'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
