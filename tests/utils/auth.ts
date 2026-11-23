import { vi } from 'vitest'
import { USER_EMAIL, USER_ID, USER_NAME } from '../constants/unit'

export const authMock = {
  auth: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
  handlers: {}
}

export function mockSession(overrides: Record<string, unknown> = {}) {
  authMock.auth.mockResolvedValue({
    user: { id: USER_ID, name: USER_NAME, email: USER_EMAIL, ...overrides }
  })
}

export function mockNoSession() {
  authMock.auth.mockResolvedValue(null)
}
