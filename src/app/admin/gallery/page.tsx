import { db } from '@/lib/db'

// Force dynamic rendering for Netlify compatibility
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Image, Trash2 } from 'lucide-react'

async function getGallery() {
  return db.galleryAlbum.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { images: true }
      }
    }
  })
}

export default async function GalleryAdminPage() {
  const albums = await getGallery()

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-500">Manage photo albums and images</p>
        </div>
        <Link href="/admin/gallery/new">
          <Button className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Album
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{albums.length}</div>
            <p className="text-sm text-gray-500">Total Albums</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">
              {albums.reduce((acc, a) => acc + a._count.images, 0)}
            </div>
            <p className="text-sm text-gray-500">Total Photos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {albums.filter(a => a.published).length}
            </div>
            <p className="text-sm text-gray-500">Published</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-600">
              {albums.filter(a => a.featured).length}
            </div>
            <p className="text-sm text-gray-500">Featured</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Albums</CardTitle>
        </CardHeader>
        <CardContent>
          {albums.length === 0 ? (
            <div className="text-center py-12">
              <Image className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No albums yet</h3>
              <Link href="/admin/gallery/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Album
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <Card key={album.id} className="overflow-hidden">
                  <div className="h-40 bg-gray-100 relative">
                    {album.coverImage ? (
                      <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-white/80">
                        {album._count.images} photos
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{album.title}</h3>
                    <div className="flex items-center justify-between">
                      <Badge variant={album.published ? 'default' : 'secondary'}>
                        {album.published ? 'Published' : 'Draft'}
                      </Badge>
                      <Link href={`/admin/gallery/edit/${album.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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
