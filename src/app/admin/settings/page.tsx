import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Settings, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Globe } from 'lucide-react'

async function getSettings() {
  const settings = await db.setting.findMany()
  const settingsMap: Record<string, string> = {}
  settings.forEach(s => {
    settingsMap[s.key] = s.value
  })
  return settingsMap
}

export default async function SettingsAdminPage() {
  const settings = await getSettings()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-500">Manage website configuration and content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-sky-500" />
              Contact Information
            </CardTitle>
            <CardDescription>Primary contact details displayed on the website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action="/api/admin/settings" method="POST" className="space-y-4">
              <div>
                <Label htmlFor="phone_primary">Primary Phone</Label>
                <Input 
                  id="phone_primary" 
                  name="key" 
                  defaultValue="phone_primary"
                  type="hidden"
                />
                <Input 
                  id="phone_primary_value" 
                  name="value" 
                  defaultValue={settings.phone_primary || '+256 XXX XXX XXX'}
                  placeholder="+256 XXX XXX XXX"
                />
              </div>
              <div>
                <Label htmlFor="phone_secondary">Secondary Phone</Label>
                <Input 
                  id="phone_secondary" 
                  name="value" 
                  defaultValue={settings.phone_secondary || ''}
                  placeholder="+256 XXX XXX XXX"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="value" 
                  type="email"
                  defaultValue={settings.email || 'info@sscn.ac.ug'}
                  placeholder="info@sscn.ac.ug"
                />
              </div>
              <div>
                <Label htmlFor="address">Physical Address</Label>
                <Textarea 
                  id="address" 
                  name="value" 
                  defaultValue={settings.address || ''}
                  placeholder="Soroti City, Eastern Region, Uganda"
                  rows={2}
                />
              </div>
              <Button type="submit">Save Contact Info</Button>
            </form>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-500" />
              Social Media Links
            </CardTitle>
            <CardDescription>Links to social media profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="facebook" className="flex items-center gap-2">
                <Facebook className="w-4 h-4" />
                Facebook
              </Label>
              <Input 
                id="facebook" 
                defaultValue={settings.facebook || ''}
                placeholder="https://facebook.com/sscn"
              />
            </div>
            <div>
              <Label htmlFor="twitter" className="flex items-center gap-2">
                <Twitter className="w-4 h-4" />
                Twitter/X
              </Label>
              <Input 
                id="twitter" 
                defaultValue={settings.twitter || ''}
                placeholder="https://twitter.com/sscn"
              />
            </div>
            <div>
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                Instagram
              </Label>
              <Input 
                id="instagram" 
                defaultValue={settings.instagram || ''}
                placeholder="https://instagram.com/sscn"
              />
            </div>
            <div>
              <Label htmlFor="youtube" className="flex items-center gap-2">
                <Youtube className="w-4 h-4" />
                YouTube
              </Label>
              <Input 
                id="youtube" 
                defaultValue={settings.youtube || ''}
                placeholder="https://youtube.com/@sscn"
              />
            </div>
            <Button>Save Social Links</Button>
          </CardContent>
        </Card>

        {/* School Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-500" />
              School Information
            </CardTitle>
            <CardDescription>Basic school details and branding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="school_name">School Name</Label>
              <Input 
                id="school_name" 
                defaultValue={settings.school_name || 'Soroti School of Comprehensive Nursing'}
              />
            </div>
            <div>
              <Label htmlFor="school_motto">School Motto</Label>
              <Input 
                id="school_motto" 
                defaultValue={settings.school_motto || ''}
                placeholder="Excellence in Healthcare Education"
              />
            </div>
            <div>
              <Label htmlFor="mission">Mission Statement</Label>
              <Textarea 
                id="mission" 
                defaultValue={settings.mission || ''}
                placeholder="To provide quality nursing and midwifery education..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="vision">Vision Statement</Label>
              <Textarea 
                id="vision" 
                defaultValue={settings.vision || ''}
                placeholder="To be a leading institution in healthcare education..."
                rows={3}
              />
            </div>
            <Button>Save School Info</Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Mail className="w-4 h-4 mr-2" />
              Export Contact Submissions
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MapPin className="w-4 h-4 mr-2" />
              Update Location on Map
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Globe className="w-4 h-4 mr-2" />
              SEO Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
