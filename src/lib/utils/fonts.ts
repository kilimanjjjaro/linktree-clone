import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { FONT_VARIANTS, GEIST_FONT_FAMILY } from "@/lib/constants/appearance"

export const geistSans = GeistSans.variable
export const geistMono = GeistMono.variable

const variantsById = new Map(FONT_VARIANTS.map((f) => [f.id, f]))

export function getFontFamily(fontId: number) {
  const variant = variantsById.get(fontId)

  if (!variant?.family) return GEIST_FONT_FAMILY

  return `'${variant.family}', sans-serif`
}

export async function loadFont(fontId: number) {
  const variant = variantsById.get(fontId)

  if (!variant?.family) return

  const loaded = Array.from(document.fonts).some(
    (f) => f.family === variant.family
  )

  if (loaded) return

  if (variant.variable) {
    const face = new FontFace(
      variant.family,
      `url(/fonts/${variant.slug}.woff2)`,
      {
        weight: `${variant.weights[0]} ${variant.weights.at(-1)}`,
        display: "swap"
      }
    )

    document.fonts.add(face)

    await face.load()
  } else {
    const faces = variant.weights.map((weight) => {
      const face = new FontFace(
        variant.family!,
        `url(/fonts/${variant.slug}-${weight}.woff2)`,
        { weight: String(weight), display: "swap" }
      )

      document.fonts.add(face)

      return face.load()
    })

    await Promise.all(faces)
  }
}
