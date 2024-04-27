'use client'

import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className='toaster group'
      position='top-center'
      pauseWhenPageIsHidden
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-lt-gray group-[.toaster]:rounded-2xl group-[.toaster]:text-lt-white group-[.toaster]:border-lt-light-gray/60 group-[.toaster]:shadow-none justify-center backdrop-blur-sm',
          description: 'group-[.toast]:text-lt-white',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-lt-white',
          success:
            'group-[.toaster]:border-green-900/30 group-[.toaster]:bg-green-950/60 group-[.toaster]:text-green-100',
          error:
            'group-[.toaster]:border-red-900/30 group-[.toaster]:bg-red-950/60 group-[.toaster]:text-red-100'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
