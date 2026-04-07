import { CONTAINER_COLORS } from '@/lib/constants/appearance'

export const getContainerColor = (colorId: number) => {
  return (
    CONTAINER_COLORS.find((c) => c.id === colorId)?.value ??
    CONTAINER_COLORS[0].value
  )
}
