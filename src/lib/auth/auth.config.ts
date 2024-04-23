import bcrypt from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import type { NextAuthConfig } from 'next-auth'
import db from '@/lib/database'
import { LogInSchema } from '@/lib/schemas/auth'

export default {
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
} satisfies NextAuthConfig
