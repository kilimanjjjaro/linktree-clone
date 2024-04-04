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
            'group toast group-[.toaster]:bg-tl-gray group-[.toaster]:text-tl-white group-[.toaster]:border-tl-light-gray group-[.toaster]:shadow-none justify-center',
          description: 'group-[.toast]:text-tl-white',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-tl-white'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
