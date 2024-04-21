import { PrismaClient } from '@prisma/client'

// Create a singleton function for Prisma Client
const prismaClientSingleton = () => {
  if (globalThis.prismaGlobal == null) {
    globalThis.prismaGlobal = new PrismaClient()
  }
  return globalThis.prismaGlobal
}

// Declare global variable prismaGlobal
declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined
}

// Export the Prisma Client instance
const db = prismaClientSingleton()

export default db
