import { auth } from '@/lib/auth'

export default auth((req) => {
  const isLoggedIn = !(req.auth == null)

  console.log('IS_LOGGED: ', isLoggedIn)
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
