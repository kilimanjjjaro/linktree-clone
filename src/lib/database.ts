import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prismaClientSingleton = () => {
  const neon = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaNeon(neon)

  return new PrismaClient({ adapter })
}

const db = globalThis.prismaGlobal ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db
