export const API_BASE_URL = `${process.env.NODE_ENV === 'production' ? 'https://linktree-clone-woad.vercel.app/' : 'http://localhost:3000'}/api`

export const INPUT_TYPES = {
  TEXT: 1,
  TEL: 2,
  EMAIL: 3
}
