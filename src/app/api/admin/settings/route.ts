import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Get all settings
export async function GET() {
  try {
    const settings = await db.setting.findMany()
    const settingsMap: Record<string, string> = {}
    settings.forEach(s => {
      settingsMap[s.key] = s.value
    })
    return NextResponse.json(settingsMap)
  } catch (error) {
    console.error('Failed to fetch settings:', error)
    return NextResponse.json({}, { status: 500 })
  }
}

// POST - Update settings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, value } = body

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    const setting = await db.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    })

    return NextResponse.json(setting)
  } catch (error) {
    console.error('Failed to update setting:', error)
    return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 })
  }
}

// PUT - Batch update settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const settings = body.settings // Array of { key, value }

    if (!Array.isArray(settings)) {
      return NextResponse.json({ error: 'Settings array is required' }, { status: 400 })
    }

    const updates = settings.map(({ key, value }) =>
      db.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      })
    )

    await Promise.all(updates)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
