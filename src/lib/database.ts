import { PrismaClient } from '@prisma/client'

export const runtime = 'edge'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const db = globalThis.prismaGlobal ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db
