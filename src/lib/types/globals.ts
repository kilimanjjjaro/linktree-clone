import { type SocialProfileTypes } from '@prisma/client'

export type ChildrenType = React.ReactNode

export enum INPUT_TYPES {
  TEXT = 1,
  TEL = 2,
  EMAIL = 3
}

export interface SocialProfileInterface {
  type: SocialProfileTypes
  name: string
  link: string
  form: {
    inputType: INPUT_TYPES
    label: string
    disabledText: string
    placeholder: string
  }
}

export interface TreeSocialProfilesInterface {
  type: SocialProfileTypes
  name: string
  inputValue: string | number
  link: string
}
