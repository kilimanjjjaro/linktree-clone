import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import db from '@/lib/database'
import authConfig from '@/lib/auth/auth.config'
import { getUserById } from '@/lib/services/getUserById'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user }) {
      if (user.id === undefined) return false

      const existingUser = await getUserById(user.id)

      if (existingUser?.emailVerified == null) return true

      return true
    },
    async session({ token, session }) {
      if (token.sub !== undefined && session.user !== null) {
        session.user.id = token.sub
      }

      return session
    }
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      })
    }
  },
  ...authConfig
})
