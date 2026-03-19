import { db } from '@/lib/db'

// Force dynamic rendering for Netlify compatibility
export const dynamic = 'force-dynamic'
import { notFound } from 'next/navigation'
import { HeroSlideForm } from '@/components/admin/HeroSlideForm'

async function getHeroSlide(id: string) {
  return db.heroSlide.findUnique({
    where: { id }
  })
}

export default async function EditHeroSlidePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const slide = await getHeroSlide(id)
  
  if (!slide) {
    notFound()
  }

  return <HeroSlideForm slide={slide} />
}
