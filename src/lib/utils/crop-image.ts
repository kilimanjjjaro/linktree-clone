import type { Area } from "react-easy-crop"

async function createImage(url: string): Promise<CanvasImageSource> {
  return await new Promise((resolve) => {
    const image = new Image()

    image.addEventListener("load", () => {
      resolve(image)
    })

    image.addEventListener("error", (error) => {
      Error(error?.message)
    })

    image.src = url
  })
}

export async function cropImage(imageUrl: string, croppedArea: Area) {
  const image = await createImage(imageUrl)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (ctx === null) return ""

  canvas.width = croppedArea.width
  canvas.height = croppedArea.height

  const croppedCtx = canvas.getContext("2d")

  if (croppedCtx === null) return ""

  croppedCtx.drawImage(
    image,
    croppedArea.x,
    croppedArea.y,
    croppedArea.width,
    croppedArea.height,
    0,
    0,
    croppedArea.width,
    croppedArea.height
  )

  return await new Promise<string>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob !== null) resolve(URL.createObjectURL(blob))
    }, "image/jpeg")
  })
}
