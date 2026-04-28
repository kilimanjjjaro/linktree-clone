import { EyeOff } from 'lucide-react'

export default function PrivateNotice() {
  return (
    <div className='pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-5'>
      <div className='border-lt-light-gray/60 bg-lt-gray/90 text-lt-white pointer-events-auto flex items-center gap-x-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur'>
        <EyeOff className='size-4' aria-hidden />
        <span>Only you can see this tree</span>
      </div>
    </div>
  )
}
