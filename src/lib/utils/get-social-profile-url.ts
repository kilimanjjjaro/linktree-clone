import { type SocialProfileTypes } from '@/generated/prisma/browser'

import { SOCIAL_PROFILES } from '@/lib/constants/social-profiles'

export function getSocialProfileUrl(type: SocialProfileTypes, url: string) {
  if (/^(https?:\/\/|mailto:|tel:)/i.test(url)) return url

  const definition = SOCIAL_PROFILES.find((profile) => profile.type === type)

  if (definition === undefined) return url

  return `${definition.link}${url}`
}
