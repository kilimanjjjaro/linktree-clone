import { CORNER_VARIANTS } from '@/lib/constants/appearance'

export const getCornerClassName = (cornerStyle: number) => {
  return (
    CORNER_VARIANTS.find((v) => v.id === cornerStyle)?.className ??
    'rounded-2xl'
  )
}
