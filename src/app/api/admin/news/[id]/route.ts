import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Get single news article
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const news = await db.news.findUnique({
      where: { id },
      include: {
        author: {
          select: { name: true }
        }
      }
    })

    if (!news) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 })
    }

    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

// PUT - Update news article
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, slug, content, excerpt, image, category, featured, published } = body

    const news = await db.news.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt,
        image,
        category,
        featured,
        published
      }
    })

    return NextResponse.json(news)
  } catch (error) {
    console.error('Failed to update news:', error)
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 })
  }
}

// DELETE - Delete news article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.news.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete news:', error)
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 })
  }
}
