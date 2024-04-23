import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import db from '@/lib/database'
import { LogInSchema } from '@/lib/schemas/auth'

export const {
  handlers: { POST, GET },
  signIn,
  signOut,
  auth
} = NextAuth({
  secret: 'JymP6S0VNHLf1TyyyGOtxZC8yJU6PQlqLKxH7',
  adapter: PrismaAdapter(db),
  providers: [
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
    }),
    Google,
    GitHub
  ]
})
