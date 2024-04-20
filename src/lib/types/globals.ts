export type ChildrenType = React.ReactNode

export type SocialProfileType =
  | 'email'
  | 'facebook'
  | 'discord'
  | 'instagram'
  | 'linkedin'
  | 'pinterest'
  | 'reddit'
  | 'telegram'
  | 'threads'
  | 'tiktok'
  | 'twitch'
  | 'twitter'
  | 'whatsapp'
  | 'youtube'

export interface SocialProfileInterface {
  id: number
  name: string
  slug: SocialProfileType
  link: string
  form: {
    inputType: number
    label: string
    disabledText: string
    placeholder: string
  }
}

export interface TreeSocialProfilesInterface {
  id: number
  name: string
  slug: SocialProfileType
  inputValue: string | number
  link: string
}
