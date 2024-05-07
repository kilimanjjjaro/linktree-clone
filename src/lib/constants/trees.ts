import { type ExtendedTree } from '@/lib/types/trees'
import { BASE_URL } from './globals'

export const DEMO_TREE_VALUES: ExtendedTree = {
  id: 'demo',
  authorId: 'demo',
  status: 0,
  name: 'Demostration example',
  slug: 'demostration-example',
  url: `${BASE_URL}/#`,
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
  created_at: new Date(),
  updated_at: new Date()
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
