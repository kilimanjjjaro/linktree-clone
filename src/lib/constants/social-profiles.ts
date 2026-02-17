import { SocialProfileTypes } from '@/generated/prisma/browser'

import { INPUT_TYPES, type SocialProfileInterface } from '@/lib/types/globals'

export const SOCIAL_PROFILES: SocialProfileInterface[] = [
  {
    name: 'Email',
    link: 'mailto:',
    type: SocialProfileTypes.EMAIL,
    form: {
      inputType: INPUT_TYPES.EMAIL,
      label: 'Email address',
      disabledText: '',
      placeholder: 'your-email@example.com'
    }
  },
  {
    name: 'Facebook',
    link: 'https://www.facebook.com/',
    type: SocialProfileTypes.FACEBOOK,
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'facebook.com/',
      placeholder: 'your-facebook-url'
    }
  },
  {
    name: 'Discord',
    link: '',
    type: SocialProfileTypes.DISCORD,
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: '@',
      placeholder: 'your-username'
    }
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/',
    type: SocialProfileTypes.INSTAGRAM,
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'instagram.com/',
      placeholder: 'your-username'
    }
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/',
    type: SocialProfileTypes.LINKEDIN,
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Account',
      disabledText: 'linkedin.com/in/',
      placeholder: 'your-account-url'
    }
  },
  {
    name: 'Pinterest',
    link: 'https://pinterest.com/',
    type: SocialProfileTypes.PINTEREST,
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'pinterest.com/',
      placeholder: 'your-username'
    }
  },
  {
    name: 'Reddit',
    link: 'https://www.reddit.com/user/',
    type: SocialProfileTypes.REDDIT,
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'reddit.com/user/',
      placeholder: 'your-username'
    }
  },
  {
    name: 'Telegram',
    link: '',
    type: SocialProfileTypes.TELEGRAM,
    form: {
      inputType: INPUT_TYPES.TEL,
      label: 'Number',
      disabledText: '',
      placeholder: '+4320000000000'
    }
  },
  {
    name: 'Threads',
    link: 'https://www.threads.net/@',
    type: SocialProfileTypes.THREADS,
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'threads.net/@',
      placeholder: 'your-username'
    }
  },
  {
    name: 'TikTok',
    link: 'https://www.tiktok.com/@',
    type: SocialProfileTypes.TIKTOK,
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'tiktok.com/@',
      placeholder: 'your-username'
    }
  },
  {
    name: 'Twitch',
    link: 'https://www.twitch.tv/',
    type: SocialProfileTypes.TWITCH,
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'twitch.tv/',
      placeholder: 'your-username'
    }
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com/',
    type: SocialProfileTypes.TWITTER,
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'twitter.com/',
      placeholder: 'your-username'
    }
  },
  {
    name: 'WhatsApp',
    link: 'https://api.whatsapp.com/send?phone=',
    type: SocialProfileTypes.WHATSAPP,
    form: {
      inputType: INPUT_TYPES.TEL,
      label: 'Number',
      disabledText: '',
      placeholder: '+4320000000000'
    }
  },
  {
    name: 'YouTube',
    link: 'https://www.youtube.com/@',
    type: SocialProfileTypes.YOUTUBE,
    form: {
      inputType: INPUT_TYPES.TEXT,
      label: 'Username',
      disabledText: 'youtube.com/@',
      placeholder: 'your-username'
    }
  }
]
