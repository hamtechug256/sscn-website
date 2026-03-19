'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  ChevronRight,
  Facebook,
  CheckCircle2
} from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    details: ["Soroti City", "Eastern Region, Uganda", "Near Soroti Regional Referral Hospital"]
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+256 393 249195"],
    link: "tel:+256393249195"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["sscn16@gmail.com"],
    link: "mailto:sscn16@gmail.com"
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Friday", "8:00 AM - 5:00 PM EAT", "Closed on weekends and public holidays"]
  }
]

const inquiryTypes = [
  "Admissions",
  "Programs Information",
  "Fees and Payments",
  "Academic Records",
  "Partnership Opportunities",
  "General Inquiry"
]

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">Contact Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Have questions about our programs, admissions, or anything else? We're here to help. 
              Reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-sky-100 hover:shadow-lg hover:border-sky-300 transition-all">
                <div className="w-14 h-14 rounded-xl bg-sky-500/10 flex items-center justify-center mb-4">
                  <info.icon className="w-7 h-7 text-sky-600" />
                </div>
                <h3 className="font-semibold text-lg mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, j) => (
                    info.link ? (
                      <a 
                        key={j} 
                        href={info.link} 
                        className="block text-foreground/70 hover:text-sky-600 transition-colors text-sm"
                      >
                        {detail}
                      </a>
                    ) : (
                      <p key={j} className="text-foreground/70 text-sm">{detail}</p>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-foreground/60">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">
                    Thank you for contacting us. We will respond to your inquiry within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Full Name *</label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="border-2 focus:border-sky-500 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address *</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="border-2 focus:border-sky-500 h-12"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+256 XXX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="border-2 focus:border-sky-500 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject *</label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="w-full h-12 px-4 border-2 rounded-lg focus:border-sky-500 focus:outline-none bg-background"
                      >
                        <option value="">Select inquiry type</option>
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Your Message *</label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="border-2 focus:border-sky-500 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg h-12 text-base font-medium"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Additional Contact Options */}
            <div className="space-y-8">
              {/* WhatsApp Card */}
              <Card className="overflow-hidden border-green-100">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                      <MessageCircle className="w-9 h-9" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Chat on WhatsApp</h3>
                      <p className="text-white/80 text-sm">Quick responses for your inquiries</p>
                    </div>
                  </div>
                  <Button 
                    asChild
                    className="w-full bg-white text-green-600 hover:bg-white/90 shadow-lg h-12"
                  >
                    <a href="https://wa.me/256393249195" target="_blank" rel="noopener noreferrer">
                      Start Chat
                      <Send className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </Card>

              {/* Quick Links */}
              <Card className="border-sky-100">
                <CardHeader>
                  <CardTitle className="text-xl">Quick Links</CardTitle>
                  <CardDescription>Find what you're looking for quickly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild variant="ghost" className="w-full justify-between hover:bg-sky-50">
                    <Link href="/programs">
                      <span>Programs Information</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-between hover:bg-sky-50">
                    <Link href="/admissions">
                      <span>Admission Requirements</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-between hover:bg-sky-50">
                    <Link href="/about">
                      <span>About Our School</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="border-sky-100">
                <CardHeader>
                  <CardTitle className="text-xl">Connect With Us</CardTitle>
                  <CardDescription>Follow us on social media for updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <a
                      href="https://facebook.com/sorotinursing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                    {/* Add more social links as needed */}
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="border-sky-100 overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="w-12 h-12 text-sky-500 mx-auto mb-3" />
                    <p className="font-medium">Soroti City, Uganda</p>
                    <p className="text-foreground/60 text-sm">Near Soroti Regional Referral Hospital</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Ready to Start Your Healthcare Journey?
            </h2>
            <p className="text-foreground/60">
              Explore our programs and take the first step toward a rewarding career.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg">
                <Link href="/programs">
                  Explore Programs
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-2 border-sky-200 hover:border-sky-400 hover:bg-sky-50">
                <Link href="/admissions">
                  Admission Information
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
