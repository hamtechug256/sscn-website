import { db } from '@/lib/db'

// Force dynamic rendering for Netlify compatibility
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, GraduationCap, Clock, BookOpen } from 'lucide-react'

async function getPrograms() {
  return db.program.findMany({
    orderBy: [{ order: 'asc' }, { name: 'asc' }]
  })
}

export default async function ProgramsAdminPage() {
  const programs = await getPrograms()

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Programs</h1>
          <p className="text-gray-500">Manage courses and programs offered</p>
        </div>
        <Link href="/admin/programs/new">
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Program
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{programs.length}</div>
            <p className="text-sm text-gray-500">Total Programs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {programs.filter(p => p.published).length}
            </div>
            <p className="text-sm text-gray-500">Published</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-600">
              {programs.filter(p => p.featured).length}
            </div>
            <p className="text-sm text-gray-500">Featured</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Programs</CardTitle>
        </CardHeader>
        <CardContent>
          {programs.length === 0 ? (
            <div className="text-center py-12">
              <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No programs yet</h3>
              <Link href="/admin/programs/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Program
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.map((program) => (
                <Card key={program.id} className="overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                    {program.image && (
                      <img src={program.image} alt={program.name} className="w-full h-full object-cover opacity-50" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GraduationCap className="w-12 h-12 text-white" />
                    </div>
                    {program.featured && (
                      <Badge className="absolute top-2 right-2 bg-amber-500">Featured</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {program.code && (
                        <Badge variant="outline">{program.code}</Badge>
                      )}
                      <Badge variant="secondary">{program.level}</Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{program.name}</h3>
                    {program.description && (
                      <p className="text-sm text-gray-500 line-clamp-2">{program.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      {program.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {program.duration}
                        </span>
                      )}
                      {program.mode && (
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {program.mode}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <Badge variant={program.published ? 'default' : 'secondary'}>
                        {program.published ? 'Published' : 'Draft'}
                      </Badge>
                      <Link href={`/admin/programs/edit/${program.id}`}>
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
