import { db } from '@/lib/db'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Image as ImageIcon,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Star
} from 'lucide-react'

async function getHeroSlides() {
  return db.heroSlide.findMany({
    orderBy: { order: 'asc' }
  })
}

export default async function HeroSlidesAdminPage() {
  const slides = await getHeroSlides()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero Carousel</h1>
          <p className="text-gray-500">Manage homepage slider images and content</p>
        </div>
        <Link href="/admin/hero-slides/new">
          <Button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Slide
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{slides.length}</div>
            <p className="text-sm text-gray-500">Total Slides</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {slides.filter(s => s.active).length}
            </div>
            <p className="text-sm text-gray-500">Active Slides</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-600">
              {slides.filter(s => !s.active).length}
            </div>
            <p className="text-sm text-gray-500">Inactive Slides</p>
          </CardContent>
        </Card>
      </div>

      {/* Slides List */}
      <Card>
        <CardHeader>
          <CardTitle>Carousel Slides</CardTitle>
          <p className="text-sm text-gray-500">
            Drag to reorder. Slides appear on the homepage in the order shown below.
          </p>
        </CardHeader>
        <CardContent>
          {slides.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No slides yet</h3>
              <p className="text-gray-500 mb-4">Add your first slide to the homepage carousel.</p>
              <Link href="/admin/hero-slides/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Slide
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {slides.map((slide, index) => (
                <div 
                  key={slide.id} 
                  className="flex items-center gap-4 p-4 rounded-xl border bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  {/* Order & Image */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-sm font-medium text-gray-400 w-6 text-center">
                      {index + 1}
                    </div>
                    <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      {slide.image ? (
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 truncate">{slide.title}</h3>
                        {slide.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {slide.badge}
                          </Badge>
                        )}
                      </div>
                      {slide.subtitle && (
                        <p className="text-sm text-gray-500 truncate">{slide.subtitle}</p>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <Badge variant={slide.active ? 'default' : 'secondary'}>
                      {slide.active ? (
                        <><Eye className="w-3 h-3 mr-1" /> Active</>
                      ) : (
                        <><EyeOff className="w-3 h-3 mr-1" /> Inactive</>
                      )}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <Link href={`/admin/hero-slides/edit/${slide.id}`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <form action={`/api/admin/hero-slides/${slide.id}`} method="POST">
                      <input type="hidden" name="_method" value="DELETE" />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card className="bg-sky-50 border-sky-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-sky-900 mb-2">💡 Tips for Hero Carousel</h3>
          <ul className="text-sm text-sky-700 space-y-1">
            <li>• Use high-quality images (recommended: 1344×768 pixels)</li>
            <li>• Keep titles short and impactful</li>
            <li>• Add a clear call-to-action button</li>
            <li>• Active slides appear on the homepage in order</li>
            <li>• Inactive slides are hidden but not deleted</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
