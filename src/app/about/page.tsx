import { db } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import { 
  Award, 
  Target, 
  Heart, 
  Users, 
  Building2, 
  BookOpen,
  Shield,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

async function getSettings() {
  const settings = await db.setting.findMany()
  const map: Record<string, string> = {}
  settings.forEach(s => { map[s.key] = s.value })
  return map
}

export default async function AboutPage() {
  const settings = await getSettings()

  const timeline = [
    { year: '1970', title: 'Founded', description: 'Soroti School of Comprehensive Nursing was established to train healthcare professionals for Eastern Uganda.' },
    { year: '1985', title: 'Expansion', description: 'Added midwifery program and expanded clinical training facilities.' },
    { year: '2000', title: 'Modernization', description: 'Upgraded laboratories and introduced computer training for students.' },
    { year: '2015', title: 'E-Learning', description: 'Launched distance learning programs for working professionals.' },
    { year: '2024', title: 'Digital Transformation', description: 'New modern website and student management system launched.' }
  ]

  const values = [
    { icon: Heart, title: 'Compassion', description: 'We instill empathy and caring in all our students.' },
    { icon: Award, title: 'Excellence', description: 'We strive for the highest standards in education and practice.' },
    { icon: Shield, title: 'Integrity', description: 'We uphold ethical conduct and professional honesty.' },
    { icon: Users, title: 'Teamwork', description: 'We promote collaboration and mutual respect.' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2187d80a16f3?w=1600&h=600&fit=crop&auto=format"
              alt="Healthcare education"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-sky-800/70 to-sky-700/50" />
          </div>
          
          <div className="relative container mx-auto px-4 py-24">
            <div className="max-w-2xl text-white">
              <Badge className="bg-white/20 text-white mb-4 px-4 py-1">About Us</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Soroti School of Comprehensive Nursing
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                A premier government institution dedicated to excellence in nursing and midwifery education since 1970. 
                Training compassionate healthcare professionals for Uganda and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 -mt-12 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-sky-500 to-blue-600" />
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center mb-4">
                    <Target className="w-7 h-7 text-sky-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {settings.mission || 'To provide quality, accessible, and affordable nursing and midwifery education that equips students with knowledge, skills, and attitudes to deliver comprehensive healthcare services to communities in Uganda and beyond.'}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600" />
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-4">
                    <Award className="w-7 h-7 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {settings.vision || 'To be a leading center of excellence in nursing and midwifery education, producing competent, compassionate, and ethical healthcare professionals who transform community health outcomes.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-sky-600 border-sky-200 mb-4">Our Values</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">What We Stand For</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <Card key={i} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-sky-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-500">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our History Timeline */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-sky-600 border-sky-200 mb-4">Our Journey</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Over 50 Years of Excellence</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-sky-200" />

                {timeline.map((item, i) => (
                  <div key={i} className={`relative flex items-center gap-8 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-sky-500 border-4 border-white shadow z-10" />

                    {/* Content */}
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <Badge className="bg-sky-100 text-sky-700 mb-2">{item.year}</Badge>
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>

                    <div className="hidden md:block md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-sky-600 border-sky-200 mb-4">Our Facilities</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Modern Learning Environment</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop&auto=format', title: 'Modern Library', desc: 'Comprehensive collection of nursing and medical textbooks, journals, and digital resources.' },
                { image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600&h=400&fit=crop&auto=format', title: 'Clinical Skills Lab', desc: 'State-of-the-art simulation equipment for practical training in a safe environment.' },
                { image: 'https://images.unsplash.com/photo-1576091160550-2187d80a16f3?w=600&h=400&fit=crop&auto=format', title: 'Training Facilities', desc: 'Modern classrooms equipped with audiovisual aids and interactive learning tools.' }
              ].map((facility, i) => (
                <Card key={i} className="overflow-hidden group hover:shadow-xl transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={facility.image} 
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold mb-2">{facility.title}</h3>
                    <p className="text-sm text-gray-500">{facility.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-sky-500 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
                <p className="text-white/80 mb-6">
                  Become part of a legacy of excellence in healthcare education. 
                  Start your journey towards a rewarding career in nursing or midwifery.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/admissions"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sky-600 rounded-xl font-semibold hover:bg-sky-50 transition-colors"
                  >
                    Apply Now
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold mb-4">Get in Touch</h3>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-sky-200" />
                  <span>{settings.address || 'Soroti City, Eastern Region, Uganda'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-sky-200" />
                  <span>{settings.phone_primary || '+256 393 249195'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-sky-200" />
                  <span>{settings.email || 'info@sscn.ac.ug'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
