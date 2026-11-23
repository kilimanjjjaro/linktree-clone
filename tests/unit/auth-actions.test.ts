import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import bcrypt from 'bcryptjs'
import { AuthError, CredentialsSignin } from 'next-auth'
import { signUpWithEmail } from '@/lib/actions/auth/signup-with-email'
import { logInWithEmail } from '@/lib/actions/auth/login-with-email'
import { resetPassword } from '@/lib/actions/auth/reset-password'
import { newPassword } from '@/lib/actions/auth/new-password'
import { verifyConfirmationToken } from '@/lib/actions/auth/verifyConfirmationToken'
import { deleteAccount } from '@/lib/actions/auth/delete-account'
import {
  AVATAR_ASSET_URL,
  AVATAR_PUBLIC_ID,
  APP_ASSET_URL,
  BACKGROUND_ASSET_URL,
  BACKGROUND_PUBLIC_ID,
  BASE_URL,
  FIRST_ARGUMENT,
  FIRST_CALL,
  GMAIL_USER,
  LINK_IMAGE_ASSET_URL,
  LINK_IMAGE_PUBLIC_ID,
  OLD_TOKEN_ID,
  ONE_HOUR_MS,
  OTHER_PASSWORD,
  SHORT_PASSWORD,
  SINGLE_CALL,
  TEST_BCRYPT_ROUNDS,
  TOKEN,
  TOKEN_ID,
  USER_EMAIL,
  USER_ID,
  USER_NAME,
  USER_PASSWORD
} from '../constants/unit'
import { databaseMock } from '../utils/database'
import { authMock, mockNoSession, mockSession } from '../utils/auth'
import {
  cloudinaryMock,
  revalidateTagMock,
  transporterMock
} from '../utils/services'
import { createFormData } from '../utils/forms'
import { createLink, createTree } from '../utils/trees'

vi.mock('@/lib/database', async () => ({
  default: (await import('../utils/database')).databaseMock
}))
vi.mock('@/lib/auth', async () => (await import('../utils/auth')).authMock)
vi.mock('@/lib/email', async () => ({
  transporter: (await import('../utils/services')).transporterMock
}))
vi.mock('@/lib/cloudinary', async () => ({
  cloudinary: (await import('../utils/services')).cloudinaryMock
}))
vi.mock('next/cache', async () => ({
  revalidateTag: (await import('../utils/services')).revalidateTagMock
}))

const FUTURE = () => new Date(Date.now() + ONE_HOUR_MS)
const PAST = () => new Date(Date.now() - ONE_HOUR_MS)

async function createUser(overrides: Record<string, unknown> = {}) {
  return {
    id: USER_ID,
    name: USER_NAME,
    email: USER_EMAIL,
    emailVerified: new Date(),
    password: await bcrypt.hash(USER_PASSWORD, TEST_BCRYPT_ROUNDS),
    image: AVATAR_ASSET_URL,
    ...overrides
  }
}

function createToken(overrides: Record<string, unknown> = {}) {
  return {
    id: TOKEN_ID,
    email: USER_EMAIL,
    token: TOKEN,
    expires_at: FUTURE(),
    ...overrides
  }
}

function sentMail() {
  return transporterMock.sendMail.mock.calls[FIRST_CALL][FIRST_ARGUMENT]
}

beforeEach(() => {
  vi.stubEnv('GMAIL_USER', GMAIL_USER)
  vi.spyOn(console, 'error').mockImplementation(() => {})
  databaseMock.confirmationToken.create.mockImplementation(
    async ({ data }) => ({ id: TOKEN_ID, ...data })
  )
  databaseMock.passwordResetToken.create.mockImplementation(
    async ({ data }) => ({ id: TOKEN_ID, ...data })
  )
})

