import { type TreeInterface } from '@/lib/types/trees'

export const DEMO_TREE_VALUES: TreeInterface = {
  id: 'demo',
  authorId: 'demo',
  status: 0,
  name: 'Example Tree',
  url: 'example-tree',
  description:
    'This is an example tree to showcase the features of the app. Feel free to explore and customize it!',
  avatar:
    'https://res.cloudinary.com/dsvcixsbp/image/upload/c_scale,h_150/v1714920612/linktree/default-tree-avatar_mo72xw.jpg',
  socialProfiles: [
    {
      treeId: 'demo',
      type: 'EMAIL',
      url: 'gonzaloemacastillo@gmail.com',
      name: 'Email',
      id: 'fcd55224-de57-4091-a7dc-3f72d549fff2',
      createdAt: new Date('2026-04-24T13:04:46.756Z'),
      updatedAt: new Date('2026-04-24T13:04:46.756Z')
    },
    {
      treeId: 'demo',
      type: 'LINKEDIN',
      url: 'gonzaloemanuelcastillo',
      name: 'LinkedIn',
      id: '4f5c57d2-2d70-41bb-82e4-c662a51a4f3f',
      createdAt: new Date('2026-04-24T13:05:02.646Z'),
      updatedAt: new Date('2026-04-24T13:05:02.646Z')
    }
  ],
  links: [
    {
      treeId: 'demo',
      name: 'Portfolio',
      url: 'https://kilimanjjjaro.com/',
      featured: true,
      image: 'https://kilimanjjjaro.com/images/og-image.jpg',
      id: '57d11ebe-fb10-4c3a-8e3e-d3b92c84542d',
      createdAt: new Date('2026-04-24T13:02:00.539Z'),
      updatedAt: new Date('2026-04-24T13:02:00.539Z')
    },
    {
      treeId: 'demo',
      name: 'Full Stack App',
      url: 'https://wrkload.vercel.app/',
      featured: true,
      image: 'https://wrkload.vercel.app/images/og.jpg',
      id: 'cd265a51-5b5b-4dec-aeb2-2ee8c7fbd6fd',
      createdAt: new Date('2026-04-24T13:02:32.114Z'),
      updatedAt: new Date('2026-04-24T13:02:32.114Z')
    }
  ],
  appearance: {
    background: {
      type: 3,
      settings: {
        steps: [],
        angle: 0,
        color: [167, 236, 192],
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
