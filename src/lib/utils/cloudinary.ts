const USER_CONTENT_PREFIXES = [
  "linktree/links-avatar/",
  "linktree/links-image/",
  "linktree/tree-backgrounds/"
]

export function getCloudinaryPublicId(url: string): string | null {
  if (url.length === 0) return null

  const match = url.match(/\/upload\/(?:.*?\/)?v\d+\/(.+?)\.\w+$/)

  return match?.[1] ?? null
}

export function isUserUploadedAsset(url: string | null | undefined): boolean {
  if (url == null || url.length === 0) return false

  const publicId = getCloudinaryPublicId(url)

  if (publicId === null) return false

  return USER_CONTENT_PREFIXES.some((prefix) => publicId.startsWith(prefix))
}
