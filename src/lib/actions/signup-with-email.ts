'use server'

import { z } from 'zod'
import { hash } from 'bcrypt'
import db from '@/lib/database/prisma'

const SignUpWithEmailScheme = z.object({
  email: z.string().email(),
  username: z.string().min(4),
  password: z.string().min(6)
})

export async function signUpWithEmail(prevState: any, formData: FormData) {
  try {
    const { email, username, password } = SignUpWithEmailScheme.parse({
      email: formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password')
    })

    const userExists = await db.user.findUnique({
      where: { email }
    })

    if (userExists !== null) {
      return {
        message: 'User already exists',
        success: false,
        error: true
      }
    }

    const rawData = {
      email,
      username,
      password: await hash(password, 10)
    }

    await db.user.create({
      data: rawData,
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return {
      message: 'User created',
      success: true,
      error: false
    }
  } catch (error) {
    console.error(error)
  }
}
