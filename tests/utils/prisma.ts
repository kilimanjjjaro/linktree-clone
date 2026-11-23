import { Prisma } from '@/generated/prisma/client'
import { CLIENT_VERSION } from '../constants/unit'

export function createPrismaError(code: string) {
  return new Prisma.PrismaClientKnownRequestError(code, {
    code,
    clientVersion: CLIENT_VERSION
  })
}
