import { db } from '@/lib/db'

// Force dynamic rendering for Netlify compatibility
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Megaphone, AlertTriangle, AlertCircle, Info } from 'lucide-react'

async function getAnnouncements() {
  return db.announcement.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export default async function AnnouncementsAdminPage() {
  const announcements = await getAnnouncements()
  const active = announcements.filter(a => a.active)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-500">Manage important notices and alerts</p>
        </div>
        <Link href="/admin/announcements/new">
          <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Announcement
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{announcements.length}</div>
            <p className="text-sm text-gray-500">Total Announcements</p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{active.length}</div>
            <p className="text-sm text-green-600">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">
              {announcements.filter(a => a.priority === 'urgent').length}
            </div>
            <p className="text-sm text-gray-500">Urgent</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          {announcements.length === 0 ? (
            <div className="text-center py-12">
              <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements yet</h3>
              <Link href="/admin/announcements/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Announcement
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Card 
                  key={announcement.id} 
                  className={`${
                    announcement.priority === 'urgent' ? 'border-l-4 border-l-red-500' :
                    announcement.priority === 'high' ? 'border-l-4 border-l-amber-500' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          announcement.priority === 'urgent' ? 'bg-red-100' :
                          announcement.priority === 'high' ? 'bg-amber-100' : 'bg-sky-100'
                        }`}>
                          {announcement.priority === 'urgent' ? (
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                          ) : announcement.priority === 'high' ? (
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                          ) : (
                            <Info className="w-5 h-5 text-sky-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{announcement.title}</h3>
                            <Badge variant={announcement.active ? 'default' : 'secondary'}>
                              {announcement.active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            Created: {new Date(announcement.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Link href={`/admin/announcements/edit/${announcement.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
