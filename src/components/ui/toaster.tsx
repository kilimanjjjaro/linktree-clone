'use client'

import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className='toaster  group'
      position='bottom-center'
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-lt-gray group-[.toaster]:text-lt-white group-[.toaster]:border-lt-light-gray group-[.toaster]:shadow-none justify-center',
          description: 'group-[.toast]:text-lt-white',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-lt-white'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
