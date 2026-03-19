import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - List all hero slides
export async function GET() {
  try {
    const slides = await db.heroSlide.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(slides)
  } catch (error) {
    console.error('Failed to fetch hero slides:', error)
    return NextResponse.json({ error: 'Failed to fetch hero slides' }, { status: 500 })
  }
}

// POST - Create new hero slide
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, subtitle, badge, image, link, buttonText, order, active } = body

    if (!title || !image) {
      return NextResponse.json({ error: 'Title and image are required' }, { status: 400 })
    }

    // Get max order
    const maxOrder = await db.heroSlide.aggregate({
      _max: { order: true }
    })
    
    const slide = await db.heroSlide.create({
      data: {
        title,
        subtitle,
        badge,
        image,
        link,
        buttonText,
        order: order ?? (maxOrder._max.order ?? 0) + 1,
        active: active ?? true
      }
    })

    return NextResponse.json(slide, { status: 201 })
  } catch (error) {
    console.error('Failed to create hero slide:', error)
    return NextResponse.json({ error: 'Failed to create hero slide' }, { status: 500 })
  }
}
