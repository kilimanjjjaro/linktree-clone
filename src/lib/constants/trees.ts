export const DEFAULT_THREE_VALUE = {
  id: 'default',
  authorId: 'default',
  status: 0,
  name: 'Demostration example',
  slug: 'demostration-example',
  url: '/#',
  description:
    'Full Stack Developer & UX/UI Designer with +6 years of work experience.',
  avatar: '/images/default-tree-avatar.svg',
  socialProfiles: [
    {
      id: 'default',
      type: 0,
      url: '/#'
    },
    {
      id: 'default',
      type: 1,
      url: '/#'
    },
    {
      id: 'default',
      type: 2,
      url: '/#'
    }
  ],
  links: [
    {
      id: 'default',
      name: 'Example link',
      url: '/#',
      featured: true,
      backgroundImage: ''
    },
    {
      id: 'default',
      name: 'Example link',
      url: '/#',
      featured: true,
      backgroundImage: ''
    }
  ],
  appearance: {
    // background: {
    //   type: 0,
    //   settings: {
    //     steps: [
    //       [251, 231, 225],
    //       [42, 70, 122],
    //       [0, 2, 11]
    //     ],
    //     angle: 0
    //   }
    // },
    font: 0,
    general: {
      cornerStyle: 1,
      contentContainer: false
    }
  }
}

export const DEFAULT_TREE_AVATAR = '/images/default-tree-avatar.svg'

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
