'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Heart,
  Stethoscope,
  GraduationCap,
  BookOpen,
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Users,
  Building2,
  Cross
} from 'lucide-react'

const programs = [
  {
    id: "nursing",
    title: "Diploma in Nursing",
    duration: "3 Years",
    description: "Comprehensive training in patient care, medical administration, and clinical practice. This program prepares students to become registered nurses capable of providing quality healthcare services in various settings.",
    icon: Heart,
    color: "from-sky-500 to-blue-600",
    features: [
      "Clinical rotations in regional hospitals",
      "Hands-on laboratory training",
      "Community health nursing",
      "Medical-surgical nursing",
      "Pediatric and obstetric nursing",
      "Mental health nursing"
    ],
    requirements: [
      "Uganda Certificate of Education (UCE) with at least 5 passes including English, Mathematics, and Science subjects",
      "Uganda Advanced Certificate of Education (UACE) with at least 1 principal pass in a science subject",
      "Minimum age of 18 years"
    ],
    careers: [
      "Registered Nurse in hospitals and clinics",
      "Community Health Nurse",
      "School Nurse",
      "Occupational Health Nurse",
      "Nursing Administrator"
    ]
  },
  {
    id: "midwifery",
    title: "Diploma in Midwifery",
    duration: "3 Years",
    description: "Specialized training in maternal and child health. Students develop expertise in prenatal care, normal and complicated deliveries, postnatal care, and neonatal care to become skilled midwives.",
    icon: Stethoscope,
    color: "from-pink-500 to-rose-600",
    features: [
      "Prenatal and antenatal care",
      "Normal and complicated delivery management",
      "Postnatal care",
      "Neonatal care and resuscitation",
      "Family planning services",
      "Community midwifery"
    ],
    requirements: [
      "Uganda Certificate of Education (UCE) with at least 5 passes including English, Mathematics, and Biology",
      "Uganda Advanced Certificate of Education (UACE) with at least 1 principal pass in Biology",
      "Minimum age of 18 years"
    ],
    careers: [
      "Registered Midwife",
      "Maternal and Child Health Specialist",
      "Labor and Delivery Nurse",
      "Antenatal Care Provider",
      "Community Midwife"
    ]
  },
  {
    id: "nursing-extension",
    title: "Diploma in Nursing (Extension)",
    duration: "2 Years",
    description: "An upgrade program designed for enrolled nurses who wish to obtain a diploma qualification. This program builds on existing knowledge and skills while accommodating working professionals.",
    icon: GraduationCap,
    color: "from-violet-500 to-purple-600",
    features: [
      "Flexible scheduling for working nurses",
      "Weekend and evening classes available",
      "Advanced nursing practice",
      "Leadership and management",
      "Research methodology",
      "Evidence-based practice"
    ],
    requirements: [
      "Certificate in Nursing or Enrolled Nurse qualification",
      "Valid practicing license",
      "Minimum of 2 years working experience",
      "Recommendation from employer"
    ],
    careers: [
      "Senior Nursing Officer",
      "Nursing Supervisor",
      "Clinical Instructor",
      "Nursing Administrator",
      "Health Program Coordinator"
    ]
  },
  {
    id: "midwifery-extension",
    title: "Diploma in Midwifery (Extension)",
    duration: "2 Years",
    description: "An upgrade program for practicing midwives seeking to advance their qualifications. Designed to accommodate working professionals while building advanced midwifery competencies.",
    icon: Cross,
    color: "from-rose-500 to-pink-600",
    features: [
      "Advanced midwifery practice",
      "High-risk pregnancy management",
      "Emergency obstetric care",
      "Leadership in midwifery",
      "Quality improvement",
      "Research in maternal health"
    ],
    requirements: [
      "Certificate in Midwifery or Enrolled Midwife qualification",
      "Valid practicing license",
      "Minimum of 2 years working experience",
      "Recommendation from employer"
    ],
    careers: [
      "Senior Midwifery Officer",
      "Maternity Unit Manager",
      "Maternal Health Program Coordinator",
      "Clinical Midwifery Instructor",
      "Quality Assurance Officer"
    ]
  },
  {
    id: "elearning-nursing",
    title: "Diploma in Nursing (E-Learning)",
    duration: "Flexible",
    description: "A flexible online learning program delivering our comprehensive nursing curriculum for students who require distance learning options. Combines online theoretical instruction with clinical placements.",
    icon: BookOpen,
    color: "from-amber-500 to-orange-600",
    features: [
      "Online theoretical instruction",
      "Self-paced learning modules",
      "Virtual simulations",
      "Clinical placement coordination",
      "24/7 resource access",
      "Online tutor support"
    ],
    requirements: [
      "Same academic requirements as regular Diploma in Nursing",
      "Access to a computer or smartphone with internet",
      "Basic computer literacy",
      "Ability to attend scheduled clinical placements"
    ],
    careers: [
      "Registered Nurse",
      "Community Health Nurse",
      "Clinical Nurse",
      "Nursing Officer",
      "Health Educator"
    ]
  },
  {
    id: "elearning-midwifery",
    title: "Diploma in Midwifery (E-Learning)",
    duration: "Flexible",
    description: "Flexible distance learning for the midwifery diploma program. Ideal for students who cannot attend regular classes but still want quality midwifery education.",
    icon: BookOpen,
    color: "from-teal-500 to-cyan-600",
    features: [
      "Comprehensive online curriculum",
      "Interactive learning materials",
      "Virtual clinical simulations",
      "Coordinated clinical placements",
      "Flexible study schedule",
      "Online assessments"
    ],
    requirements: [
      "Same academic requirements as regular Diploma in Midwifery",
      "Access to a computer or smartphone with internet",
      "Basic computer literacy",
      "Ability to attend scheduled clinical placements"
    ],
    careers: [
      "Registered Midwife",
      "Maternal Health Nurse",
      "Community Midwife",
      "Antenatal Educator",
      "Birth Companion"
    ]
  }
]

