import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Get single hero slide
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const slide = await db.heroSlide.findUnique({
      where: { id }
    })
    
    if (!slide) {
      return NextResponse.json({ error: 'Slide not found' }, { status: 404 })
    }
    
    return NextResponse.json(slide)
  } catch (error) {
    console.error('Failed to fetch hero slide:', error)
    return NextResponse.json({ error: 'Failed to fetch hero slide' }, { status: 500 })
  }
}

// PUT - Update hero slide
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, subtitle, badge, image, link, buttonText, order, active } = body

    const slide = await db.heroSlide.update({
      where: { id },
      data: {
        title,
        subtitle,
        badge,
        image,
        link,
        buttonText,
        order,
        active
      }
    })

    return NextResponse.json(slide)
  } catch (error) {
    console.error('Failed to update hero slide:', error)
    return NextResponse.json({ error: 'Failed to update hero slide' }, { status: 500 })
  }
}

// DELETE - Delete hero slide
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.heroSlide.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete hero slide:', error)
    return NextResponse.json({ error: 'Failed to delete hero slide' }, { status: 500 })
  }
}
