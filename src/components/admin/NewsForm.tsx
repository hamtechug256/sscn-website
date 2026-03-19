'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ImageUpload } from '@/components/ui/image-upload'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { HelpTooltip } from '@/components/ui/help-tooltip'
import { useConfirmDialog } from '@/components/ui/confirm-dialog'
import toast from 'react-hot-toast'
import { 
  ArrowLeft, 
  Save, 
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
  FileText,
  Image as ImageIcon,
  Send
} from 'lucide-react'

interface NewsFormProps {
  news?: {
    id: string
    title: string
    slug: string
    content: string
    excerpt: string
    image: string | null
    category: string
    featured: boolean
    published: boolean
  }
}

const categories = [
  { value: 'general', label: '📌 General News', description: 'General school updates' },
  { value: 'admission', label: '📝 Admission News', description: 'Application and enrollment updates' },
  { value: 'event', label: '📅 Event News', description: 'Event coverage and announcements' },
  { value: 'achievement', label: '🏆 Achievements', description: 'Student and staff accomplishments' },
  { value: 'announcement', label: '📢 Announcement', description: 'Important notices' }
]

export function NewsForm({ news }: NewsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const { confirm, dialog } = useConfirmDialog()
  
  const [formData, setFormData] = useState({
    title: news?.title || '',
    content: news?.content || '',
    excerpt: news?.excerpt || '',
    image: news?.image || '',
    category: news?.category || 'general',
    featured: news?.featured || false,
    published: news?.published || false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title should be at least 10 characters'
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required'
    } else if (formData.content.length < 50) {
      newErrors.content = 'Content should be at least 50 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent, publishNow = false) => {
    e.preventDefault()
    
    if (!validate()) {
      toast.error('Please fix the errors before saving')
      return
    }

    setLoading(true)

    try {
      const slug = generateSlug(formData.title)
      const url = news 
        ? `/api/admin/news/${news.id}`
        : '/api/admin/news'
      
      const method = news ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug,
          published: publishNow ? true : formData.published
        })
      })

      if (response.ok) {
        toast.success(publishNow ? 'Article published successfully!' : 'Article saved!')
        router.push('/admin/news')
      } else {
        toast.error('Failed to save article')
      }
    } catch (error) {
      console.error('Failed to save news:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    confirm({
      title: 'Discard Changes?',
      description: 'You have unsaved changes. Are you sure you want to leave? Your work will be lost.',
      confirmText: 'Yes, Discard',
      cancelText: 'Keep Editing',
      variant: 'warning',
      onConfirm: () => router.push('/admin/news')
    })
  }

  return (
    <form className="space-y-6">
      {dialog}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-4">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={handleCancel}
            className="text-gray-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {news ? 'Edit Article' : 'New Article'}
            </h1>
            <p className="text-gray-500 text-sm">
              {news ? 'Update the article details below' : 'Create a new news article for your website'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Toggle */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
            {formData.published ? (
              <Eye className="w-4 h-4 text-green-500" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-400" />
            )}
            <Switch
              checked={formData.published}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
            />
            <span className="text-sm font-medium">
              {formData.published ? 'Published' : 'Draft'}
            </span>
          </div>

          {/* Save Buttons */}
          <Button 
            type="button" 
            variant="outline"
            onClick={(e) => handleSubmit(e, false)}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Draft
          </Button>

          <Button 
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
            className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
            Publish
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-500" />
                Article Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="title" className="flex items-center gap-1">
                    Article Title <span className="text-red-500">*</span>
                  </Label>
                  <span className="text-xs text-gray-400">{formData.title.length}/100</span>
                </div>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a clear, descriptive title for your article"
                  className={errors.title ? 'border-red-300 focus:border-red-500' : ''}
                  maxLength={100}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠️</span> {errors.title}
                  </p>
                )}
                <p className="text-xs text-gray-400">
                  💡 A good title is clear, specific, and under 60 characters
                </p>
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="excerpt" className="flex items-center gap-1">
                    Short Summary
                    <HelpTooltip content="This appears in article listings and social media shares" />
                  </Label>
                  <span className="text-xs text-gray-400">{formData.excerpt.length}/200</span>
                </div>
                <Input
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief summary of the article (2-3 sentences)"
                  maxLength={200}
                />
                <p className="text-xs text-gray-400">
                  💡 Write 2-3 sentences summarizing the main point
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Content Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-500" />
                Article Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                placeholder="Write your article content here. Use the toolbar above to format your text..."
                required
              />
              {errors.content && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-2">
                  <span>⚠️</span> {errors.content}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-500" />
                Featured Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                aspectRatio="aspect-video"
                maxSize={5}
              />
              <div className="text-xs text-gray-400 space-y-1">
                <p>📷 Drag & drop or click to upload</p>
                <p>📏 Recommended: 1200 x 630 pixels</p>
                <p>📁 Max file size: 5MB</p>
              </div>
            </CardContent>
          </Card>

          {/* Category */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                📂 Category
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <div className="flex flex-col">
                        <span>{cat.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">
                💡 Categories help organize your content
              </p>
            </CardContent>
          </Card>

          {/* Options */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                ⚙️ Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Featured */}
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <div>
                    <p className="text-sm font-medium">Featured Article</p>
                    <p className="text-xs text-gray-500">Show on homepage</p>
                  </div>
                </div>
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                />
              </div>

              {/* Help */}
              <div className="p-3 bg-sky-50 rounded-lg">
                <p className="text-xs text-sky-700">
                  <strong>📝 Quick Tips:</strong>
                </p>
                <ul className="text-xs text-sky-600 mt-1 space-y-1">
                  <li>• Featured articles appear on homepage</li>
                  <li>• Draft = hidden from public</li>
                  <li>• Published = visible on website</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
