import { db } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import { Microscope, FileText, Users, Calendar, ExternalLink } from 'lucide-react'

async function getPublishedResearch() {
  return db.research.findMany({
    where: { published: true },
    orderBy: [{ year: 'desc' }, { createdAt: 'desc' }]
  })
}

const categoryLabels: Record<string, string> = {
  'research': 'Research Projects',
  'project': 'Community Projects',
  'publication': 'Publications'
}

export default async function ResearchPage() {
  const research = await getPublishedResearch()
  
  // Group by category
  const categories = research.reduce((acc, item) => {
    const cat = item.category || 'research'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {} as Record<string, typeof research>)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white mb-4">Research</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Research & Publications
              </h1>
              <p className="text-lg text-white/80">
                Explore research projects, publications, and academic contributions from our faculty and students
              </p>
            </div>
          </div>
        </section>

        {/* Research Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {research.length === 0 ? (
              <Card className="p-8 text-center">
                <Microscope className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Research content coming soon.</p>
              </Card>
            ) : (
              <div className="space-y-10">
                {Object.entries(categories).map(([category, items]) => (
                  <div key={category}>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Microscope className="w-6 h-6 text-cyan-500" />
                      {categoryLabels[category] || category}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {items.map((item) => (
                        <Card key={item.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center flex-shrink-0">
                                <FileText className="w-6 h-6 text-cyan-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold mb-2">{item.title}</h3>
                                {item.authors && (
                                  <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                                    <Users className="w-3 h-3" />
                                    {Array.isArray(JSON.parse(item.authors)) 
                                      ? JSON.parse(item.authors).join(', ')
                                      : item.authors}
                                  </p>
                                )}
                                {item.abstract && (
                                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.abstract}</p>
                                )}
                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                  {item.year && (
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {item.year}
                                    </span>
                                  )}
                                  {item.file && (
                                    <a
                                      href={item.file}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700"
                                    >
                                      View Paper
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
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
