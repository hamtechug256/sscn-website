import { db } from '@/lib/db'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import { Image, Images, Calendar } from 'lucide-react'

async function getPublishedGallery() {
  return db.galleryAlbum.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { images: true }
      }
    }
  })
}

export default async function GalleryPage() {
  const albums = await getPublishedGallery()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-500 to-violet-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white mb-4">Photo Gallery</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Campus Life in Pictures
              </h1>
              <p className="text-lg text-white/80">
                Explore moments captured from campus activities, graduation ceremonies, clinical training, and more
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {albums.length === 0 ? (
              <Card className="p-8 text-center">
                <Images className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No photo albums available yet.</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.map((album) => (
                  <Link key={album.id} href={`/gallery/${album.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-xl transition-all">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        {album.coverImage ? (
                          <img 
                            src={album.coverImage} 
                            alt={album.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center">
                            <Image className="w-16 h-16 text-purple-300" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Badge className="absolute bottom-3 right-3 bg-white/90 text-purple-600">
                          <Images className="w-3 h-3 mr-1" />
                          {album._count.images} photos
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold group-hover:text-purple-600 transition-colors">
                          {album.title}
                        </h3>
                        {album.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{album.description}</p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(album.createdAt).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
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
