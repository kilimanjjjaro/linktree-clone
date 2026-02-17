import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import db from '@/lib/database'
import authConfig from '@/lib/auth/auth.config'
import { getUserById } from '@/lib/services/get-user-by-id'
import { LogInSchema } from '@/lib/schemas/auth'

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    ...authConfig.providers,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LogInSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await db.user.findUnique({
            where: {
              email
            }
          })

          if (user?.password == null) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return user
        }

        return null
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (user.id === undefined) return false

      if (account?.provider === 'credentials') {
        const existingUser = await getUserById(user.id)

        if (existingUser?.emailVerified == null) return false

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
  }
})
