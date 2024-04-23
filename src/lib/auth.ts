import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import db from './database'

export const {
  handlers: { POST, GET },
  signIn,
  signOut,
  auth
} = NextAuth({
  secret: 'JymP6S0VNHLf1TyyyGOtxZC8yJU6PQlqLKxH7',
  adapter: PrismaAdapter(db),
  providers: [Google, GitHub]
})
