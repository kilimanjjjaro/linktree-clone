import { INPUT_TYPES } from '@/lib/constants/globals'
import type { SocialMediaInterface } from '@/lib/types/globals'

export const SOCIAL_MEDIA: SocialMediaInterface[] = [
  {
    id: 0,
    name: 'Email',
    slug: 'email',
    link: 'mailto:',
    form: {
      inputType: INPUT_TYPES.EMAIL,
      label: 'Email address',
      disabledText: '',
      placeholder: 'your-email@example.com'
    }
  },
  {
    id: 1,
    name: 'Facebook',
    slug: 'facebook',
    link: 'https://www.facebook.com/',
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'facebook.com/',
      placeholder: 'your-facebook-url'
    }
  },
  {
    id: 2,
    name: 'Discord',
    slug: 'discord',
    link: '',
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: '@',
      placeholder: 'your-username'
    }
  },
  {
    id: 3,
    name: 'Instagram',
    slug: 'instagram',
    link: 'https://www.instagram.com/',
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'instagram.com/',
      placeholder: 'your-username'
    }
  },
  {
    id: 4,
    name: 'LinkedIn',
    slug: 'linkedin',
    link: 'https://www.linkedin.com/in/',
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Account',
      disabledText: 'linkedin.com/in/',
      placeholder: 'your-account-url'
    }
  },
  {
    id: 5,
    name: 'Pinterest',
    slug: 'pinterest',
    link: 'https://pinterest.com/',
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'pinterest.com/',
      placeholder: 'your-username'
    }
  },
  {
    id: 6,
    name: 'Reddit',
    slug: 'reddit',
    link: 'https://www.reddit.com/user/',
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'reddit.com/user/',
      placeholder: 'your-username'
    }
  },
  {
    id: 7,
    name: 'Telegram',
    slug: 'telegram',
    link: '',
    form: {
      inputType: INPUT_TYPES.TEL,
      label: 'Number',
      disabledText: '',
      placeholder: '+4320000000000'
    }
  },
  {
    id: 8,
    name: 'Threads',
    slug: 'threads',
    link: 'https://www.threads.net/@',
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'threads.net/@',
      placeholder: '@your-username'
    }
  },
  {
    id: 9,
    name: 'TikTok',
    slug: 'tiktok',
    link: 'https://www.tiktok.com/@',
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'tiktok.com/@',
      placeholder: '@your-username'
    }
  },
  {
    id: 10,
    name: 'Twitch',
    slug: 'twitch',
    link: 'https://www.twitch.tv/',
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'twitch.tv/',
      placeholder: 'your-username'
    }
  },
  {
    id: 11,
    name: 'X (formerly Twitter)',
    slug: 'twitter',
    link: 'https://twitter.com/',
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'twitter.com/',
      placeholder: '@your-username'
    }
  },
  {
    id: 12,
    name: 'Whatsapp',
    slug: 'whatsapp',
    link: 'https://api.whatsapp.com/send?phone=',
    form: {
      inputType: INPUT_TYPES.TEL,
      label: 'Number',
      disabledText: '',
      placeholder: '+4320000000000'
    }
  },
  {
    id: 13,
    name: 'YouTube',
    slug: 'youtube',
    link: 'https://www.youtube.com/@',
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'youtube.com/@',
      placeholder: 'your-username'
    }
  }
]
