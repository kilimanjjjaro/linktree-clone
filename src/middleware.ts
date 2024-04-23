import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import authConfig from '@/lib/auth/auth.config'
import {
  API_AUTH_PREFIX,
  AUTH_ROUTES,
  PUBLIC_ROUTE
} from '@/lib/constants/routes'

const { auth } = NextAuth(authConfig)

export default auth((request) => {
  const { nextUrl } = request
  const isLoggedIn = request.auth != null

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX)
  const isPublicRoute = nextUrl.pathname.startsWith(PUBLIC_ROUTE)
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)

  if (isApiAuthRoute) return NextResponse.next()

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(PUBLIC_ROUTE, nextUrl))
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL(AUTH_ROUTES[0], nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
