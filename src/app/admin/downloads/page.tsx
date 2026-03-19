import { db } from '@/lib/db'

// Force dynamic rendering for Netlify compatibility
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Download, FileText, File } from 'lucide-react'

async function getDownloads() {
  return db.download.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export default async function DownloadsAdminPage() {
  const downloads = await getDownloads()

  const categories = [...new Set(downloads.map(d => d.category))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Downloads Center</h1>
          <p className="text-gray-500">Manage downloadable resources and forms</p>
        </div>
        <Link href="/admin/downloads/new">
          <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Download
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{downloads.length}</div>
            <p className="text-sm text-gray-500">Total Downloads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-teal-600">
              {downloads.reduce((acc, d) => acc + d.downloads, 0)}
            </div>
            <p className="text-sm text-gray-500">Total Downloads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-sky-600">{categories.length}</div>
            <p className="text-sm text-gray-500">Categories</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Downloads</CardTitle>
        </CardHeader>
        <CardContent>
          {downloads.length === 0 ? (
            <div className="text-center py-12">
              <Download className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No downloads yet</h3>
              <Link href="/admin/downloads/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Download
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">File</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Downloads</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {downloads.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            {item.description && (
                              <p className="text-sm text-gray-500 truncate max-w-xs">{item.description}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="capitalize">
                          {item.category}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-500 uppercase">
                        {item.fileType || 'FILE'}
                      </td>
                      <td className="py-4 px-4 text-sm">
                        <span className="font-medium">{item.downloads}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/downloads/edit/${item.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
