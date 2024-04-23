import { NextResponse } from 'next/server'
import db from '@/lib/database'

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    const existingUser = await db.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser != null) {
      return NextResponse.json('Email already used', { status: 409 })
    }

    await db.user.create({
      data: {
        name,
        email,
        password
      }
    })

    return NextResponse.json('User created', { status: 200 })
  } catch (error) {
    return NextResponse.json(error, {
      status: 400
    })
  }
}
