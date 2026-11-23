import { describe, expect, it, vi } from 'vitest'
import type { SocialProfileTypes } from '@/generated/prisma/browser'
import { hexToRgb } from '@/lib/utils/hex-to-rgb'
import { rgbToHex } from '@/lib/utils/rgb-to-hex'
import { rgbToString } from '@/lib/utils/rgb-to-string'
import {
  getCloudinaryPublicId,
  isUserUploadedAsset
} from '@/lib/utils/cloudinary'
import { getBackgroundStyle } from '@/lib/utils/get-background-style'
import { getCornerClassName } from '@/lib/utils/get-corner-class-name'
import { getSocialProfileUrl } from '@/lib/utils/get-social-profile-url'
import { generateInputAttributes } from '@/lib/utils/generate-input-attributes'
import { createEmailTemplate } from '@/lib/utils/create-email-template'
import { getFontFamily } from '@/lib/utils/fonts'
import { cn } from '@/lib/utils/cn'
import {
  BG_DITHER,
  BG_FLAT_COLOR,
  BG_GRADIENT,
  BG_IMAGE,
  CORNER_VARIANTS,
  DEFAULT_BACKGROUND,
  FONT_VARIANTS,
  GEIST_FONT_FAMILY
} from '@/lib/constants/appearance'
import { INPUT_TYPES } from '@/lib/types/globals'
import {
  BASE_URL,
  LINK_IMAGE_URL,
  LINK_URL,
  UNKNOWN_ID
} from '../constants/unit'
import HEX_TO_RGB_CASES from '../constants/hex-to-rgb-cases.json'
import RGB_TO_HEX_CASES from '../constants/rgb-to-hex-cases.json'
import CLOUDINARY_PUBLIC_ID_CASES from '../constants/cloudinary-public-id-cases.json'
import USER_UPLOADED_ASSET_CASES from '../constants/user-uploaded-asset-cases.json'
import SOCIAL_PROFILE_URL_CASES from '../constants/social-profile-url-cases.json'

vi.mock('geist/font/sans', () => ({ GeistSans: { variable: 'geist-sans' } }))
vi.mock('geist/font/mono', () => ({ GeistMono: { variable: 'geist-mono' } }))

type Rgb = [number, number, number]

const BLACK: Rgb = [0, 0, 0]
const WHITE: Rgb = [255, 255, 255]
const MINT: Rgb = [167, 236, 192]
const GRADIENT_ANGLE = 90

function createBackground(
  type: number,
  settings: Partial<typeof DEFAULT_BACKGROUND.settings> = {}
) {
  return {
    type,
    settings: { ...structuredClone(DEFAULT_BACKGROUND.settings), ...settings }
  }
}

describe('colors', () => {
  it.each(HEX_TO_RGB_CASES)(
    'hexToRgb($hex) is $expected',
    ({ hex, expected }) => {
      expect(hexToRgb(hex)).toEqual(expected)
    }
  )

  it.each(RGB_TO_HEX_CASES)(
    'rgbToHex($rgb) is $expected',
    ({ rgb, expected }) => {
      expect(rgbToHex(rgb as Rgb)).toBe(expected)
    }
  )

  it('converts a color to hex and back without changes', () => {
    expect(hexToRgb(rgbToHex(MINT))).toEqual(MINT)
  })

  it('formats a color as a css rgb value', () => {
    expect(rgbToString(MINT)).toBe('rgb(167, 236, 192)')
  })
})

describe('cloudinary', () => {
  it.each(CLOUDINARY_PUBLIC_ID_CASES)(
    'the public id of "$url" is $expected',
    ({ url, expected }) => {
      expect(getCloudinaryPublicId(url)).toBe(expected)
    }
  )

  it.each(USER_UPLOADED_ASSET_CASES)(
    '"$url" uploaded by a user is $expected',
    ({ url, expected }) => {
      expect(isUserUploadedAsset(url)).toBe(expected)
    }
  )
})

