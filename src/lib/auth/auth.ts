import NextAuth from 'next-auth'
import Resend from 'next-auth/providers/resend'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { sendResendRequest } from './sendResendRequest'

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login'
  },
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: 'hola@kilimanjjjaro.com',
      async sendVerificationRequest(params) {
        await sendResendRequest({
          apiKey: params.provider.apiKey,
          from: params.provider.from,
          to: params.identifier,
          url: params.url
        })
      }
    })
  ]
})
