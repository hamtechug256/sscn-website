'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Award,
  Target,
  Eye,
  Heart,
  Users,
  Building2,
  BookOpen,
  Clock,
  ChevronRight,
  CheckCircle2,
  GraduationCap,
  Cross,
  HandHeart
} from 'lucide-react'

const timeline = [
  {
    year: "1970",
    title: "Foundation",
    description: "Soroti School of Comprehensive Nursing was established to address the healthcare training needs of Eastern Uganda."
  },
  {
    year: "1985",
    title: "Program Expansion",
    description: "Expanded to include midwifery training programs, responding to community healthcare needs."
  },
  {
    year: "2000",
    title: "Modern Facilities",
    description: "Major infrastructure development including new laboratories and simulation centers."
  },
  {
    year: "2015",
    title: "E-Learning Launch",
    description: "Introduced distance learning programs to increase accessibility for working professionals."
  },
  {
    year: "2024",
    title: "Continued Excellence",
    description: "Continuing to train competent healthcare professionals serving communities across Uganda."
  }
]

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We instill empathy and compassionate care as fundamental values in all our graduates."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest standards in education, training, and professional practice."
  },
  {
    icon: Users,
    title: "Integrity",
    description: "We uphold ethical standards and professional conduct in all our activities."
  },
  {
    icon: BookOpen,
    title: "Innovation",
    description: "We embrace modern teaching methods and technologies to enhance learning outcomes."
  }
]

const leadership = [
  {
    title: "Principal",
    description: "Provides strategic leadership and oversees all academic and administrative functions."
  },
  {
    title: "Academic Registrar",
    description: "Manages student admissions, records, and academic affairs."
  },
  {
    title: "Dean of Students",
    description: "Coordinates student welfare, activities, and support services."
  },
  {
    title: "Clinical Coordinator",
    description: "Oversees clinical placements and practical training partnerships."
  }
]

