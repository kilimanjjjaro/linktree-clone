import {
  BG_GRADIENT,
  BG_FLAT_COLOR,
  BG_IMAGE,
  BG_VIDEO
} from '@/lib/constants/appearance'
import { rgbToString } from '@/lib/utils/rgb-to-string'
import { type TreeAppearanceInterface } from '@/lib/types/trees'

export function getBackgroundStyle(
  background: TreeAppearanceInterface['background']
) {
  const { type, settings } = background

  if (type === BG_VIDEO) return {}

  if (type === BG_GRADIENT) {
    const { steps, angle } = settings

    if (steps.length === 0) return {}

    if (steps.length === 1) return { backgroundColor: rgbToString(steps[0]) }

    const stopPercent = 100 / (steps.length - 1)

    const gradientStops = steps
      .map((s, i) => `${rgbToString(s)} ${Math.round(i * stopPercent)}%`)
      .join(', ')

    return { background: `linear-gradient(${angle}deg, ${gradientStops})` }
  }

  if (type === BG_FLAT_COLOR) {
    return { backgroundColor: rgbToString(settings.color) }
  }

  if (type === BG_IMAGE) {
    if (!settings.url) return {}

    return {
      backgroundImage: `url(${settings.url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }

  return {}
}
