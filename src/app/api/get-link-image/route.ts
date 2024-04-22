export async function POST(request: Request) {
  const formData = await request.formData()
  const url = formData.get('url') as string

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

    return Response.json({ image })
  } catch (error) {
    console.error(error)
    return Response.json(null)
  }
}
