export const GEIST_FONT_FAMILY = 'var(--font-geist-sans)'

export const CORNER_VARIANTS = [
  { id: 0, name: 'None', className: 'rounded-none' },
  { id: 1, name: 'XS', className: 'rounded-sm' },
  { id: 2, name: 'SM', className: 'rounded-lg' },
  { id: 3, name: 'MD', className: 'rounded-2xl' },
  { id: 4, name: 'LG', className: 'rounded-4xl' }
]

export const getCornerClassName = (cornerStyle: number) => {
  return (
    CORNER_VARIANTS.find((v) => v.id === cornerStyle)?.className ??
    'rounded-2xl'
  )
}

export const getContainerColor = (colorId: number) => {
  return (
    CONTAINER_COLORS.find((c) => c.id === colorId)?.value ??
    CONTAINER_COLORS[0].value
  )
}

export const CONTAINER_COLORS = [
  { id: 0, name: 'White', value: 'rgba(255, 255, 255, 0.15)' },
  { id: 1, name: 'Black', value: 'rgba(0, 0, 0, 0.3)' },
  { id: 2, name: 'Blue', value: 'rgba(59, 130, 246, 0.2)' },
  { id: 3, name: 'Purple', value: 'rgba(147, 51, 234, 0.2)' },
  { id: 4, name: 'Pink', value: 'rgba(236, 72, 153, 0.2)' },
  { id: 5, name: 'Green', value: 'rgba(34, 197, 94, 0.2)' },
  { id: 6, name: 'Orange', value: 'rgba(249, 115, 22, 0.2)' },
  { id: 7, name: 'Red', value: 'rgba(239, 68, 68, 0.2)' }
]

export const FONT_VARIANTS = [
  {
    id: 0,
    name: 'Geist',
    slug: 'geist',
    family: null,
    variable: false,
    weights: []
  },
  {
    id: 1,
    name: 'Poppins',
    slug: 'poppins',
    family: 'Poppins',
    variable: false,
    weights: [400, 600]
  },
  {
    id: 2,
    name: 'Space Grotesk',
    slug: 'space-grotesk',
    family: 'Space Grotesk',
    variable: true,
    weights: [400, 600]
  },
  {
    id: 3,
    name: 'Oswald',
    slug: 'oswald',
    family: 'Oswald',
    variable: true,
    weights: [400, 600]
  },
  {
    id: 4,
    name: 'Barlow Condensed',
    slug: 'barlow-condensed',
    family: 'Barlow Condensed',
    variable: false,
    weights: [400, 600]
  },
  {
    id: 5,
    name: 'Nunito',
    slug: 'nunito',
    family: 'Nunito',
    variable: true,
    weights: [400, 600]
  },
  {
    id: 6,
    name: 'Playfair Display',
    slug: 'playfair-display',
    family: 'Playfair Display',
    variable: true,
    weights: [400, 600]
  },
  {
    id: 7,
    name: 'Merriweather',
    slug: 'merriweather',
    family: 'Merriweather',
    variable: true,
    weights: [400, 600]
  },
  {
    id: 8,
    name: 'Lora',
    slug: 'lora',
    family: 'Lora',
    variable: true,
    weights: [400, 600]
  }
]
