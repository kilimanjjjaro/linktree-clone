import { vi } from 'vitest'

function createModelMock() {
  return {
    findUnique: vi.fn(),
    findUniqueOrThrow: vi.fn(),
    findFirst: vi.fn(),
    findFirstOrThrow: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    upsert: vi.fn(),
    delete: vi.fn(),
    deleteMany: vi.fn()
  }
}

export const databaseMock = {
  user: createModelMock(),
  confirmationToken: createModelMock(),
  passwordResetToken: createModelMock(),
  tree: createModelMock(),
  treeLink: createModelMock(),
  treeSocialProfile: createModelMock(),
  $transaction: vi.fn(
    async (callback: (tx: unknown) => Promise<unknown>) =>
      await callback(databaseMock)
  )
}
