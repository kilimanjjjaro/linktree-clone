"use client"

import Font from "@/components/trees/appearance/font/font"
import { RadioGroup } from "@/components/ui/radio-group"
import { useStore } from "@/lib/store/store-provider"
import useFonts from "@/lib/hooks/useFonts"
import { FONT_VARIANTS } from "@/lib/constants/appearance"
export default function TreeFont() {
  const { changeFont } = useFonts()
  const selectedTree = useStore((state) => state.selectedTree)

  const appearance = selectedTree?.appearance

  const currentFont = FONT_VARIANTS.find(
    (f) => f.id === (appearance?.font ?? 0)
  )

  return (
    <section className="p-5">
      <h3 className="text-sm leading-none font-medium">Font</h3>
      <RadioGroup
        className="mt-3 grid-cols-3 gap-3"
        value={currentFont?.slug ?? FONT_VARIANTS[0].slug}
        onValueChange={(value) => {
          changeFont(value)
        }}
      >
        {FONT_VARIANTS.map((font) => (
          <Font key={font.id} font={font} />
        ))}
      </RadioGroup>
    </section>
  )
}
