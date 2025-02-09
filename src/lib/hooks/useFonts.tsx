import { useStore } from '@/lib/store/store'
import { FONT_VARIANTS } from '@/lib/constants/appearance'
import { type TreeAppearanceInterface } from '@/lib/types/trees'

export default function useFonts() {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)

  const changeFont = (fontSlug: string) => {
    if (selectedTree === null) return

    const selectedFont = FONT_VARIANTS.find((item) => item.slug === fontSlug)

    if (selectedFont === undefined) return

    const currentAppearance =
      selectedTree.appearance as unknown as TreeAppearanceInterface

    setSelectedTree({
      ...selectedTree,
      appearance: {
        ...currentAppearance,
        font: selectedFont.id
      }
    })

    localStorage.setItem(
      '__LOCAL_TREE__',
      JSON.stringify({
        ...selectedTree,
        appearance: {
          ...currentAppearance,
          font: selectedFont.id
        }
      })
    )
  }

  return {
    changeFont
  }
}
