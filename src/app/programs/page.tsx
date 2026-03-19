import { db } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import { 
  Heart, 
  Stethoscope, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Users,
  CheckCircle,
  ArrowRight,
  Award,
  Building2,
  Target
} from 'lucide-react'
import Link from 'next/link'

const programs = [
  {
    title: "Diploma in Nursing",
    code: "DN",
    duration: "3 Years",
    level: "Diploma",
    mode: "Full-time",
    intake: "September",
    description: "Comprehensive training in patient care, medical administration, and clinical practice. Students develop expertise in medical-surgical nursing, community health, mental health nursing, and pediatric nursing.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=500&fit=crop&auto=format",
    icon: Heart,
    color: "from-sky-500 to-blue-600",
    requirements: [
      "Uganda Certificate of Education (UCE) with at least 5 passes",
      "Uganda Advanced Certificate of Education (UACE) with at least 1 principal pass",
      "Certified copies of academic documents",
      "Recent passport photographs"
    ],
    careers: ["Staff Nurse", "Nursing Officer", "Clinical Instructor", "Community Health Nurse"]
  },
  {
    title: "Diploma in Midwifery",
    code: "DM",
    duration: "3 Years", 
    level: "Diploma",
    mode: "Full-time",
    intake: "September",
    description: "Specialized training in maternal and child health. Students develop expertise in prenatal care, labor and delivery assistance, postnatal care, and neonatal care.",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=500&fit=crop&auto=format",
    icon: Stethoscope,
    color: "from-pink-500 to-rose-600",
    requirements: [
      "Uganda Certificate of Education (UCE) with at least 5 passes",
      "Uganda Advanced Certificate of Education (UACE) with at least 1 principal pass",
      "Certified copies of academic documents",
      "Recent passport photographs"
    ],
    careers: ["Midwife", "Maternal Health Specialist", "Antenatal Care Provider", "Neonatal Care Specialist"]
  },
  {
    title: "Nursing Extension Program",
    code: "DNE",
    duration: "2 Years",
    level: "Diploma",
    mode: "Part-time/Weekend",
    intake: "January & July",
    description: "An upgrade program designed for practicing enrolled nurses seeking to obtain a diploma qualification. Flexible scheduling accommodates working professionals.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop&auto=format",
    icon: GraduationCap,
    color: "from-violet-500 to-purple-600",
    requirements: [
      "Certificate in Nursing or Enrolled Nurse qualification",
      "Valid practicing license",
      "At least 2 years of work experience",
      "Letter of recommendation from employer"
    ],
    careers: ["Senior Nursing Officer", "Ward Manager", "Nursing Administrator", "Clinical Supervisor"]
  },
  {
    title: "E-Learning Nursing Program",
    code: "ELN",
    duration: "Flexible",
    level: "Diploma",
    mode: "Online/Hybrid",
    intake: "Rolling",
    description: "Distance learning option for students who require flexible study arrangements. Combines online coursework with scheduled clinical placements.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop&auto=format",
    icon: BookOpen,
    color: "from-amber-500 to-orange-600",
    requirements: [
      "Same academic requirements as regular programs",
      "Access to computer and internet",
      "Ability to attend clinical placements",
      "Self-discipline for independent study"
    ],
    careers: ["Staff Nurse", "Telehealth Nurse", "Nurse Educator", "Health Informatics Specialist"]
  }
]

export default async function ProgramsPage() {
  const dbPrograms = await db.program.findMany({
    where: { published: true },
    orderBy: { order: 'asc' }
  })

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=500&fit=crop&auto=format"
              alt="Nursing education"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-sky-800/70 to-transparent" />
          </div>
          
          <div className="relative container mx-auto px-4 py-20">
            <div className="max-w-2xl text-white">
              <Badge className="bg-white/20 text-white mb-4">Academic Programs</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our Programs
              </h1>
              <p className="text-lg text-white/80">
                Quality nursing and midwifery education programs designed to prepare competent, 
                compassionate healthcare professionals for Uganda's health sector.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "4", label: "Programs Offered" },
                { number: "500+", label: "Students Enrolled" },
                { number: "20+", label: "Partner Hospitals" },
                { number: "95%", label: "Employment Rate" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-sky-600">{stat.number}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {programs.map((program, i) => (
                <Card key={i} className="overflow-hidden shadow-xl border-0">
                  <div className="grid lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative h-64 lg:h-auto">
                      <img 
                        src={program.image} 
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r" />
                      <Badge className={`absolute top-4 left-4 bg-gradient-to-r ${program.color} text-white`}>
                        {program.code}
                      </Badge>
                    </div>

                    {/* Content */}
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center`}>
                          <program.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{program.title}</h2>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="outline">{program.level}</Badge>
                            <Badge variant="secondary">{program.duration}</Badge>
                            <Badge variant="secondary">{program.mode}</Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6">{program.description}</p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-sky-500" />
                            Entry Requirements
                          </h4>
                          <ul className="space-y-2">
                            {program.requirements.map((req, j) => (
                              <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4 text-green-500" />
                            Career Opportunities
                          </h4>
                          <ul className="space-y-2">
                            {program.careers.map((career, j) => (
                              <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                {career}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-6 pt-6 border-t">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          Intake: {program.intake}
                        </div>
                        <Button asChild className="ml-auto bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700">
                          <Link href="/admissions">
                            Apply Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Study With Us */}
        <section className="py-16 bg-gradient-to-b from-sky-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-sky-600 border-sky-200 mb-4">Why Choose Us</Badge>
              <h2 className="text-3xl font-bold">Why Study at SSCN?</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Award, title: "Accredited Programs", description: "All programs are fully accredited by Uganda's Ministry of Education and professional councils." },
                { icon: Building2, title: "Clinical Partnerships", description: "Strong partnerships with regional hospitals for quality clinical placements." },
                { icon: Users, title: "Experienced Faculty", description: "Learn from qualified healthcare professionals with years of practical experience." }
              ].map((item, i) => (
                <Card key={i} className="text-center hover:shadow-lg transition-shadow border-0 bg-white">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7 text-sky-600" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-sky-500 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Healthcare Career?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Take the first step towards a rewarding career in nursing or midwifery. 
              Applications for the next intake are now open.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-sky-600 hover:bg-sky-50">
                <Link href="/admissions">
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="white-outline" className="backdrop-blur-sm">
                <Link href="/contact">
                  Contact Admissions
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
