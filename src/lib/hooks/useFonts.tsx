import { useStore } from '@/lib/store/store'
import { FONT_VARIANTS } from '@/lib/constants/appearance'
export default function useFonts() {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)
  const setHasUnsavedChanges = useStore((state) => state.setHasUnsavedChanges)

  const changeFont = (fontSlug: string) => {
    if (selectedTree === null) return

    const selectedFont = FONT_VARIANTS.find((item) => item.slug === fontSlug)

    if (selectedFont === undefined) return

    const currentAppearance = selectedTree.appearance

    setSelectedTree({
      ...selectedTree,
      appearance: {
        ...currentAppearance,
        font: selectedFont.id
      }
    })

    setHasUnsavedChanges(true)
  }

  return {
    changeFont
  }
}