describe('signUpWithEmail', () => {
  const form = {
    name: USER_NAME,
    email: USER_EMAIL,
    password: USER_PASSWORD,
    'confirm-password': USER_PASSWORD
  }

  it('returns the first validation error and keeps the fields', async () => {
    const result = await signUpWithEmail(
      null,
      createFormData({ ...form, name: '' })
    )

    expect(result).toEqual({
      error: 'Name is required',
      success: '',
      fields: { name: '', email: USER_EMAIL }
    })
  })

  it('requires both passwords to match', async () => {
    const result = await signUpWithEmail(
      null,
      createFormData({ ...form, 'confirm-password': OTHER_PASSWORD })
    )

    expect(result.error).toBe('Passwords must be equal.')
    expect(databaseMock.user.create).not.toHaveBeenCalled()
  })

  it('rejects an email that is already used', async () => {
    databaseMock.user.findUnique.mockResolvedValue(await createUser())

    const result = await signUpWithEmail(null, createFormData(form))

    expect(result.error).toBe('Email already used.')
    expect(databaseMock.user.create).not.toHaveBeenCalled()
  })

  it('creates the user with a hashed password and sends the confirmation link', async () => {
    databaseMock.user.findUnique.mockResolvedValue(null)
    databaseMock.confirmationToken.findFirst.mockResolvedValue(null)

    const result = await signUpWithEmail(null, createFormData(form))

    expect(result).toEqual({
      success: 'Link confirmation was sent.',
      error: ''
    })

    const { data } =
      databaseMock.user.create.mock.calls[FIRST_CALL][FIRST_ARGUMENT]
    expect(data.name).toBe(USER_NAME)
    expect(data.email).toBe(USER_EMAIL)
    expect(await bcrypt.compare(USER_PASSWORD, data.password)).toBe(true)

    const { data: token } =
      databaseMock.confirmationToken.create.mock.calls[FIRST_CALL][
        FIRST_ARGUMENT
      ]
    expect(token.email).toBe(USER_EMAIL)
    expect(token.expires_at.getTime()).toBeGreaterThan(Date.now())

    const mail = sentMail()
    expect(mail.to).toBe(USER_EMAIL)
    expect(mail.from).toBe(`Linktree Clone <${GMAIL_USER}>`)
    expect(mail.html).toContain(
      `${BASE_URL}/confirm-account?token=${token.token}`
    )
    expect(mail.text).toContain(
      `${BASE_URL}/confirm-account?token=${token.token}`
    )
  })

  it('replaces a previous confirmation token', async () => {
    databaseMock.user.findUnique.mockResolvedValue(null)
    databaseMock.confirmationToken.findFirst.mockResolvedValue(
      createToken({ id: OLD_TOKEN_ID })
    )

    await signUpWithEmail(null, createFormData(form))

    expect(databaseMock.confirmationToken.delete).toHaveBeenCalledWith({
      where: { id: OLD_TOKEN_ID }
    })
  })

  it('reports unexpected errors', async () => {
    databaseMock.user.findUnique.mockRejectedValue(new Error('down'))

    const result = await signUpWithEmail(null, createFormData(form))

    expect(result.error).toBe('Something went wrong.')
  })
})

