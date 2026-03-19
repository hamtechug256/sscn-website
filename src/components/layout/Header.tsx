'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  Menu, X, Phone, ChevronDown, 
  Newspaper, Calendar, Image, Users, 
  Download, BookOpen, GraduationCap,
  Library, Microscope, HelpCircle
} from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'About', 
    href: '/about',
    dropdown: [
      { name: 'Who We Are', href: '/about', icon: Users },
      { name: 'Faculty & Staff', href: '/faculty', icon: GraduationCap },
      { name: 'Research', href: '/research', icon: Microscope },
    ]
  },
  { name: 'Programs', href: '/programs' },
  { name: 'Admissions', href: '/admissions' },
  { 
    name: 'Resources', 
    href: '/downloads',
    dropdown: [
      { name: 'Downloads', href: '/downloads', icon: Download },
      { name: 'Library', href: '/library', icon: Library },
      { name: 'E-Learning', href: '/e-learning', icon: BookOpen },
      { name: 'FAQ', href: '/faq', icon: HelpCircle },
    ]
  },
  { 
    name: 'News & Events', 
    href: '/news',
    dropdown: [
      { name: 'News & Updates', href: '/news', icon: Newspaper },
      { name: 'Events Calendar', href: '/events', icon: Calendar },
      { name: 'Gallery', href: '/gallery', icon: Image },
    ]
  },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  const closeMenuOnRouteChange = () => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }
  
  // Effect to handle route changes
  useEffect(() => {
    closeMenuOnRouteChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
            <div className="w-12 h-12 rounded-xl bg-white shadow-lg group-hover:shadow-xl transition-shadow overflow-hidden flex items-center justify-center">
              <img 
                src="/images/school-badge.png" 
                alt="SSCN Badge" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl gradient-text">SSCN</span>
              <p className="text-xs text-foreground/60 -mt-1">Soroti, Uganda</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative py-2 px-3 rounded-lg flex items-center gap-1 ${
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'text-sky-600 bg-sky-50'
                      : 'text-foreground/70 hover:text-sky-600 hover:bg-sky-50'
                  }`}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
                
                {/* Dropdown Menu */}
                {item.dropdown && openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                      >
                        <subItem.icon className="w-4 h-4 text-gray-400" />
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button asChild className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all ml-2">
              <Link href="/contact">
                <Phone className="mr-2 w-4 h-4" />
                Contact Us
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors relative z-[60]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[55]">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl animate-slide-in-right">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-bold text-lg gradient-text">Menu</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <div className="flex flex-col gap-1">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                            className={`w-full text-base font-medium transition-colors py-3 px-4 rounded-xl flex items-center justify-between ${
                              pathname === item.href || pathname.startsWith(item.href + '/')
                                ? 'bg-sky-500/10 text-sky-600'
                                : 'text-foreground/70 hover:bg-sky-50 hover:text-sky-600'
                            }`}
                          >
                            {item.name}
                            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                          </button>
                          {openDropdown === item.name && (
                            <div className="ml-4 mt-1 space-y-1 border-l-2 border-sky-200 pl-4">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-sky-600 py-2"
                                >
                                  <subItem.icon className="w-4 h-4" />
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`text-base font-medium transition-colors py-3 px-4 rounded-xl ${
                            pathname === item.href
                              ? 'bg-sky-500/10 text-sky-600 border-l-4 border-sky-500'
                              : 'text-foreground/70 hover:bg-sky-50 hover:text-sky-600'
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </nav>
              
              {/* Menu Footer */}
              <div className="p-4 border-t">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg h-12"
                >
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Phone className="mr-2 w-4 h-4" />
                    Contact Us
                  </Link>
                </Button>
                <p className="text-center text-xs text-foreground/50 mt-4">
                  © SSCN - Soroti School of Comprehensive Nursing
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
