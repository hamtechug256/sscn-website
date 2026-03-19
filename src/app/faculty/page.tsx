import { db } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import { User, Mail, Phone, BookOpen } from 'lucide-react'

// Force dynamic rendering for Netlify compatibility
export const dynamic = 'force-dynamic'

async function getActiveFaculty() {
  return db.faculty.findMany({
    where: { active: true },
    orderBy: [{ order: 'asc' }, { name: 'asc' }]
  })
}

export default async function FacultyPage() {
  const faculty = await getActiveFaculty()
  
  // Group by department
  const departments = faculty.reduce((acc, member) => {
    const dept = member.department || 'Administration'
    if (!acc[dept]) acc[dept] = []
    acc[dept].push(member)
    return acc
  }, {} as Record<string, typeof faculty>)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-rose-500 to-pink-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white mb-4">Our Team</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Faculty & Staff
              </h1>
              <p className="text-lg text-white/80">
                Meet our dedicated team of healthcare educators and professionals committed to excellence in nursing education
              </p>
            </div>
          </div>
        </section>

        {/* Faculty Directory */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {faculty.length === 0 ? (
              <Card className="p-8 text-center">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Faculty profiles coming soon.</p>
              </Card>
            ) : (
              <div className="space-y-12">
                {Object.entries(departments).map(([department, members]) => (
                  <div key={department}>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-rose-500" />
                      {department}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {members.map((member) => (
                        <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                          <div className="h-32 bg-gradient-to-br from-rose-500 to-pink-600 relative">
                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                              <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-lg">
                                {member.image ? (
                                  <img 
                                    src={member.image} 
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-rose-100">
                                    <span className="text-3xl font-bold text-rose-500">
                                      {member.name.charAt(0)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <CardContent className="pt-14 pb-4 text-center">
                            <h3 className="font-semibold text-lg">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.title}</p>
                            
                            <div className="flex justify-center gap-3 mt-4">
                              {member.email && (
                                <a 
                                  href={`mailto:${member.email}`}
                                  className="text-gray-400 hover:text-rose-500 transition-colors"
                                >
                                  <Mail className="w-4 h-4" />
                                </a>
                              )}
                              {member.phone && (
                                <a 
                                  href={`tel:${member.phone}`}
                                  className="text-gray-400 hover:text-rose-500 transition-colors"
                                >
                                  <Phone className="w-4 h-4" />
                                </a>
                              )}
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