describe('logInWithEmail', () => {
  const form = { email: USER_EMAIL, password: USER_PASSWORD }

  it('returns the first validation error and keeps the email', async () => {
    const result = await logInWithEmail(
      null,
      createFormData({ ...form, password: '' })
    )

    expect(result).toEqual({
      error: 'Password is required',
      success: '',
      fields: { email: USER_EMAIL }
    })
  })

  it('rejects unknown users', async () => {
    databaseMock.user.findUnique.mockResolvedValue(null)

    const result = await logInWithEmail(null, createFormData(form))

    expect(result.error).toBe('User not found.')
    expect(authMock.signIn).not.toHaveBeenCalled()
  })

  it('asks users without a password to use their provider', async () => {
    databaseMock.user.findUnique.mockResolvedValue(
      await createUser({ password: null })
    )

    const result = await logInWithEmail(null, createFormData(form))

    expect(result.error).toBe('Please, use your provider account.')
    expect(authMock.signIn).not.toHaveBeenCalled()
  })

  it('sends the confirmation link again to unverified users', async () => {
    databaseMock.user.findUnique.mockResolvedValue(
      await createUser({ emailVerified: null })
    )
    databaseMock.confirmationToken.findFirst.mockResolvedValue(null)

    const result = await logInWithEmail(null, createFormData(form))

    expect(result).toEqual({
      success: 'Link confirmation was sent again.',
      error: ''
    })
    expect(sentMail().to).toBe(USER_EMAIL)
    expect(authMock.signIn).not.toHaveBeenCalled()
  })

  it('signs in verified users with their credentials', async () => {
    databaseMock.user.findUnique.mockResolvedValue(await createUser())

    const result = await logInWithEmail(null, createFormData(form))

    expect(authMock.signIn).toHaveBeenCalledWith('credentials', {
      email: USER_EMAIL,
      password: USER_PASSWORD,
      redirectTo: '/'
    })
    expect(result).toEqual({ success: 'Logged in.', error: '' })
  })

  it('reports invalid credentials', async () => {
    databaseMock.user.findUnique.mockResolvedValue(await createUser())
    authMock.signIn.mockRejectedValue(new CredentialsSignin())

    const result = await logInWithEmail(null, createFormData(form))

    expect(result.error).toBe('Invalid credentials.')
  })

  it('reports other auth errors', async () => {
    databaseMock.user.findUnique.mockResolvedValue(await createUser())
    authMock.signIn.mockRejectedValue(new AuthError())

    const result = await logInWithEmail(null, createFormData(form))

    expect(result.error).toBe('Something went wrong.')
  })

  it('rethrows the redirect after signing in', async () => {
    const redirect = new Error('NEXT_REDIRECT')
    databaseMock.user.findUnique.mockResolvedValue(await createUser())
    authMock.signIn.mockRejectedValue(redirect)

    await expect(logInWithEmail(null, createFormData(form))).rejects.toBe(
      redirect
    )
  })
})

describe('resetPassword', () => {
  it('requires a valid email', async () => {
    const result = await resetPassword(null, createFormData({ email: 'nope' }))

    expect(result).toEqual({ error: 'Invalid email.', success: '' })
  })

  it('rejects unknown users', async () => {
    databaseMock.user.findUnique.mockResolvedValue(null)

    const result = await resetPassword(
      null,
      createFormData({ email: USER_EMAIL })
    )

    expect(result.error).toBe('User not found.')
    expect(transporterMock.sendMail).not.toHaveBeenCalled()
  })

  it('sends the reset link and replaces a previous one', async () => {
    databaseMock.user.findUnique.mockResolvedValue(await createUser())
    databaseMock.passwordResetToken.findFirst.mockResolvedValue(
      createToken({ id: OLD_TOKEN_ID })
    )

    const result = await resetPassword(
      null,
      createFormData({ email: USER_EMAIL })
    )

    expect(result).toEqual({ success: 'Reset password email sent.', error: '' })
    expect(databaseMock.passwordResetToken.delete).toHaveBeenCalledWith({
      where: { id: OLD_TOKEN_ID }
    })

    const { data: token } =
      databaseMock.passwordResetToken.create.mock.calls[FIRST_CALL][
        FIRST_ARGUMENT
      ]
    expect(sentMail().to).toBe(USER_EMAIL)
    expect(sentMail().html).toContain(
      `${BASE_URL}/new-password?token=${token.token}`
    )
  })

  it('reports email errors', async () => {
    databaseMock.user.findUnique.mockResolvedValue(await createUser())
    transporterMock.sendMail.mockRejectedValue(new Error('smtp'))

    const result = await resetPassword(
      null,
      createFormData({ email: USER_EMAIL })
    )

    expect(result.error).toBe('Something went wrong.')
  })
})

