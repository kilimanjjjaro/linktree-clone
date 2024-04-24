import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import authConfig from '@/lib/auth/auth.config'
import { AUTH_ROUTES } from '@/lib/constants/globals'

const { auth } = NextAuth(authConfig)

export default auth((request) => {
  const { nextUrl } = request
  const isLoggedIn = request.auth != null

  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth')
  const isPublicRoute = nextUrl.pathname.startsWith('/')
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)

  if (isApiAuthRoute) return NextResponse.next()

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/', nextUrl))
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
