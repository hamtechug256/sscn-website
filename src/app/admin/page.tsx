import { db } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Newspaper, 
  Calendar, 
  Image, 
  Users, 
  MessageSquare, 
  Download,
  TrendingUp,
  Eye,
  Clock,
  CheckCircle2
} from 'lucide-react'

// Force dynamic rendering for Netlify compatibility
export const dynamic = 'force-dynamic'

async function getStats() {
  const [
    newsCount,
    eventsCount,
    galleryCount,
    facultyCount,
    contactsCount,
    downloadsCount,
    unreadContacts,
    publishedNews
  ] = await Promise.all([
    db.news.count(),
    db.event.count(),
    db.galleryAlbum.count(),
    db.faculty.count(),
    db.contact.count(),
    db.download.count(),
    db.contact.count({ where: { status: 'unread' } }),
    db.news.count({ where: { published: true } })
  ])

  return {
    newsCount,
    eventsCount,
    galleryCount,
    facultyCount,
    contactsCount,
    downloadsCount,
    unreadContacts,
    publishedNews
  }
}

async function getRecentContacts() {
  return db.contact.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  })
}

async function getRecentNews() {
  return db.news.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } }
  })
}

async function getUpcomingEvents() {
  const now = new Date()
  return db.event.findMany({
    take: 5,
    where: {
      date: { gte: now },
      published: true
    },
    orderBy: { date: 'asc' }
  })
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const recentContacts = await getRecentContacts()
  const recentNews = await getRecentNews()
  const upcomingEvents = await getUpcomingEvents()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome to SSCN Administration Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">News Articles</CardTitle>
            <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-sky-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newsCount}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.publishedNews} published
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Events</CardTitle>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.eventsCount}</div>
            <p className="text-xs text-gray-500 mt-1">Upcoming events</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Gallery Albums</CardTitle>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Image className="w-5 h-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.galleryCount}</div>
            <p className="text-xs text-gray-500 mt-1">Photo albums</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Inquiries</CardTitle>
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contactsCount}</div>
            <p className="text-xs text-red-500 mt-1">
              {stats.unreadContacts} unread
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Faculty Members</CardTitle>
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-rose-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.facultyCount}</div>
            <p className="text-xs text-gray-500 mt-1">Staff profiles</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Downloads</CardTitle>
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <Download className="w-5 h-5 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.downloadsCount}</div>
            <p className="text-xs text-gray-500 mt-1">Resources available</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-sky-500" />
              Recent Inquiries
            </CardTitle>
            <CardDescription>Latest contact form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentContacts.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No inquiries yet</p>
            ) : (
              <div className="space-y-4">
                {recentContacts.map((contact) => (
                  <div key={contact.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-sm truncate">{contact.name}</p>
                        <Badge variant={contact.status === 'unread' ? 'destructive' : 'secondary'} className="text-xs">
                          {contact.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{contact.subject}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent News */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-green-500" />
              Recent News
            </CardTitle>
            <CardDescription>Latest published articles</CardDescription>
          </CardHeader>
          <CardContent>
            {recentNews.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No news yet</p>
            ) : (
              <div className="space-y-4">
                {recentNews.map((news) => (
                  <div key={news.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    {news.image ? (
                      <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                        <img src={news.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
                        <Newspaper className="w-6 h-6 text-sky-500" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">{news.title}</p>
                        <Badge variant={news.published ? 'default' : 'secondary'} className="text-xs">
                          {news.published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(news.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            Upcoming Events
          </CardTitle>
          <CardDescription>Events scheduled for the coming days</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">No upcoming events</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 rounded-lg border border-gray-200 hover:border-sky-300 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  {event.location && (
                    <p className="text-xs text-gray-500">{event.location}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you can perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/admin/news/new" className="p-4 rounded-lg border border-gray-200 hover:border-sky-300 hover:bg-sky-50 transition-all text-center">
              <Newspaper className="w-8 h-8 text-sky-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Add News</p>
            </a>
            <a href="/admin/events/new" className="p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all text-center">
              <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Add Event</p>
            </a>
            <a href="/admin/gallery/new" className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all text-center">
              <Image className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Add Album</p>
            </a>
            <a href="/admin/faculty/new" className="p-4 rounded-lg border border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-all text-center">
              <Users className="w-8 h-8 text-rose-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Add Faculty</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
