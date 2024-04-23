import { NextResponse } from 'next/server'
import db from '@/lib/database'

export const runtime = 'edge'

export async function POST(request: Request) {
  const { name, email, password } = await request.json()

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

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password
    }
  })

  return NextResponse.json(newUser, { status: 200 })
}