export function ProgramsContent() {
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
            <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">Our Programs</Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Academic <span className="gradient-text">Programs</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We offer comprehensive diploma programs designed to prepare students for professional careers 
              in nursing and midwifery. Choose the program that best fits your career goals.
            </p>
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {programs.map((program, index) => (
              <div key={program.id} id={program.id} className="scroll-mt-24">
                <Card className="overflow-hidden border-sky-100 hover:shadow-2xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-muted/50 to-muted/30 p-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <program.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <CardTitle className="text-2xl md:text-3xl">{program.title}</CardTitle>
                          <Badge variant="secondary" className="text-sm">{program.duration}</Badge>
                        </div>
                        <CardDescription className="text-foreground/70 text-base">
                          {program.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Features */}
                      <div>
                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-sky-600" />
                          What You'll Learn
                        </h4>
                        <ul className="space-y-2">
                          {program.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-foreground/70">
                              <CheckCircle2 className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Requirements */}
                      <div>
                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-sky-600" />
                          Entry Requirements
                        </h4>
                        <ul className="space-y-2">
                          {program.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-foreground/70">
                              <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0" />
                              <span className="text-sm">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Career Opportunities */}
                      <div>
                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-sky-600" />
                          Career Opportunities
                        </h4>
                        <ul className="space-y-2">
                          {program.careers.map((career, i) => (
                            <li key={i} className="flex items-start gap-2 text-foreground/70">
                              <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0" />
                              <span className="text-sm">{career}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t flex flex-wrap gap-4">
                      <Button asChild className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white">
                        <Link href="/admissions">
                          Admission Information
                          <ChevronRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="border-sky-200 text-sky-600 hover:bg-sky-50">
                        <Link href="/contact">
                          Inquire About This Program
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Study With Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">Why Study With Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Quality Education, Proven Results
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Our programs are designed to provide you with the knowledge and skills needed for a successful healthcare career.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Building2, title: "Modern Facilities", description: "State-of-the-art laboratories and simulation centers" },
              { icon: Users, title: "Expert Faculty", description: "Experienced healthcare professionals as instructors" },
              { icon: Clock, title: "Flexible Schedules", description: "Multiple study modes to fit your lifestyle" },
              { icon: CheckCircle2, title: "High Success Rate", description: "Consistently strong examination performance" }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white border border-sky-100 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-sky-500/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-sky-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground/60 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Your Healthcare Career?
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Contact us to learn more about our programs, admission requirements, and enrollment dates.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg">
                <Link href="/admissions">
                  Admission Information
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
