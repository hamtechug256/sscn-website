import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get user ID from header (set by client)
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json(
        { user: null },
        { status: 200 }
      )
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        active: true
      }
    })

    if (!user || !user.active) {
      return NextResponse.json(
        { user: null },
        { status: 200 }
      )
    }

    return NextResponse.json({ user })

  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { user: null },
      { status: 200 }
    )
  }
}
