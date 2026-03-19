'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Toaster } from 'react-hot-toast'
import { 
  LayoutDashboard, 
  Newspaper, 
  Calendar, 
  Image, 
  Users, 
  Download, 
  Settings, 
  MessageSquare,
  Megaphone,
  GraduationCap,
  BookOpen,
  Menu,
  X,
  ExternalLink,
  Bell,
  HelpCircle,
  ChevronLeft,
  Sliders
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, description: 'Overview & statistics' },
  { name: 'Hero Slides', href: '/admin/hero-slides', icon: Sliders, description: 'Homepage carousel' },
  { name: 'News & Updates', href: '/admin/news', icon: Newspaper, description: 'Manage news articles' },
  { name: 'Events', href: '/admin/events', icon: Calendar, description: 'Manage events calendar' },
  { name: 'Announcements', href: '/admin/announcements', icon: Megaphone, description: 'Important notices' },
  { name: 'Gallery', href: '/admin/gallery', icon: Image, description: 'Photo albums' },
  { name: 'Faculty', href: '/admin/faculty', icon: Users, description: 'Staff profiles' },
  { name: 'Programs', href: '/admin/programs', icon: GraduationCap, description: 'Academic programs' },
  { name: 'Downloads', href: '/admin/downloads', icon: Download, description: 'Resources & forms' },
  { name: 'Inquiries', href: '/admin/contacts', icon: MessageSquare, description: 'Contact messages' },
  { name: 'Settings', href: '/admin/settings', icon: Settings, description: 'Site configuration' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-transform duration-300 bg-white border-r border-gray-200 shadow-lg",
        sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-sky-500 to-blue-600">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">SSCN Admin</span>
              <p className="text-[10px] text-white/70">Content Management</p>
            </div>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 h-8 w-8"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-9rem)]">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-sky-500 text-white shadow-md" 
                    : "text-gray-600 hover:bg-sky-50 hover:text-sky-600"
                )}
                title={item.description}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1">
                  <span>{item.name}</span>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Help Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100 bg-white">
          <Link 
            href="/docs/USER_GUIDE.md"
            target="_blank"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-sky-600 transition-colors p-2 rounded-lg hover:bg-sky-50"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Need Help? View Guide</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className={cn(
        "transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-0"
      )}>
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="hover:bg-sky-50"
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <div className="w-px h-6 bg-gray-200" />
              </>
            )}
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                {navigation.find(n => 
                  n.href === pathname || 
                  (n.href !== '/admin' && pathname.startsWith(n.href))
                )?.name || 'Admin Panel'}
              </h1>
              <p className="text-xs text-gray-400">
                Manage your school website content
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              target="_blank"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-sky-600 transition-colors px-3 py-2 rounded-lg hover:bg-sky-50"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">View Website</span>
            </Link>
            <Button variant="ghost" size="icon" className="relative hover:bg-sky-50">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-sm font-medium shadow-sm">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700">Admin</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
