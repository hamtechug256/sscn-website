'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from 'react-hot-toast'
import { Settings, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Globe, Save, Loader2 } from 'lucide-react'

interface SettingsData {
  [key: string]: string
}

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<SettingsData>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    try {
      const response = await fetch('/api/admin/settings')
      const data = await response.json()
      setSettings(data)
    } catch (error) {
      console.error('Failed to fetch settings:', error)
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  async function saveSetting(key: string, value: string) {
    setSaving(key)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value })
      })

      if (response.ok) {
        toast.success('Setting saved!')
      } else {
        toast.error('Failed to save setting')
      }
    } catch (error) {
      console.error('Failed to save setting:', error)
      toast.error('Failed to save setting')
    } finally {
      setSaving(null)
    }
  }

  async function saveSection(section: string, fields: { key: string; value: string }[]) {
    setSaving(section)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: fields })
      })

      if (response.ok) {
        toast.success(`${section} settings saved!`)
      } else {
        toast.error('Failed to save settings')
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
      </div>
    )
  }

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
            <div>
              <Label htmlFor="phone_primary">Primary Phone</Label>
              <Input 
                id="phone_primary" 
                value={settings.phone_primary || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, phone_primary: e.target.value }))}
                placeholder="+256 XXX XXX XXX"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone_secondary">Secondary Phone</Label>
              <Input 
                id="phone_secondary" 
                value={settings.phone_secondary || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, phone_secondary: e.target.value }))}
                placeholder="+256 XXX XXX XXX"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                placeholder="info@sscn.ac.ug"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="address">Physical Address</Label>
              <Textarea 
                id="address" 
                value={settings.address || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Soroti City, Eastern Region, Uganda"
                rows={2}
                className="mt-1"
              />
            </div>
            <Button 
              onClick={() => saveSection('Contact', [
                { key: 'phone_primary', value: settings.phone_primary || '' },
                { key: 'phone_secondary', value: settings.phone_secondary || '' },
                { key: 'email', value: settings.email || '' },
                { key: 'address', value: settings.address || '' }
              ])}
              disabled={saving === 'Contact'}
            >
              {saving === 'Contact' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Contact Info
            </Button>
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
                value={settings.facebook || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, facebook: e.target.value }))}
                placeholder="https://facebook.com/sscn"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="twitter" className="flex items-center gap-2">
                <Twitter className="w-4 h-4" />
                Twitter/X
              </Label>
              <Input 
                id="twitter" 
                value={settings.twitter || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, twitter: e.target.value }))}
                placeholder="https://twitter.com/sscn"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                Instagram
              </Label>
              <Input 
                id="instagram" 
                value={settings.instagram || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, instagram: e.target.value }))}
                placeholder="https://instagram.com/sscn"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="youtube" className="flex items-center gap-2">
                <Youtube className="w-4 h-4" />
                YouTube
              </Label>
              <Input 
                id="youtube" 
                value={settings.youtube || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, youtube: e.target.value }))}
                placeholder="https://youtube.com/@sscn"
                className="mt-1"
              />
            </div>
            <Button 
              onClick={() => saveSection('Social', [
                { key: 'facebook', value: settings.facebook || '' },
                { key: 'twitter', value: settings.twitter || '' },
                { key: 'instagram', value: settings.instagram || '' },
                { key: 'youtube', value: settings.youtube || '' }
              ])}
              disabled={saving === 'Social'}
            >
              {saving === 'Social' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Social Links
            </Button>
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
                value={settings.school_name || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, school_name: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="school_motto">School Motto</Label>
              <Input 
                id="school_motto" 
                value={settings.school_motto || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, school_motto: e.target.value }))}
                placeholder="Excellence in Healthcare Education"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="mission">Mission Statement</Label>
              <Textarea 
                id="mission" 
                value={settings.mission || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, mission: e.target.value }))}
                placeholder="To provide quality nursing and midwifery education..."
                rows={3}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="vision">Vision Statement</Label>
              <Textarea 
                id="vision" 
                value={settings.vision || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, vision: e.target.value }))}
                placeholder="To be a leading institution in healthcare education..."
                rows={3}
                className="mt-1"
              />
            </div>
            <Button 
              onClick={() => saveSection('School', [
                { key: 'school_name', value: settings.school_name || '' },
                { key: 'school_motto', value: settings.school_motto || '' },
                { key: 'mission', value: settings.mission || '' },
                { key: 'vision', value: settings.vision || '' }
              ])}
              disabled={saving === 'School'}
            >
              {saving === 'School' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save School Info
            </Button>
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