describe('newPassword', () => {
  const state = { success: '', error: '', token: TOKEN }
  const form = { password: OTHER_PASSWORD, 'confirm-password': OTHER_PASSWORD }

  it('requires valid passwords', async () => {
    const result = await newPassword(
      state,
      createFormData({
        password: SHORT_PASSWORD,
        'confirm-password': SHORT_PASSWORD
      })
    )

    expect(result.error).toBe('Invalid fields.')
  })

  it('requires both passwords to match', async () => {
    const result = await newPassword(
      state,
      createFormData({ ...form, 'confirm-password': USER_PASSWORD })
    )

    expect(result.error).toBe('Passwords must be equal.')
  })

  it('rejects unknown tokens', async () => {
    databaseMock.passwordResetToken.findUnique.mockResolvedValue(null)

    const result = await newPassword(state, createFormData(form))

    expect(result.error).toBe('Invalid link.')
  })

  it('rejects expired tokens', async () => {
    databaseMock.passwordResetToken.findUnique.mockResolvedValue(
      createToken({ expires_at: PAST() })
    )

    const result = await newPassword(state, createFormData(form))

    expect(result.error).toBe('Expired link.')
    expect(databaseMock.user.update).not.toHaveBeenCalled()
  })

  it('rejects tokens of deleted users', async () => {
    databaseMock.passwordResetToken.findUnique.mockResolvedValue(createToken())
    databaseMock.user.findUnique.mockResolvedValue(null)

    const result = await newPassword(state, createFormData(form))

    expect(result.error).toBe('User not found.')
  })

  it('saves the new hashed password and deletes the token', async () => {
    databaseMock.passwordResetToken.findUnique.mockResolvedValue(createToken())
    databaseMock.user.findUnique.mockResolvedValue(await createUser())

    const result = await newPassword(state, createFormData(form))

    expect(result).toEqual({
      success: 'Password updated.',
      error: '',
      token: ''
    })
    expect(databaseMock.passwordResetToken.findUnique).toHaveBeenCalledWith({
      where: { token: TOKEN }
    })

    const { where, data } =
      databaseMock.user.update.mock.calls[FIRST_CALL][FIRST_ARGUMENT]
    expect(where).toEqual({ id: USER_ID })
    expect(await bcrypt.compare(OTHER_PASSWORD, data.password)).toBe(true)
    expect(databaseMock.passwordResetToken.delete).toHaveBeenCalledWith({
      where: { id: TOKEN_ID }
    })
  })

  it('reports database errors', async () => {
    databaseMock.passwordResetToken.findUnique.mockResolvedValue(createToken())
    databaseMock.user.findUnique.mockResolvedValue(await createUser())
    databaseMock.user.update.mockRejectedValue(new Error('down'))

    const result = await newPassword(state, createFormData(form))

    expect(result.error).toBe('Something went wrong.')
  })
})

