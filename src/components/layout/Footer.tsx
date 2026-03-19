'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Programs', href: '/programs' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Contact', href: '/contact' },
]

const programs = [
  { name: 'Diploma in Nursing', href: '/programs#nursing' },
  { name: 'Diploma in Midwifery', href: '/programs#midwifery' },
  { name: 'Nursing Extension', href: '/programs#extension' },
  { name: 'E-Learning Programs', href: '/programs#elearning' },
]

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/sorotinursing', icon: Facebook },
  // Add more social links as they become available
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                S
              </div>
              <div>
                <span className="font-bold text-2xl">SSCN</span>
                <p className="text-xs text-secondary-foreground/60">Soroti School of Comprehensive Nursing</p>
              </div>
            </Link>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              A government-accredited institution dedicated to training competent and compassionate 
              healthcare professionals in nursing and midwifery since 1970.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-foreground/70 hover:text-sky-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Programs</h4>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program.name}>
                  <Link
                    href={program.href}
                    className="text-secondary-foreground/70 hover:text-sky-400 transition-colors text-sm"
                  >
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-secondary-foreground/70">
                  <p>Soroti City</p>
                  <p>Eastern Region, Uganda</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <a
                  href="tel:+256393249195"
                  className="text-sm text-secondary-foreground/70 hover:text-sky-400 transition-colors"
                >
                  +256 393 249195
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <a
                  href="mailto:sscn16@gmail.com"
                  className="text-sm text-secondary-foreground/70 hover:text-sky-400 transition-colors"
                >
                  sscn16@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/50">
            <p>© {currentYear} Soroti School of Comprehensive Nursing. All Rights Reserved.</p>
            <p>Preparing healthcare professionals since 1970</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
