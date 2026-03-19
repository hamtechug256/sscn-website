import { db } from '@/lib/db'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import { Calendar, ArrowRight, Clock, User } from 'lucide-react'

// Force dynamic rendering for Netlify compatibility
export const dynamic = 'force-dynamic'

async function getPublishedNews() {
  return db.news.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 20
  })
}

export default async function NewsPage() {
  const news = await getPublishedNews()
  const featuredNews = news.filter(n => n.featured)
  const regularNews = news.filter(n => !n.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-sky-500 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white mb-4">News & Updates</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Stay Informed
              </h1>
              <p className="text-lg text-white/80">
                Latest news, announcements, and updates from Soroti School of Comprehensive Nursing
              </p>
            </div>
          </div>
        </section>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Featured Stories</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredNews.slice(0, 2).map((article) => (
                  <Link key={article.id} href={`/news/${article.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-xl transition-all h-full">
                      {article.image && (
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Badge className="bg-amber-500 text-white">Featured</Badge>
                          <Calendar className="w-4 h-4" />
                          {new Date(article.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-sky-600 transition-colors">
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="text-gray-600 line-clamp-2">{article.excerpt}</p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All News */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">All News</h2>
            {news.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No news articles available yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularNews.map((article) => (
                  <Link key={article.id} href={`/news/${article.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-lg transition-all h-full">
                      {article.image ? (
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="h-40 bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center">
                          <Calendar className="w-12 h-12 text-sky-300" />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <Badge variant="outline" className="capitalize">{article.category}</Badge>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(article.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
