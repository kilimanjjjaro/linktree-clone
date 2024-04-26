export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'

export const INPUT_TYPES = {
  TEXT: 1,
  TEL: 2,
  EMAIL: 3
}

export const PUBLIC_ROUTES = ['/', '/confirm-account']
export const AUTH_ROUTES = [
  '/login',
  '/signup',
  '/reset-password',
  '/new-password'
]
