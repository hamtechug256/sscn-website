import { db } from '@/lib/db'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'

async function getPublishedEvents() {
  const now = new Date()
  const upcoming = db.event.findMany({
    where: { 
      published: true,
      date: { gte: now }
    },
    orderBy: { date: 'asc' }
  })
  const past = db.event.findMany({
    where: { 
      published: true,
      date: { lt: now }
    },
    orderBy: { date: 'desc' },
    take: 6
  })
  return { upcoming: await upcoming, past: await past }
}

export default async function EventsPage() {
  const { upcoming, past } = await getPublishedEvents()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-500 to-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white mb-4">Events Calendar</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Events & Activities
              </h1>
              <p className="text-lg text-white/80">
                Stay updated with upcoming events, ceremonies, workshops, and activities at SSCN
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
            {upcoming.length === 0 ? (
              <Card className="p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No upcoming events scheduled at the moment.</p>
                <p className="text-sm text-gray-400 mt-2">Check back later for updates!</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((event) => (
                  <Link key={event.id} href={`/events/${event.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-lg transition-all h-full border-l-4 border-l-green-500">
                      {event.image ? (
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="h-40 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                          <Calendar className="w-12 h-12 text-green-300" />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <Badge className="bg-green-500 text-white mb-2">Upcoming</Badge>
                        <h3 className="font-semibold mb-2 group-hover:text-green-600 transition-colors">
                          {event.title}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {new Date(event.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          {event.time && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              {event.time}
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Past Events */}
        {past.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Past Events</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {past.map((event) => (
                  <Card key={event.id} className="overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2">Past Event</Badge>
                      <h3 className="font-semibold mb-2">{event.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
