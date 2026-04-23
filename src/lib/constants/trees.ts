import { type TreeInterface } from '@/lib/types/trees'

export const DEMO_TREE_VALUES: TreeInterface = {
  id: 'demo',
  authorId: 'demo',
  status: 0,
  name: 'Example Tree',
  url: 'example-tree',
  description:
    'Full Stack Developer & UX/UI Designer with +6 years of work experience.',
  avatar:
    'https://res.cloudinary.com/dsvcixsbp/image/upload/c_scale,h_150/v1714920612/linktree/default-tree-avatar_mo72xw.jpg',
  socialProfiles: [],
  links: [],
  appearance: {
    background: {
      type: 0,
      settings: {
        steps: [],
        angle: 0,
        color: [18, 18, 18],
        url: ''
      }
    },
    font: 0,
    general: {
      cornerStyle: 3,
      contentContainer: {
        enabled: false
      }
    }
  },
  createdAt: new Date(),
  updatedAt: new Date()
}

export const DEFAULT_TREE_NAME = 'Example Tree'

export const ACCEPTED_FILE_TYPES = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpeg']
}

export const CROPPED_AREA_VALUES = {
  width: 0,
  height: 0,
  x: 0,
  y: 0
}

export const TREE_STATUS = {
  DRAFT: 0,
  PUBLISHED: 1
}

export const PREVIEW_VIEWPORT = {
  MOBILE: 'mobile',
  DESKTOP: 'desktop'
} as const
