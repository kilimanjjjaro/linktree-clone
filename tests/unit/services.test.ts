import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getViewableTree } from '@/lib/services/get-viewable-tree'
import { getTrees } from '@/lib/services/get-trees'
import { getUserByEmail } from '@/lib/services/get-user-by-email'
import { getUserById } from '@/lib/services/get-user-by-id'
import { getCurrentUser } from '@/lib/services/get-current-user'
import {
  getConfirmationTokenByEmail,
  getConfirmationTokenByToken
} from '@/lib/services/confirmation-token'
import {
  getPasswordResetTokenByEmail,
  getPasswordResetTokenByToken
} from '@/lib/services/password-reset-tokens'
import { sendConfirmationEmail } from '@/lib/services/send-confirmation-email'
import { sendPasswordResetEmail } from '@/lib/services/send-password-reset-email'
import { TREE_STATUS } from '@/lib/constants/trees'
import {
  BASE_URL,
  FIRST_ARGUMENT,
  FIRST_CALL,
  GMAIL_USER,
  TOKEN,
  USER_EMAIL,
  USER_ID
} from '../constants/unit'
import { databaseMock } from '../utils/database'
import { authMock, mockNoSession, mockSession } from '../utils/auth'
import { transporterMock } from '../utils/services'
import { createTree } from '../utils/trees'

vi.mock('@/lib/database', async () => ({
  default: (await import('../utils/database')).databaseMock
}))
vi.mock('@/lib/auth', async () => (await import('../utils/auth')).authMock)
vi.mock('@/lib/email', async () => ({
  transporter: (await import('../utils/services')).transporterMock
}))

const TREE_URL = 'example-tree'
const DATABASE_ERROR = new Error('down')

describe('getViewableTree', () => {
  it('only finds published trees for guests', async () => {
    const tree = createTree()
    databaseMock.tree.findFirst.mockResolvedValue(tree)

    expect(await getViewableTree(TREE_URL)).toBe(tree)
    expect(databaseMock.tree.findFirst).toHaveBeenCalledWith({
      where: { url: TREE_URL, OR: [{ status: TREE_STATUS.PUBLISHED }] },
      include: { links: true, socialProfiles: true }
    })
  })

  it('also finds the drafts of the viewer', async () => {
    databaseMock.tree.findFirst.mockResolvedValue(null)

    expect(await getViewableTree(TREE_URL, USER_ID)).toBeNull()
    expect(databaseMock.tree.findFirst).toHaveBeenCalledWith({
      where: {
        url: TREE_URL,
        OR: [{ status: TREE_STATUS.PUBLISHED }, { authorId: USER_ID }]
      },
      include: { links: true, socialProfiles: true }
    })
  })

  it('returns null when the database fails', async () => {
    databaseMock.tree.findFirst.mockRejectedValue(DATABASE_ERROR)

    expect(await getViewableTree(TREE_URL)).toBeNull()
  })
})

describe('getTrees', () => {
  it('lists the trees of the author by name', async () => {
    const trees = [createTree()]
    databaseMock.tree.findMany.mockResolvedValue(trees)

    expect(await getTrees(USER_ID)).toBe(trees)
    expect(databaseMock.tree.findMany).toHaveBeenCalledWith({
      where: { authorId: USER_ID },
      include: { links: true, socialProfiles: true },
      orderBy: { name: 'asc' }
    })
  })

  it('returns no trees when the database fails', async () => {
    databaseMock.tree.findMany.mockRejectedValue(DATABASE_ERROR)

    expect(await getTrees(USER_ID)).toEqual([])
  })
})

describe('database lookups', () => {
  it.each([
    {
      name: 'getUserByEmail',
      lookup: async () => await getUserByEmail(USER_EMAIL),
      method: databaseMock.user.findUnique,
      query: { where: { email: USER_EMAIL } }
    },
    {
      name: 'getUserById',
      lookup: async () => await getUserById(USER_ID),
      method: databaseMock.user.findUnique,
      query: { where: { id: USER_ID }, include: { trees: true } }
    },
    {
      name: 'getConfirmationTokenByEmail',
      lookup: async () => await getConfirmationTokenByEmail(USER_EMAIL),
      method: databaseMock.confirmationToken.findFirst,
      query: { where: { email: USER_EMAIL } }
    },
    {
      name: 'getConfirmationTokenByToken',
      lookup: async () => await getConfirmationTokenByToken(TOKEN),
      method: databaseMock.confirmationToken.findUnique,
      query: { where: { token: TOKEN } }
    },
    {
      name: 'getPasswordResetTokenByEmail',
      lookup: async () => await getPasswordResetTokenByEmail(USER_EMAIL),
      method: databaseMock.passwordResetToken.findFirst,
      query: { where: { email: USER_EMAIL } }
    },
    {
      name: 'getPasswordResetTokenByToken',
      lookup: async () => await getPasswordResetTokenByToken(TOKEN),
      method: databaseMock.passwordResetToken.findUnique,
      query: { where: { token: TOKEN } }
    }
  ])(
    '$name returns the record or null on errors',
    async ({ lookup, method, query }) => {
      const record = { id: USER_ID }
      method.mockResolvedValueOnce(record).mockRejectedValueOnce(DATABASE_ERROR)

      expect(await lookup()).toBe(record)
      expect(method).toHaveBeenCalledWith(query)
      expect(await lookup()).toBeNull()
    }
  )
})

describe('getCurrentUser', () => {
  it('returns the user of the session', async () => {
    mockSession()

    expect(await getCurrentUser()).toMatchObject({ id: USER_ID })
  })

  it('returns null without a session', async () => {
    mockNoSession()

    expect(await getCurrentUser()).toBeNull()
  })

  it('returns null for sessions without a user', async () => {
    authMock.auth.mockResolvedValue({})

    expect(await getCurrentUser()).toBeNull()
  })
})

describe('emails', () => {
  beforeEach(() => {
    vi.stubEnv('GMAIL_USER', GMAIL_USER)
  })

  it.each([
    {
      name: 'sendConfirmationEmail',
      send: sendConfirmationEmail,
      subject: 'Confirm your account of Linktree Clone',
      link: `${BASE_URL}/confirm-account?token=${TOKEN}`
    },
    {
      name: 'sendPasswordResetEmail',
      send: sendPasswordResetEmail,
      subject: 'Reset your password of Linktree Clone',
      link: `${BASE_URL}/new-password?token=${TOKEN}`
    }
  ])(
    '$name sends the link from the gmail account',
    async ({ send, subject, link }) => {
      await send({ email: USER_EMAIL, token: TOKEN })

      const mail =
        transporterMock.sendMail.mock.calls[FIRST_CALL][FIRST_ARGUMENT]
      expect(mail).toMatchObject({
        from: `Linktree Clone <${GMAIL_USER}>`,
        to: USER_EMAIL,
        subject
      })
      expect(mail.html).toContain(`href="${link}"`)
      expect(mail.text).toContain(link)
    }
  )
})
