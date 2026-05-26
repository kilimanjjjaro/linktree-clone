'use client'

import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position='top-center'
      toastOptions={{
        classNames: {
          toast:
            'rounded-2xl !bg-lt-gray text-lt-white border !border-lt-light-gray/60 shadow-none justify-center text-center has-[button]:justify-start has-[button]:text-left',
          default: 'border-lt-black/[.2] bg-lt-gray/20',
          success: '!text-green-200',
          error: '!text-red-200',
          warning: '!text-yellow-200',
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
