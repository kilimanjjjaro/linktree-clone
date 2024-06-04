import { type TreeInterface } from '@/lib/types/trees'

export const DEMO_TREE_VALUES: TreeInterface = {
  id: 'demo',
  authorId: 'demo',
  status: 0,
  name: 'Tree example',
  url: 'tree-example',
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
        steps: [
          [251, 231, 225],
          [42, 70, 122],
          [0, 2, 11]
        ],
        angle: 0
      }
    },
    font: 0,
    general: {
      cornerStyle: 1,
      contentContainer: false
    }
  },
  createdAt: new Date(),
  updatedAt: new Date()
}

export const TREE_NAMES = [
  'Obscured by Clouds',
  "When You're In",
  'Burning Bridges',
  "The Gold It's in the...",
  "Wot's... Uh the Deal?",
  'Mudmen',
  "Childhood's End",
  'Free Four',
  'Stay',
  'Absolutely Curtains'
]

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
