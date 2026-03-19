import { db } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import { BookOpen, ExternalLink, FileText, Video } from 'lucide-react'

// Force dynamic rendering for Netlify compatibility
export const dynamic = 'force-dynamic'

async function getLibraryResources() {
  return db.libraryResource.findMany({
    where: { available: true },
    orderBy: { title: 'asc' }
  })
}

const typeIcons: Record<string, typeof BookOpen> = {
  'book': BookOpen,
  'journal': FileText,
  'ebook': BookOpen,
  'video': Video
}

export default async function LibraryPage() {
  const resources = await getLibraryResources()
  
  // Group by type
  const types = resources.reduce((acc, item) => {
    const type = item.type || 'book'
    if (!acc[type]) acc[type] = []
    acc[type].push(item)
    return acc
  }, {} as Record<string, typeof resources>)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-500 to-orange-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white mb-4">Library</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Digital Library
              </h1>
              <p className="text-lg text-white/80">
                Access e-books, journals, research papers, and educational videos for nursing and midwifery students
              </p>
            </div>
          </div>
        </section>

        {/* Library Resources */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {resources.length === 0 ? (
              <Card className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Library resources coming soon.</p>
              </Card>
            ) : (
              <div className="space-y-10">
                {Object.entries(types).map(([type, items]) => {
                  const TypeIcon = typeIcons[type] || BookOpen
                  return (
                    <div key={type}>
                      <h2 className="text-2xl font-bold mb-4 capitalize flex items-center gap-2">
                        <TypeIcon className="w-6 h-6 text-amber-500" />
                        {type}s
                      </h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items.map((item) => (
                          <Card key={item.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                {item.cover ? (
                                  <div className="w-16 h-20 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                                  </div>
                                ) : (
                                  <div className="w-16 h-20 rounded bg-amber-100 flex items-center justify-center flex-shrink-0">
                                    <TypeIcon className="w-6 h-6 text-amber-500" />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium line-clamp-2">{item.title}</h3>
                                  {item.author && (
                                    <p className="text-sm text-gray-500">{item.author}</p>
                                  )}
                                  {item.category && (
                                    <Badge variant="outline" className="mt-2 text-xs">
                                      {item.category}
                                    </Badge>
                                  )}
                                  {item.link && (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 mt-2"
                                    >
                                      Access Resource
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                })}
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
