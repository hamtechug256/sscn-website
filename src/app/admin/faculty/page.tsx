import { db } from '@/lib/db'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Users, Mail, Phone } from 'lucide-react'

async function getFaculty() {
  return db.faculty.findMany({
    orderBy: [{ order: 'asc' }, { name: 'asc' }]
  })
}

export default async function FacultyAdminPage() {
  const faculty = await getFaculty()

  const departments = [...new Set(faculty.map(f => f.department).filter(Boolean))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Faculty Directory</h1>
          <p className="text-gray-500">Manage staff and faculty profiles</p>
        </div>
        <Link href="/admin/faculty/new">
          <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Faculty
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{faculty.length}</div>
            <p className="text-sm text-gray-500">Total Staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {faculty.filter(f => f.active).length}
            </div>
            <p className="text-sm text-gray-500">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-sky-600">{departments.length}</div>
            <p className="text-sm text-gray-500">Departments</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Faculty Members</CardTitle>
        </CardHeader>
        <CardContent>
          {faculty.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No faculty members yet</h3>
              <Link href="/admin/faculty/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Faculty
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {faculty.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <div className="h-24 bg-gradient-to-r from-rose-500 to-pink-600"></div>
                  <div className="relative px-4 pb-4">
                    <div className="absolute -top-10 left-4">
                      <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-100 overflow-hidden">
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-rose-100">
                            <span className="text-2xl font-bold text-rose-600">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="pt-12">
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.title}</p>
                      {member.department && (
                        <Badge variant="outline" className="mt-1">
                          {member.department}
                        </Badge>
                      )}
                      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                        {member.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {member.email}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant={member.active ? 'default' : 'secondary'}>
                          {member.active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Link href={`/admin/faculty/edit/${member.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
