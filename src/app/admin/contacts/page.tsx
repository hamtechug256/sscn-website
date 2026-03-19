import { db } from '@/lib/db'

// Force dynamic rendering for Netlify compatibility
export const dynamic = 'force-dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Mail, Phone, Calendar, CheckCircle, Eye } from 'lucide-react'

async function getContacts() {
  return db.contact.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export default async function ContactsAdminPage() {
  const contacts = await getContacts()

  const unread = contacts.filter(c => c.status === 'unread')
  const read = contacts.filter(c => c.status === 'read')
  const replied = contacts.filter(c => c.status === 'replied')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contact Inquiries</h1>
        <p className="text-gray-500">Manage messages from website visitors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{contacts.length}</div>
            <p className="text-sm text-gray-500">Total Messages</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{unread.length}</div>
            <p className="text-sm text-red-600">Unread</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-sky-600">{read.length}</div>
            <p className="text-sm text-gray-500">Read</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{replied.length}</div>
            <p className="text-sm text-gray-500">Replied</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Messages</CardTitle>
        </CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
              <p className="text-gray-500">Messages from the contact form will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <Card 
                  key={contact.id} 
                  className={`${
                    contact.status === 'unread' ? 'border-l-4 border-l-red-500 bg-red-50/50' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{contact.name}</h3>
                          <Badge variant={
                            contact.status === 'unread' ? 'destructive' :
                            contact.status === 'replied' ? 'default' : 'secondary'
                          }>
                            {contact.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Subject: {contact.subject}
                        </p>
                        <p className="text-sm text-gray-600 mb-3">{contact.message}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {contact.email}
                          </span>
                          {contact.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {contact.phone}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <form action={`/api/admin/contacts/${contact.id}/read`} method="POST">
                          <Button type="submit" variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Mark Read
                          </Button>
                        </form>
                      </div>
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
