import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SocialMediaInterface } from '@/lib/types/globals'

interface Props {
  media: SocialMediaInterface
  selectedMedia: string
}

export default function SocialMedia({ media, selectedMedia }: Props) {
  return (
    <>
      {media.label}
      <CheckIcon
        className={cn(
          'ml-auto h-4 w-4',
          selectedMedia === media.value ? 'opacity-100' : 'opacity-0'
        )}
      />
    </>
  )
}
