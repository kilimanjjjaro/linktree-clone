export const GEIST_FONT_FAMILY = 'var(--font-geist-sans)'

export const BG_FLAT_COLOR = 0
export const BG_GRADIENT = 1
export const BG_IMAGE = 2
export const BG_DITHER = 3

export const BG_TYPES = [
  { id: BG_DITHER, name: 'Animated', slug: 'dither' },
  { id: BG_FLAT_COLOR, name: 'Flat Color', slug: 'flat-color' },
  { id: BG_GRADIENT, name: 'Gradient Color', slug: 'gradient-color' },
  { id: BG_IMAGE, name: 'Image', slug: 'image' }
]

export const DEFAULT_BACKGROUND: {
  type: number
  settings: {
    steps: Array<[number, number, number]>
    angle: number
    color: [number, number, number]
    url: string
  }
} = {
  type: BG_DITHER,
  settings: {
    steps: [],
    angle: 0,
    color: [167, 236, 192],
    url: ''
  }
}

export const CORNER_VARIANTS = [
  { id: 0, name: 'None', className: 'rounded-none' },
  { id: 1, name: 'XS', className: 'rounded-sm' },
  { id: 2, name: 'SM', className: 'rounded-lg' },
  { id: 3, name: 'MD', className: 'rounded-2xl' },
  { id: 4, name: 'LG', className: 'rounded-4xl' }
]

export const CONTAINER_BG_COLOR = 'rgba(18, 18, 18, 1)'

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
