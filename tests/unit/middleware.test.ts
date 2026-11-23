import { describe, expect, it, vi } from 'vitest'
import middleware, { config } from '@/middleware'
import { BASE_URL, USER_ID } from '../constants/unit'
import MIDDLEWARE_CASES from '../constants/middleware-cases.json'

vi.mock('next-auth', () => ({
  default: () => ({ auth: (handler: unknown) => handler })
}))

type Handler = (request: { nextUrl: URL; auth: object | null }) => Response

const REDIRECT_STATUS = 307

function run(path: string, loggedIn: boolean) {
  return (middleware as unknown as Handler)({
    nextUrl: new URL(path, BASE_URL),
    auth: loggedIn ? { user: { id: USER_ID } } : null
  })
}

describe('middleware', () => {
  it.each(MIDDLEWARE_CASES)(
    '$path when logged in is $loggedIn redirects to $redirect',
    ({ path, loggedIn, redirect }) => {
      const response = run(path, loggedIn)

      if (redirect === null) {
        expect(response.headers.get('x-middleware-next')).toBe('1')
        return
      }

      expect(response.status).toBe(REDIRECT_STATUS)
      expect(response.headers.get('location')).toBe(
        new URL(redirect, BASE_URL).toString()
      )
    }
  )

  it('runs on pages and api routes but not on static files', () => {
    expect(config.matcher).toEqual([
      '/((?!.*\\..*|_next).*)',
      '/',
      '/(api|trpc)(.*)'
    ])
  })
})
