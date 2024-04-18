import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import prisma from '@/lib/database/prisma'

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json()

    const userExists = await prisma.user.findUnique({
      where: { email }
    })

    if (userExists !== null) {
      return NextResponse.json(
        { user: null, message: 'User already exists' },
        { status: 409 }
      )
    }

    const rawData = {
      email,
      username,
      password: await hash(password, 10)
    }

    const newUser = await prisma.user.create({
      data: rawData,
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json(
      { user: newUser, message: 'User created' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { user: null, message: 'Something has happened!' },
      { status: 500 }
    )
  }
}
