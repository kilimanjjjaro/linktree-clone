export async function getOgImage(url: string) {
  try {
    const response = await fetch(url)
    const html = await response.text()
    let image = ''

    const ogImage = html.match(
      /<meta\s+property="og:image"\s+content="([^"]+)"\s*\/?>/i
    )

    if (ogImage !== null) {
      image = ogImage[1]
    } else {
      const elementImage = html.match(/<img\s+.*?src="([^"]+)"/i)

      if (elementImage != null) {
        const source = elementImage[1]

        image = new URL(source, url).href
      }
    }

    return image
  } catch (error) {
    console.error('OG_IMAGE: ', error)
    return ''
  }
}
