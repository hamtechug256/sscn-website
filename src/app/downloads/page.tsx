import { db } from '@/lib/db'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import { Download, FileText, File } from 'lucide-react'

async function getPublishedDownloads() {
  return db.download.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  })
}

const categoryLabels: Record<string, string> = {
  'forms': 'Application Forms',
  'prospectus': 'Prospectus & Guides',
  'past-papers': 'Past Examination Papers',
  'policies': 'Policies & Guidelines',
  'general': 'General Resources'
}

export default async function DownloadsPage() {
  const downloads = await getPublishedDownloads()
  
  // Group by category
  const categories = downloads.reduce((acc, item) => {
    const cat = item.category || 'general'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {} as Record<string, typeof downloads>)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white mb-4">Downloads</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Resource Center
              </h1>
              <p className="text-lg text-white/80">
                Download application forms, prospectus, past papers, policies, and other important documents
              </p>
            </div>
          </div>
        </section>

        {/* Downloads by Category */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {downloads.length === 0 ? (
              <Card className="p-8 text-center">
                <Download className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No downloads available yet.</p>
              </Card>
            ) : (
              <div className="space-y-10">
                {Object.entries(categories).map(([category, items]) => (
                  <div key={category}>
                    <h2 className="text-2xl font-bold mb-4">
                      {categoryLabels[category] || category}
                    </h2>
                    <div className="grid gap-4">
                      {items.map((item) => (
                        <a
                          key={item.id}
                          href={item.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Card className="hover:shadow-lg hover:border-teal-300 transition-all group cursor-pointer">
                            <CardContent className="p-4 flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 transition-colors">
                                <FileText className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium group-hover:text-teal-600 transition-colors">
                                  {item.title}
                                </h3>
                                {item.description && (
                                  <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                                )}
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                  <span className="uppercase">{item.fileType || 'FILE'}</span>
                                  <span>•</span>
                                  <span>{item.downloads} downloads</span>
                                </div>
                              </div>
                              <Download className="w-5 h-5 text-gray-300 group-hover:text-teal-500 transition-colors flex-shrink-0" />
                            </CardContent>
                          </Card>
                        </a>
                      ))}
                    </div>
                  </div>
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
