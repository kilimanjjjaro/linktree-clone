import NextAuth from 'next-auth'
import Resend from 'next-auth/providers/resend'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: 'JymP6S0VNHLf1TyyyGOtxZC8yJU6PQlqLKxH7+Sn1Xk=',
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
    newUser: '/'
  },
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: 'hola@kilimanjjjaro.com'
    })
  ]
})
