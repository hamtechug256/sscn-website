import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Get all active hero slides for public display
export async function GET() {
  try {
    const slides = await db.heroSlide.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    })
    
    return NextResponse.json(slides)
  } catch (error) {
    console.error('Failed to fetch hero slides:', error)
    return NextResponse.json([], { status: 200 }) // Return empty array on error
  }
}
