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

    if (existingUser != null) throw new Error('Email already used')

    const response = await db.user.create({
      data: {
        name,
        email,
        password
      }
    })

    console.log('CREATE RESPONSE: ', response)

    return NextResponse.json('User created', { status: 200 })
  } catch (error: any) {
    console.log('API ERROR: ', error)

    return NextResponse.json(error.message, {
      status: 400
    })
  }
}
