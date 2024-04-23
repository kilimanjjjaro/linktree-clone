import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { SignUpSchema } from '@/lib/schemas/auth'
import db from '@/lib/database'

export async function POST(request: Request) {
  const rawData = await request.json()

  const validatedFields = SignUpSchema.safeParse({
    name: rawData.name,
    email: rawData.email,
    password: rawData.password,
    confirmPassword: rawData.confirmPassword
  })

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!'
    }
  }

  const { name, email, password, confirmPassword } = validatedFields.data

  if (password !== confirmPassword) {
    return {
      error: 'Passwords must be equal.',
      success: ''
    }
  }

  const existingUser = await db.user.findUnique({
    where: {
      email
    }
  })

  if (existingUser != null) {
    return {
      error: 'Email already in use',
      success: ''
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  return NextResponse.json(newUser, { status: 200 })
}
