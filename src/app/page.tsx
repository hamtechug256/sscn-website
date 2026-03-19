'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import { HeroCarousel } from '@/components/sections/HeroCarousel'
import { StudentClubs } from '@/components/sections/StudentClubs'
import {
  Heart,
  Stethoscope,
  GraduationCap,
  Users,
  ChevronRight,
  Award,
  BookOpen,
  Building2,
  Target,
  CheckCircle2,
  Clock,
  ArrowRight,
  Play,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

const programs = [
  {
    title: "Diploma in Nursing",
    duration: "3 Years",
    description: "Comprehensive training in patient care, medical administration, and clinical practice. Prepare to serve in hospitals and health centers across Uganda.",
    icon: Heart,
    color: "from-sky-500 to-blue-600",
    image: "/uploads/programs/nursing-program.jpg",
    features: ["Clinical Rotations", "Lab Training", "Community Health"]
  },
  {
    title: "Diploma in Midwifery",
    duration: "3 Years", 
    description: "Specialized training in maternal and child health. Learn to provide quality antenatal, delivery, and postnatal care to mothers and newborns.",
    icon: Stethoscope,
    color: "from-pink-500 to-rose-600",
    image: "/uploads/programs/midwifery-program.jpg",
    features: ["Delivery Training", "Prenatal Care", "Neonatal Care"]
  },
  {
    title: "Nursing Extension",
    duration: "2 Years",
    description: "Upgrade program for practicing enrolled nurses. Flexible weekend classes designed for working healthcare professionals.",
    icon: GraduationCap,
    color: "from-violet-500 to-purple-600",
    image: "/uploads/carousel/hero-3.jpg",
    features: ["Flexible Schedule", "Weekend Classes", "Practical Focus"]
  },
  {
    title: "E-Learning Programs",
    duration: "Flexible",
    description: "Distance learning options for students across Uganda. Access quality nursing education from anywhere with internet connectivity.",
    icon: BookOpen,
    color: "from-amber-500 to-orange-600",
    image: "/uploads/programs/public-health.jpg",
    features: ["Online Classes", "Self-Paced", "24/7 Resources"]
  }
]

const whyChooseUs = [
  {
    icon: Award,
    title: "Government Accredited",
    description: "Certified by Uganda's Ministry of Education and Allied Health Professionals Council.",
    color: "text-amber-500"
  },
  {
    icon: Building2,
    title: "Modern Facilities",
    description: "Well-equipped skills lab, library, and demonstration rooms for hands-on learning.",
    color: "text-sky-500"
  },
  {
    icon: Users,
    title: "Qualified Faculty",
    description: "Experienced tutors and clinical instructors dedicated to your success.",
    color: "text-green-500"
  },
  {
    icon: Target,
    title: "High Pass Rate",
    description: "Consistently strong performance in national UNMEB examinations.",
    color: "text-rose-500"
  },
  {
    icon: Heart,
    title: "Clinical Excellence",
    description: "Partnerships with Soroti Regional Referral Hospital and HC facilities.",
    color: "text-pink-500"
  },
  {
    icon: BookOpen,
    title: "Flexible Learning",
    description: "Multiple intakes (January/September) with full-time and part-time options.",
    color: "text-violet-500"
  }
]

const stats = [
  { number: "500+", label: "Students Enrolled" },
  { number: "95%", label: "UNMEB Pass Rate" },
  { number: "50+", label: "Years of Excellence" },
  { number: "2,000+", label: "Graduates" }
]

const announcements = [
  { text: "Applications for September 2025 intake now open! Apply today.", urgent: true },
  { text: "Clinical attachments for Year 3 students at Soroti Regional Hospital ongoing", urgent: false },
  { text: "E-Learning platform now available for all continuing students", urgent: false }
]

// Ugandan campus life images - local files
const campusImages = [
  { image: "/uploads/gallery/nursing-training.jpg", title: "Nursing Training" },
  { image: "/uploads/gallery/clinical-lab.jpg", title: "Clinical Skills Lab" },
  { image: "/uploads/gallery/midwifery-care.jpg", title: "Midwifery Care" },
  { image: "/uploads/gallery/community-health.jpg", title: "Community Health" }
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section with Carousel */}
      <section className="relative pt-20">
        <div className="container mx-auto px-4 py-8">
          <HeroCarousel />
        </div>
      </section>

      {/* Announcements Ticker */}
      <section className="bg-gradient-to-r from-sky-600 to-blue-600 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 text-white overflow-hidden">
            <Badge className="bg-white/20 shrink-0 text-white border-0">
              📢 Updates
            </Badge>
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
              {announcements.map((item, i) => (
                <span key={i} className="flex items-center gap-2 text-sm">
                  {item.urgent && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-sky-50 hover:from-sky-50 hover:to-blue-50 transition-colors border border-gray-100">
                <div className="text-2xl md:text-3xl font-bold text-sky-600">{stat.number}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-sky-600 border-sky-200">Academic Programs</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Our Programs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Quality nursing and midwifery education approved by Uganda's Ministry of Education and Allied Health Professionals Council.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, i) => (
              <Link key={i} href="/programs" className="group">
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-sky-500/50 bg-white h-full">
                  {/* Program Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={program.image} 
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <program.icon className="w-7 h-7 text-white" />
                      </div>
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-sm font-medium">
                        {program.duration}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-sky-600 transition-colors">{program.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{program.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {program.features.map((feature, j) => (
                        <Badge key={j} variant="secondary" className="bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-sky-600 font-medium group-hover:text-sky-700">
                      Learn More 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all rounded-xl px-8">
              <Link href="/programs">
                View All Programs
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/uploads/gallery/graduation.jpg"
                  alt="Nursing students in training"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sky-600">50+</div>
                    <div className="text-xs text-gray-500">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-xs text-gray-500">Pass Rate</div>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-sky-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
            </div>

            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-sky-600 border-sky-200">Why SSCN?</Badge>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  A Legacy of Excellence in Healthcare Education
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Since 1970, Soroti School of Comprehensive Nursing has been training skilled healthcare professionals who serve communities throughout Uganda. Located in Soroti City, Eastern Uganda.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {whyChooseUs.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-sky-50 transition-colors group border border-transparent hover:border-sky-100">
                    <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-200 transition-colors">
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg rounded-xl">
                <Link href="/about">
                  Learn More About Us
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-sky-600 border-sky-200">Campus Life</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Life at SSCN Soroti
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience quality training in a supportive learning environment in the heart of Teso sub-region.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {campusImages.map((item, i) => (
              <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link href="/gallery">
                <Play className="mr-2 w-4 h-4" />
                View Full Gallery
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Student Clubs Section */}
      <StudentClubs />

      {/* Quick Contact */}
      <section className="py-12 bg-gray-50 border-y">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-sm text-gray-500">Soroti City, Eastern Uganda</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-sm text-gray-500">+256 393 249195</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Mail className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-sm text-gray-500">info@sscn.ac.ug</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-sky-500 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-white/20 text-white px-4 py-1 border-0">Get Started</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Begin Your Healthcare Journey Today
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Ready to make a difference in healthcare? Join SSCN and become part of Uganda's healthcare workforce.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-sky-600 hover:bg-sky-50 shadow-lg hover:shadow-xl transition-all rounded-xl px-8">
                <Link href="/contact">
                  Contact Us
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="white-outline" className="rounded-xl px-8">
                <Link href="/admissions">
                  Apply Now
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              {[
                { icon: CheckCircle2, text: "Government Accredited" },
                { icon: CheckCircle2, text: "Flexible Payment" },
                { icon: CheckCircle2, text: "Career Support" },
                { icon: CheckCircle2, text: "Clinical Training" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/90">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
