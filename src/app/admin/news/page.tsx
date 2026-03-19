import { db } from '@/lib/db'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Eye, 
  EyeOff, 
  Trash2, 
  Newspaper,
  Search,
  Filter
} from 'lucide-react'

async function getNews() {
  return db.news.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } }
  })
}

export default async function NewsAdminPage() {
  const news = await getNews()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News & Updates</h1>
          <p className="text-gray-500">Manage news articles and updates</p>
        </div>
        <Link href="/admin/news/new">
          <Button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add News Article
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{news.length}</div>
            <p className="text-sm text-gray-500">Total Articles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {news.filter(n => n.published).length}
            </div>
            <p className="text-sm text-gray-500">Published</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-600">
              {news.filter(n => !n.published).length}
            </div>
            <p className="text-sm text-gray-500">Drafts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-sky-600">
              {news.filter(n => n.featured).length}
            </div>
            <p className="text-sm text-gray-500">Featured</p>
          </CardContent>
        </Card>
      </div>

      {/* News List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>All Articles</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {news.length === 0 ? (
            <div className="text-center py-12">
              <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles yet</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first news article.</p>
              <Link href="/admin/news/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Article
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Article</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((article) => (
                    <tr key={article.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {article.image ? (
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                              <img src={article.image} alt="" className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center">
                              <Newspaper className="w-6 h-6 text-sky-500" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{article.title}</p>
                            {article.excerpt && (
                              <p className="text-sm text-gray-500 truncate max-w-xs">{article.excerpt}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="capitalize">
                          {article.category}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Badge variant={article.published ? 'default' : 'secondary'}>
                            {article.published ? 'Published' : 'Draft'}
                          </Badge>
                          {article.featured && (
                            <Badge className="bg-amber-500">Featured</Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/news/edit/${article.id}`}>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <form action={`/admin/news/delete/${article.id}`} method="POST">
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </form>
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
