import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import db from '@/lib/database'
import authConfig from '@/lib/auth/auth.config'
import { getUserById } from '@/lib/services/get-user-by-id'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account }) {
      if (user.id === undefined) return false

      if (account?.provider === 'credentials') {
        const existingUser = await getUserById(user.id)

        if (existingUser?.emailVerified == null) return false

        // TODO: Add 2FA check

        return true
      }

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
