import { useStore, useStoreApi } from "@/lib/store/store-provider"
import { FONT_VARIANTS } from "@/lib/constants/appearance"
import { loadFont } from "@/lib/utils/fonts"

export default function useFonts() {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const storeApi = useStoreApi()

  const changeFont = async (fontSlug: string) => {
    const selectedFont = FONT_VARIANTS.find((item) => item.slug === fontSlug)

    if (selectedFont === undefined) return

    await loadFont(selectedFont.id)

    const currentTree = storeApi.getState().selectedTree

    if (currentTree === null) return

    setSelectedTree({
      ...currentTree,
      appearance: {
        ...currentTree.appearance,
        font: selectedFont.id
      }
    })
  }

  return {
    changeFont
  }
}
