import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { NewsForm } from '@/components/admin/NewsForm'

async function getNews(id: string) {
  return db.news.findUnique({
    where: { id }
  })
}

export default async function EditNewsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const news = await getNews(id)

  if (!news) {
    notFound()
  }

  return <NewsForm news={news} />
}
