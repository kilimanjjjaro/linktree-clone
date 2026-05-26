export function rgbToHex(rgb: [number, number, number]) {
  return (
    "#" +
    rgb
      .map((c) => {
        const hex = c.toString(16)
        return hex.length === 1 ? "0" + hex : hex
      })
      .join("")
  )
}
