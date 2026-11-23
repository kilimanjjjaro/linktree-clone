import { describe, expect, it, vi } from 'vitest'
import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import {
  OTHER_PASSWORD,
  TEST_BCRYPT_ROUNDS,
  USER_EMAIL,
  USER_ID,
  USER_PASSWORD
} from '../constants/unit'
import { databaseMock } from '../utils/database'

const nextAuth = vi.hoisted(() => ({ config: undefined as unknown }))

vi.mock('@/lib/database', async () => ({
  default: (await import('../utils/database')).databaseMock
}))
vi.mock('next-auth', () => ({
  default: (config: unknown) => {
    nextAuth.config = config
    return { handlers: {}, auth: vi.fn(), signIn: vi.fn(), signOut: vi.fn() }
  }
}))
vi.mock('next-auth/providers/credentials', () => ({
  default: (options: object) => ({ id: 'credentials', options })
}))

await import('@/lib/auth')

const config = nextAuth.config as NextAuthConfig
const callbacks = config.callbacks as Required<
  NonNullable<NextAuthConfig['callbacks']>
>
const events = config.events as Required<NonNullable<NextAuthConfig['events']>>

interface CredentialsProvider {
  id: string
  options: { authorize: (credentials: unknown) => Promise<unknown> }
}

const credentials = (config.providers as unknown[]).find(
  (provider) => (provider as CredentialsProvider).id === 'credentials'
) as CredentialsProvider

async function authorize(email: string, password: string) {
  return await credentials.options.authorize({ email, password })
}

async function createUser(overrides: Record<string, unknown> = {}) {
  return {
    id: USER_ID,
    email: USER_EMAIL,
    emailVerified: new Date(),
    password: await bcrypt.hash(USER_PASSWORD, TEST_BCRYPT_ROUNDS),
    ...overrides
  }
}

function signIn(user: object, provider: string) {
  return callbacks.signIn({
    user,
    account: { provider, type: 'oauth', providerAccountId: USER_ID }
  } as never)
}

describe('auth config', () => {
  it('uses jwt sessions, the prisma adapter and the oauth providers', () => {
    expect(config.session).toEqual({ strategy: 'jwt' })
    expect(config.adapter).toBeDefined()
    expect(
      (config.providers as Array<{ id: string }>).map((provider) => provider.id)
    ).toEqual(['google', 'github', 'credentials'])
  })
})

describe('credentials authorize', () => {
  it('returns the user when the password matches', async () => {
    const user = await createUser()
    databaseMock.user.findUnique.mockResolvedValue(user)

    expect(await authorize(USER_EMAIL, USER_PASSWORD)).toBe(user)
    expect(databaseMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: USER_EMAIL }
    })
  })

  it('rejects a wrong password', async () => {
    databaseMock.user.findUnique.mockResolvedValue(await createUser())

    expect(await authorize(USER_EMAIL, OTHER_PASSWORD)).toBeNull()
  })

  it('rejects users without a password', async () => {
    databaseMock.user.findUnique.mockResolvedValue(
      await createUser({ password: null })
    )

    expect(await authorize(USER_EMAIL, USER_PASSWORD)).toBeNull()
  })

  it('rejects invalid credentials without querying the database', async () => {
    expect(await authorize('nope', USER_PASSWORD)).toBeNull()
    expect(databaseMock.user.findUnique).not.toHaveBeenCalled()
  })
})

describe('signIn callback', () => {
  it('rejects users without an id', async () => {
    expect(await signIn({}, 'google')).toBe(false)
  })

  it('allows oauth users', async () => {
    expect(await signIn({ id: USER_ID }, 'github')).toBe(true)
    expect(databaseMock.user.findUnique).not.toHaveBeenCalled()
  })

  it('requires a verified email for credentials', async () => {
    databaseMock.user.findUnique.mockResolvedValueOnce(
      await createUser({ emailVerified: null })
    )
    databaseMock.user.findUnique.mockResolvedValueOnce(await createUser())

    expect(await signIn({ id: USER_ID }, 'credentials')).toBe(false)
    expect(await signIn({ id: USER_ID }, 'credentials')).toBe(true)
  })
})

describe('session callback', () => {
  it('adds the user id from the token', async () => {
    const session = await callbacks.session({
      session: { user: { email: USER_EMAIL } },
      token: { sub: USER_ID }
    } as never)

    expect(session.user).toEqual({ email: USER_EMAIL, id: USER_ID })
  })
})

describe('linkAccount event', () => {
  it('marks the email of the linked user as verified', async () => {
    await events.linkAccount({ user: { id: USER_ID } } as never)

    expect(databaseMock.user.update).toHaveBeenCalledWith({
      where: { id: USER_ID },
      data: { emailVerified: expect.any(Date) }
    })
  })
})
