export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://linktree-clone-henna-pi.vercel.app'
    : 'http://localhost:3000'

export const GUEST_ROUTES = ['/']
export const AUTH_ROUTES = [
  '/login',
  '/signup',
  '/reset-password',
  '/new-password',
  '/confirm-account'
]

export const DIALOG = {
  HIDDEN: 0,
  SocialProfileTypes: 1,
  SAVE_TREE: 2,
  UPLOAD_AVATAR: 3,
  ADD_LINK: 4
}
