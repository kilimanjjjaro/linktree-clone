import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

export default {
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true
    }),
    GitHub({
      allowDangerousEmailAccountLinking: true
    })
  ]
} satisfies NextAuthConfig
