export const GEIST_FONT_FAMILY = 'var(--font-geist-sans)'

export const BACKGROUND_TYPES = [
  { id: 0, name: 'Flat Color', slug: 'flat-color' },
  { id: 1, name: 'Gradient Color', slug: 'gradient-color' },
  { id: 2, name: 'Image', slug: 'image' },
  { id: 3, name: 'Video', slug: 'video' }
]

export const BG_FLAT_COLOR = BACKGROUND_TYPES[0].id
export const BG_GRADIENT = BACKGROUND_TYPES[1].id
export const BG_IMAGE = BACKGROUND_TYPES[2].id
export const BG_VIDEO = BACKGROUND_TYPES[3].id

export const CORNER_VARIANTS = [
  { id: 0, name: 'None', className: 'rounded-none' },
  { id: 1, name: 'XS', className: 'rounded-sm' },
  { id: 2, name: 'SM', className: 'rounded-lg' },
  { id: 3, name: 'MD', className: 'rounded-2xl' },
  { id: 4, name: 'LG', className: 'rounded-4xl' }
]

export const CONTAINER_BG_COLOR = 'rgba(255, 255, 255, 0.15)'

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