describe('verifyConfirmationToken', () => {
  const CONFIRMATION_DELAY_MS = 2000
  const ONE_MS = 1

  async function verify(token: string) {
    const result = verifyConfirmationToken(token)
    await vi.runAllTimersAsync()
    return await result
  }

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout'] })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.fails('answers after at least 2 seconds', async () => {
    databaseMock.confirmationToken.findUnique.mockResolvedValue(null)
    let answered = false

    const result = verifyConfirmationToken(TOKEN).then((value) => {
      answered = true
      return value
    })

    await vi.advanceTimersByTimeAsync(CONFIRMATION_DELAY_MS - ONE_MS)
    expect(answered).toBe(false)

    await vi.advanceTimersByTimeAsync(ONE_MS)
    await result
    expect(answered).toBe(true)
  })

  it('rejects unknown tokens', async () => {
    databaseMock.confirmationToken.findUnique.mockResolvedValue(null)

    expect(await verify(TOKEN)).toEqual({
      error: 'Invalid link',
      success: ''
    })
  })

  it('rejects expired tokens', async () => {
    databaseMock.confirmationToken.findUnique.mockResolvedValue(
      createToken({ expires_at: PAST() })
    )

    expect((await verify(TOKEN)).error).toBe('Expired link')
  })

  it('rejects tokens of deleted users', async () => {
    databaseMock.confirmationToken.findUnique.mockResolvedValue(createToken())
    databaseMock.user.findUnique.mockResolvedValue(null)

    expect((await verify(TOKEN)).error).toBe('Error')
  })

  it('verifies the email and deletes the token', async () => {
    databaseMock.confirmationToken.findUnique.mockResolvedValue(createToken())
    databaseMock.user.findUnique.mockResolvedValue(
      await createUser({ emailVerified: null })
    )

    expect(await verify(TOKEN)).toEqual({
      error: '',
      success: 'Account verified'
    })
    expect(databaseMock.user.update).toHaveBeenCalledWith({
      where: { id: USER_ID },
      data: { emailVerified: expect.any(Date) }
    })
    expect(databaseMock.confirmationToken.delete).toHaveBeenCalledWith({
      where: { id: TOKEN_ID }
    })
  })

  it('reports database errors', async () => {
    databaseMock.confirmationToken.findUnique.mockResolvedValue(createToken())
    databaseMock.user.findUnique.mockResolvedValue(await createUser())
    databaseMock.user.update.mockRejectedValue(new Error('down'))

    expect((await verify(TOKEN)).error).toBe('Error')
  })
})

describe('deleteAccount', () => {
  it('requires a session', async () => {
    mockNoSession()

    expect(await deleteAccount()).toEqual({
      error: 'Must log in to delete your account.',
      success: ''
    })
    expect(databaseMock.user.delete).not.toHaveBeenCalled()
  })

  it('deletes the uploaded images, the user and the session', async () => {
    mockSession({ image: AVATAR_ASSET_URL })
    const tree = createTree({
      avatar: APP_ASSET_URL,
      links: [
        createLink({ image: LINK_IMAGE_ASSET_URL }),
        createLink({ image: null })
      ]
    })
    tree.appearance.background.settings.url = BACKGROUND_ASSET_URL
    databaseMock.tree.findMany.mockResolvedValue([tree])

    const result = await deleteAccount()

    expect(result).toEqual({ error: '', success: 'Account deleted.' })
    expect(databaseMock.tree.findMany).toHaveBeenCalledWith({
      where: { authorId: USER_ID },
      include: { links: true }
    })
    expect(
      cloudinaryMock.uploader.destroy.mock.calls.map(
        (call) => call[FIRST_ARGUMENT]
      )
    ).toEqual([AVATAR_PUBLIC_ID, BACKGROUND_PUBLIC_ID, LINK_IMAGE_PUBLIC_ID])
    expect(databaseMock.user.delete).toHaveBeenCalledWith({
      where: { id: USER_ID }
    })
    expect(revalidateTagMock).toHaveBeenCalledWith('trees', 'max')
    expect(authMock.signOut).toHaveBeenCalledTimes(SINGLE_CALL)
    expect(authMock.signOut).toHaveBeenCalledWith({ redirect: false })
  })

  it('deletes the user even if an image cannot be deleted', async () => {
    mockSession({ image: AVATAR_ASSET_URL })
    databaseMock.tree.findMany.mockResolvedValue([])
    cloudinaryMock.uploader.destroy.mockRejectedValue(new Error('cloudinary'))

    const result = await deleteAccount()

    expect(result.success).toBe('Account deleted.')
    expect(databaseMock.user.delete).toHaveBeenCalledTimes(SINGLE_CALL)
  })

  it('reports database errors', async () => {
    mockSession()
    databaseMock.tree.findMany.mockRejectedValue(new Error('down'))

    expect((await deleteAccount()).error).toBe('Something went wrong.')
    expect(authMock.signOut).not.toHaveBeenCalled()
  })
})
