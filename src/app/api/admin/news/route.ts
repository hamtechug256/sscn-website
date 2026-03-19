import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - List all news
export async function GET() {
  try {
    const news = await db.news.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { name: true }
        }
      }
    })
    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

// POST - Create new news article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, content, excerpt, image, category, featured, published } = body

    const news = await db.news.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        image,
        category,
        featured: featured || false,
        published: published || false
      }
    })

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    console.error('Failed to create news:', error)
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 })
  }
}
