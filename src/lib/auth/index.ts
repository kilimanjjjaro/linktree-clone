import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import db from '@/lib/database'
import authConfig from '@/lib/auth/auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: 'JymP6S0VNHLf1TyyyGOtxZC8yJU6PQlqLKxH7',
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})