describe('getBackgroundStyle', () => {
  it('leaves the animated background to the canvas', () => {
    expect(getBackgroundStyle(createBackground(BG_DITHER))).toEqual({})
  })

  it('paints a flat color', () => {
    expect(
      getBackgroundStyle(createBackground(BG_FLAT_COLOR, { color: MINT }))
    ).toEqual({ backgroundColor: 'rgb(167, 236, 192)' })
  })

  it('paints nothing for a gradient without steps', () => {
    expect(
      getBackgroundStyle(createBackground(BG_GRADIENT, { steps: [] }))
    ).toEqual({})
  })

  it('paints a gradient with a single step as a flat color', () => {
    expect(
      getBackgroundStyle(createBackground(BG_GRADIENT, { steps: [WHITE] }))
    ).toEqual({ backgroundColor: 'rgb(255, 255, 255)' })
  })

  it('spreads the gradient steps evenly', () => {
    expect(
      getBackgroundStyle(
        createBackground(BG_GRADIENT, {
          steps: [BLACK, MINT, WHITE],
          angle: GRADIENT_ANGLE
        })
      )
    ).toEqual({
      background:
        'linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(167, 236, 192) 50%, rgb(255, 255, 255) 100%)'
    })
  })

  it('covers the background with an image', () => {
    expect(
      getBackgroundStyle(createBackground(BG_IMAGE, { url: LINK_IMAGE_URL }))
    ).toEqual({
      backgroundImage: `url(${LINK_IMAGE_URL})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    })
  })

  it('paints nothing for an image background without an image', () => {
    expect(getBackgroundStyle(createBackground(BG_IMAGE, { url: '' }))).toEqual(
      {}
    )
  })

  it('paints nothing for an unknown background type', () => {
    expect(getBackgroundStyle(createBackground(UNKNOWN_ID))).toEqual({})
  })
})

describe('getCornerClassName', () => {
  it.each(CORNER_VARIANTS)(
    'corner $id uses $className',
    ({ id, className }) => {
      expect(getCornerClassName(id)).toBe(className)
    }
  )

  it('falls back to medium corners', () => {
    expect(getCornerClassName(UNKNOWN_ID)).toBe('rounded-2xl')
  })
})

describe('getSocialProfileUrl', () => {
  it.each(SOCIAL_PROFILE_URL_CASES)(
    '$type "$url" links to $expected',
    ({ type, url, expected }) => {
      expect(getSocialProfileUrl(type as SocialProfileTypes, url)).toBe(
        expected
      )
    }
  )
})

describe('generateInputAttributes', () => {
  it('limits text inputs to 80 chars', () => {
    expect(generateInputAttributes(INPUT_TYPES.TEXT)).toEqual({
      type: 'text',
      maxLength: 80
    })
  })

  it('limits phone inputs between 7 and 20 chars', () => {
    expect(generateInputAttributes(INPUT_TYPES.TEL)).toEqual({
      type: 'tel',
      minLength: 7,
      maxLength: 20
    })
  })

  it('uses an email input for emails', () => {
    expect(generateInputAttributes(INPUT_TYPES.EMAIL)).toEqual({
      type: 'email'
    })
  })

  it('adds no attributes for unknown input types', () => {
    expect(generateInputAttributes(UNKNOWN_ID)).toEqual({})
  })
})

describe('createEmailTemplate', () => {
  const template = createEmailTemplate({
    heading: 'Heading',
    intro: 'Intro',
    buttonLabel: 'Button',
    note: 'Note',
    textTitle: 'Title',
    url: LINK_URL
  })

  it('renders the content and links the button to the url', () => {
    expect(template.html).toContain('>Heading</h2>')
    expect(template.html).toContain('>Intro</p>')
    expect(template.html).toContain('>Button</span>')
    expect(template.html).toContain('>Note</p>')
    expect(template.html).toContain(`<a href="${LINK_URL}"`)
    expect(template.html).toContain(`>${LINK_URL}</code>`)
    expect(template.html).toContain(`<a href="${BASE_URL}"`)
  })

  it('renders a plain text version with the url', () => {
    expect(template.text).toBe(`Title\n${LINK_URL}\n\n`)
  })
})

describe('getFontFamily', () => {
  const fontsWithFamily = FONT_VARIANTS.filter(
    (variant) => variant.family !== null
  )

  it('uses geist for the default font', () => {
    expect(getFontFamily(FONT_VARIANTS[0].id)).toBe(GEIST_FONT_FAMILY)
  })

  it.each(fontsWithFamily)('uses $family for font $id', ({ id, family }) => {
    expect(getFontFamily(id)).toBe(`'${family}', sans-serif`)
  })

  it('falls back to geist for unknown fonts', () => {
    expect(getFontFamily(UNKNOWN_ID)).toBe(GEIST_FONT_FAMILY)
  })
})

describe('cn', () => {
  it('merges conflicting tailwind classes', () => {
    expect(cn('p-2 text-sm', false, 'p-4')).toBe('text-sm p-4')
  })
})
