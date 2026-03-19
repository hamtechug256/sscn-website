'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { ImageUpload } from '@/components/ui/image-upload'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Link2 } from 'lucide-react'
import Link from 'next/link'

interface HeroSlideFormProps {
  slide?: {
    id: string
    title: string
    subtitle: string | null
    badge: string | null
    image: string
    link: string | null
    buttonText: string | null
    order: number
    active: boolean
  }
}

export function HeroSlideForm({ slide }: HeroSlideFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: slide?.title || '',
    subtitle: slide?.subtitle || '',
    badge: slide?.badge || '',
    image: slide?.image || '',
    link: slide?.link || '',
    buttonText: slide?.buttonText || 'Learn More',
    order: slide?.order || 0,
    active: slide?.active ?? true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error('Title is required')
      return
    }
    
    if (!formData.image) {
      toast.error('Please upload an image')
      return
    }

    setLoading(true)

    try {
      const url = slide 
        ? `/api/admin/hero-slides/${slide.id}`
        : '/api/admin/hero-slides'
      
      const method = slide ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(slide ? 'Slide updated!' : 'Slide created!')
        router.push('/admin/hero-slides')
      } else {
        toast.error('Failed to save slide')
      }
    } catch (error) {
      console.error('Failed to save slide:', error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/admin/hero-slides">
            <Button variant="ghost" type="button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {slide ? 'Edit Slide' : 'New Slide'}
            </h1>
            <p className="text-gray-500 text-sm">
              {slide ? 'Update slide details' : 'Add a new slide to the homepage carousel'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
            <span className="text-sm">Active</span>
            <Switch
              checked={formData.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-sky-500 to-blue-600"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Slide
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Slide Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-500" />
                Slide Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                aspectRatio="aspect-[16/9]"
                maxSize={5}
              />
              <p className="text-xs text-gray-400 mt-2">
                📷 Recommended size: 1344 × 768 pixels (16:9 aspect ratio)
              </p>
            </CardContent>
          </Card>

          {/* Slide Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Slide Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Excellence in Nursing Education"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="e.g., Training compassionate healthcare professionals..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="badge">Badge Text (optional)</Label>
                <Input
                  id="badge"
                  value={formData.badge}
                  onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                  placeholder="e.g., Nursing, Midwifery, E-Learning"
                  className="mt-1"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Small badge shown above the title
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Call to Action */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Link2 className="w-4 h-4 text-green-500" />
                Call to Action
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={formData.buttonText}
                  onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
                  placeholder="e.g., Learn More, Apply Now"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="link">Link URL</Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                  placeholder="e.g., /programs, /admissions"
                  className="mt-1"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Internal path (e.g., /programs) or external URL
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Display Order */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Display Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="order">Order Position</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                  className="mt-1"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Lower numbers appear first
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Help */}
          <Card className="bg-sky-50 border-sky-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-sky-900 mb-2">💡 Quick Tips</h3>
              <ul className="text-xs text-sky-700 space-y-1">
                <li>• Keep titles under 50 characters</li>
                <li>• Use action-oriented button text</li>
                <li>• Make sure images are high quality</li>
                <li>• Test on mobile devices too</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