export function AboutContent() {
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
            <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">About Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              About <span className="gradient-text">Soroti School of Comprehensive Nursing</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              A government-accredited institution dedicated to training competent and compassionate healthcare professionals 
              in nursing and midwifery since 1970.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission */}
            <Card className="p-8 border-sky-100 hover:shadow-xl transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="text-foreground/70 leading-relaxed">
                  To provide high-quality, accessible nursing and midwifery education that equips students with the 
                  knowledge, skills, and ethical values necessary to deliver exceptional healthcare services to 
                  communities in Uganda and beyond.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="p-8 border-sky-100 hover:shadow-xl transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Our Vision</h2>
                <p className="text-foreground/70 leading-relaxed">
                  To be a leading center of excellence in nursing and midwifery education in East Africa, recognized 
                  for producing competent, compassionate, and innovative healthcare professionals who transform 
                  community health outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              What We Stand For
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Our core values guide everything we do, from curriculum development to student support.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white border border-sky-100 hover:shadow-xl hover:border-sky-300 transition-all">
                <div className="w-16 h-16 rounded-xl bg-sky-500/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-foreground/60 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">Our History</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              A Legacy of Excellence
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              For over five decades, we have been shaping healthcare professionals who serve communities across Uganda.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-sky-200" />
              
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-6 mb-8 last:mb-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg z-10 flex-shrink-0">
                    {item.year}
                  </div>
                  <div className="flex-1 p-6 rounded-2xl bg-white border border-sky-100 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-foreground/60">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Structure */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">Leadership</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Our Administrative Structure
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Our dedicated leadership team ensures the smooth operation and continued excellence of our institution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {leadership.map((role, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-sky-100 hover:shadow-xl hover:border-sky-300 transition-all">
                <div className="w-14 h-14 rounded-xl bg-sky-500/10 flex items-center justify-center mb-4">
                  <GraduationCap className="w-7 h-7 text-sky-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{role.title}</h3>
                <p className="text-foreground/60 text-sm">{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">Facilities</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Our Campus & Facilities
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Modern facilities designed to provide students with the best possible learning environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Building2, title: "Modern Classrooms", description: "Well-equipped classrooms with audio-visual teaching aids for effective learning." },
              { icon: Cross, title: "Science Laboratories", description: "Fully equipped laboratories for practical training in anatomy, physiology, and microbiology." },
              { icon: BookOpen, title: "Library Resources", description: "A comprehensive library with nursing and midwifery textbooks, journals, and digital resources." },
              { icon: Users, title: "Simulation Center", description: "Modern simulation facilities for clinical skills practice in a controlled environment." },
              { icon: Clock, title: "Computer Lab", description: "Computer laboratory for e-learning programs and digital literacy training." },
              { icon: Heart, title: "Clinical Training Sites", description: "Partnerships with regional hospitals for hands-on clinical experience." }
            ].map((facility, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-sky-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center mb-4">
                  <facility.icon className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{facility.title}</h3>
                <p className="text-foreground/60 text-sm">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Life & Clubs */}
      <section id="student-life" className="py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">Student Life</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Clubs & Organizations
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Our students develop leadership skills and serve communities through active participation in recognized student organizations.
            </p>
          </div>

          {/* Infinite Scroll Clubs */}
          <div className="relative">
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            {/* Scrolling container */}
            <div className="flex gap-6 animate-scroll-x">
              {/* Red Cross Club */}
              <div className="flex-shrink-0 w-80 md:w-96 p-8 rounded-3xl bg-gradient-to-br from-red-50 to-white border-2 border-red-200 hover:shadow-2xl transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
                      <circle cx="50" cy="50" r="48" fill="white" stroke="#DC2626" strokeWidth="2"/>
                      <path d="M40 30H60V40H70V60H60V70H40V60H30V40H40V30Z" fill="#DC2626"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Red Cross Club</h3>
                    <p className="text-red-600 text-sm font-medium">Uganda Red Cross Society</p>
                  </div>
                </div>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Part of the global Red Cross and Red Crescent Movement. Members participate in community health outreach, first aid training, disaster response, and humanitarian activities.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["First Aid Training", "Health Outreach", "Blood Drives", "Disaster Response"].map((activity) => (
                    <span key={activity} className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rotaract Club */}
              <div className="flex-shrink-0 w-80 md:w-96 p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 hover:shadow-2xl transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
                      <circle cx="50" cy="50" r="45" stroke="#1D4ED8" strokeWidth="3" fill="white"/>
                      <line x1="50" y1="2" x2="50" y2="8" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="50" y1="92" x2="50" y2="98" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="2" y1="50" x2="8" y2="50" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="92" y1="50" x2="98" y2="50" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="15" y1="15" x2="20" y2="20" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="80" y1="80" x2="85" y2="85" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="85" y1="15" x2="80" y2="20" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="20" y1="80" x2="15" y2="85" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
                      <circle cx="50" cy="50" r="25" stroke="#1D4ED8" strokeWidth="3" fill="none"/>
                      <circle cx="50" cy="50" r="5" fill="#1D4ED8"/>
                      <circle cx="50" cy="30" r="3" fill="#1D4ED8"/>
                      <circle cx="50" cy="70" r="3" fill="#1D4ED8"/>
                      <circle cx="30" cy="50" r="3" fill="#1D4ED8"/>
                      <circle cx="70" cy="50" r="3" fill="#1D4ED8"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Rotaract Club</h3>
                    <p className="text-blue-600 text-sm font-medium">Rotary International</p>
                  </div>
                </div>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Sponsored by the Rotary Club of Soroti and part of Rotary International's global network. Focuses on professional development, community service, and international understanding.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Professional Development", "Community Service", "Leadership Training", "Networking"].map((activity) => (
                    <span key={activity} className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              {/* UNESCO Club */}
              <div className="flex-shrink-0 w-80 md:w-96 p-8 rounded-3xl bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 hover:shadow-2xl transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
                      <circle cx="50" cy="50" r="48" fill="white"/>
                      <circle cx="50" cy="50" r="45" stroke="#0D9488" strokeWidth="3" fill="none"/>
                      <rect x="25" y="40" width="4" height="30" fill="#0D9488"/>
                      <rect x="35" y="40" width="4" height="30" fill="#0D9488"/>
                      <rect x="45" y="40" width="4" height="30" fill="#0D9488"/>
                      <rect x="55" y="40" width="4" height="30" fill="#0D9488"/>
                      <rect x="65" y="40" width="4" height="30" fill="#0D9488"/>
                      <path d="M20 40 L50 20 L80 40 Z" fill="#0D9488"/>
                      <rect x="20" y="70" width="54" height="5" fill="#0D9488"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">UNESCO Club</h3>
                    <p className="text-teal-600 text-sm font-medium">UNESCO</p>
                  </div>
                </div>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Part of the global UNESCO movement promoting peace through education, science, culture, and communication. Focuses on sustainable development goals and health education.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["SDG Awareness", "Cultural Heritage", "Health Education", "Environmental Conservation"].map((activity) => (
                    <span key={activity} className="px-3 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-700">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Duplicated cards for seamless loop */}
              {/* Red Cross Club (duplicate) */}
              <div className="flex-shrink-0 w-80 md:w-96 p-8 rounded-3xl bg-gradient-to-br from-red-50 to-white border-2 border-red-200 hover:shadow-2xl transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
                      <circle cx="50" cy="50" r="48" fill="white" stroke="#DC2626" strokeWidth="2"/>
                      <path d="M40 30H60V40H70V60H60V70H40V60H30V40H40V30Z" fill="#DC2626"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Red Cross Club</h3>
                    <p className="text-red-600 text-sm font-medium">Uganda Red Cross Society</p>
                  </div>
                </div>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Part of the global Red Cross and Red Crescent Movement. Members participate in community health outreach, first aid training, disaster response, and humanitarian activities.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["First Aid Training", "Health Outreach", "Blood Drives", "Disaster Response"].map((activity) => (
                    <span key={activity} className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rotaract Club (duplicate) */}
              <div className="flex-shrink-0 w-80 md:w-96 p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 hover:shadow-2xl transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
                      <circle cx="50" cy="50" r="45" stroke="#1D4ED8" strokeWidth="3" fill="white"/>
                      <line x1="50" y1="2" x2="50" y2="8" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="50" y1="92" x2="50" y2="98" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="2" y1="50" x2="8" y2="50" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="92" y1="50" x2="98" y2="50" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
                      <circle cx="50" cy="50" r="25" stroke="#1D4ED8" strokeWidth="3" fill="none"/>
                      <circle cx="50" cy="50" r="5" fill="#1D4ED8"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Rotaract Club</h3>
                    <p className="text-blue-600 text-sm font-medium">Rotary International</p>
                  </div>
                </div>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Sponsored by the Rotary Club of Soroti and part of Rotary International's global network. Focuses on professional development, community service, and international understanding.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Professional Development", "Community Service", "Leadership Training", "Networking"].map((activity) => (
                    <span key={activity} className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              {/* UNESCO Club (duplicate) */}
              <div className="flex-shrink-0 w-80 md:w-96 p-8 rounded-3xl bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 hover:shadow-2xl transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
                      <circle cx="50" cy="50" r="48" fill="white"/>
                      <circle cx="50" cy="50" r="45" stroke="#0D9488" strokeWidth="3" fill="none"/>
                      <rect x="25" y="40" width="4" height="30" fill="#0D9488"/>
                      <rect x="35" y="40" width="4" height="30" fill="#0D9488"/>
                      <rect x="45" y="40" width="4" height="30" fill="#0D9488"/>
                      <rect x="55" y="40" width="4" height="30" fill="#0D9488"/>
                      <rect x="65" y="40" width="4" height="30" fill="#0D9488"/>
                      <path d="M20 40 L50 20 L80 40 Z" fill="#0D9488"/>
                      <rect x="20" y="70" width="54" height="5" fill="#0D9488"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">UNESCO Club</h3>
                    <p className="text-teal-600 text-sm font-medium">UNESCO</p>
                  </div>
                </div>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Part of the global UNESCO movement promoting peace through education, science, culture, and communication. Focuses on sustainable development goals and health education.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["SDG Awareness", "Cultural Heritage", "Health Education", "Environmental Conservation"].map((activity) => (
                    <span key={activity} className="px-3 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-700">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Membership in these clubs is open to all registered students. Participation helps students develop professional skills, build networks, and contribute to community development.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Join Our Institution?
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Take the first step toward a rewarding career in healthcare. Explore our programs or contact us for more information.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg">
                <Link href="/programs">
                  Explore Programs
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-sky-200 hover:border-sky-400 hover:bg-sky-50">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
