import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import authConfig from '@/lib/auth/auth.config'
import { GUEST_ROUTES, AUTH_ROUTES } from '@/lib/constants/globals'

const { auth } = NextAuth(authConfig)

const KNOWN_ROUTES = new Set([...GUEST_ROUTES, ...AUTH_ROUTES])

function isTreeRoute(pathname: string) {
  if (KNOWN_ROUTES.has(pathname)) return false
  // Single-segment paths like /my-tree (no nested slashes, no file extension)
  return /^\/[^/.]+$/.test(pathname)
}

export default auth((request) => {
  const { nextUrl } = request
  const isLoggedIn = request.auth !== null

  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth')
  const isGuestRoute = GUEST_ROUTES.includes(nextUrl.pathname)
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)

  if (isApiAuthRoute) return NextResponse.next()

  if (isAuthRoute) {
    if (isLoggedIn) return NextResponse.redirect(new URL('/', nextUrl))

    return NextResponse.next()
  }

  if (isTreeRoute(nextUrl.pathname)) return NextResponse.next()

  if (!isLoggedIn && !isGuestRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
