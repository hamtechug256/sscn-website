import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import Link from 'next/link'
import { 
  BookOpen, 
  PlayCircle, 
  FileText, 
  Clock, 
  Users,
  ArrowRight,
  CheckCircle,
  Laptop
} from 'lucide-react'

const courses = [
  {
    id: 1,
    title: 'Fundamentals of Nursing',
    description: 'Introduction to nursing principles, patient care, and healthcare ethics',
    modules: 12,
    duration: '40 hours',
    enrolled: 156,
  },
  {
    id: 2,
    title: 'Midwifery Practice',
    description: 'Comprehensive training in maternal and child health nursing',
    modules: 15,
    duration: '50 hours',
    enrolled: 98,
  },
  {
    id: 3,
    title: 'Anatomy & Physiology',
    description: 'Study of human body structure and function',
    modules: 10,
    duration: '35 hours',
    enrolled: 210,
  },
  {
    id: 4,
    title: 'Clinical Nursing Skills',
    description: 'Practical nursing procedures and clinical techniques',
    modules: 8,
    duration: '30 hours',
    enrolled: 145,
  }
]

const features = [
  {
    icon: Laptop,
    title: 'Learn Anywhere',
    description: 'Access courses from any device, anytime, anywhere in Uganda'
  },
  {
    icon: PlayCircle,
    title: 'Video Lessons',
    description: 'Engaging video content from experienced healthcare educators'
  },
  {
    icon: FileText,
    title: 'Resources & Materials',
    description: 'Downloadable PDFs, presentations, and reference materials'
  },
  {
    icon: CheckCircle,
    title: 'Track Progress',
    description: 'Monitor your learning journey with progress tracking'
  }
]

export default function ELearningPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white mb-4">E-Learning Platform</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Online Learning Platform
              </h1>
              <p className="text-lg text-white/80">
                Access quality nursing education online. Learn at your own pace with interactive courses, video lessons, and assessments.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Button asChild className="bg-white text-blue-600 hover:bg-white/90">
                  <Link href="/student">Start Learning</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  Browse Courses
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <Card key={i} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Available Courses */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">Available Courses</h2>
                <p className="text-gray-500">Explore our online learning resources</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/student">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="h-32 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-blue-300 group-hover:scale-110 transition-transform" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {course.modules} modules
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                      <Users className="w-3 h-3" />
                      {course.enrolled} students enrolled
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Login to the student portal to access your enrolled courses, track your progress, and earn certificates.
            </p>
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-white/90">
              <Link href="/student">
                Go to Student Portal
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
