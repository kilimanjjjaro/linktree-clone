import { type TreeInterface, type TreeChanges } from '@/lib/types/trees'

export function getTreeChanges(
  current: TreeInterface,
  saved: TreeInterface
): TreeChanges | null {
  const fields: TreeChanges['fields'] = {}

  if (current.name !== saved.name) fields.name = current.name
  if (current.url !== saved.url) fields.url = current.url
  if (current.description !== saved.description)
    fields.description = current.description
  if (current.status !== saved.status) fields.status = current.status
  if (current.avatar !== saved.avatar) fields.avatar = current.avatar
  if (JSON.stringify(current.appearance) !== JSON.stringify(saved.appearance))
    fields.appearance = current.appearance

  const hasFieldChanges = Object.keys(fields).length > 0

  const savedProfileTypes = new Set(saved.socialProfiles.map((p) => p.type))
  const currentProfileTypes = new Set(current.socialProfiles.map((p) => p.type))

  const upsertProfiles: TreeChanges['upsertProfiles'] = []
  for (const profile of current.socialProfiles) {
    const savedProfile = saved.socialProfiles.find(
      (p) => p.type === profile.type
    )
    if (
      savedProfile === undefined ||
      savedProfile.url !== profile.url ||
      savedProfile.name !== profile.name
    ) {
      upsertProfiles.push({
        type: profile.type,
        url: profile.url,
        name: profile.name
      })
    }
  }

  const deleteProfileTypes: TreeChanges['deleteProfileTypes'] = []
  for (const type of savedProfileTypes) {
    if (!currentProfileTypes.has(type)) {
      deleteProfileTypes.push(type)
    }
  }

  const savedLinkUrls = new Set(saved.links.map((l) => l.url))
  const currentLinkUrls = new Set(current.links.map((l) => l.url))

  const upsertLinks: TreeChanges['upsertLinks'] = []
  for (const link of current.links) {
    const savedLink = saved.links.find((l) => l.url === link.url)
    if (
      savedLink === undefined ||
      savedLink.name !== link.name ||
      savedLink.featured !== link.featured ||
      savedLink.image !== link.image
    ) {
      upsertLinks.push({
        name: link.name,
        url: link.url,
        featured: link.featured,
        image: link.image
      })
    }
  }

  const deleteLinkUrls: TreeChanges['deleteLinkUrls'] = []
  for (const url of savedLinkUrls) {
    if (!currentLinkUrls.has(url)) {
      deleteLinkUrls.push(url)
    }
  }

  const hasChanges =
    hasFieldChanges ||
    upsertProfiles.length > 0 ||
    deleteProfileTypes.length > 0 ||
    upsertLinks.length > 0 ||
    deleteLinkUrls.length > 0

  if (!hasChanges) return null

  return {
    treeId: current.id,
    fields: hasFieldChanges ? fields : undefined,
    upsertProfiles,
    deleteProfileTypes,
    upsertLinks,
    deleteLinkUrls
  }
}
