'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChevronRight,
  CheckCircle2,
  FileText,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Users,
  CreditCard,
  HelpCircle,
  ClipboardCheck,
  BookOpen,
  AlertCircle
} from 'lucide-react'

const generalRequirements = [
  "Uganda Certificate of Education (UCE) with at least 5 passes including English, Mathematics, and relevant Science subjects",
  "Uganda Advanced Certificate of Education (UACE) with at least 1 principal pass in a relevant subject",
  "Minimum age of 18 years at the time of enrollment",
  "Medical fitness certificate from a recognized health facility",
  "Letter of recommendation from previous school or employer",
  "Recent passport-size photographs (4 copies)",
  "Birth certificate (certified copy)",
  "Valid national ID or passport"
]

const applicationSteps = [
  {
    step: 1,
    title: "Obtain Application Form",
    description: "Visit our campus in Soroti City to pick up an application form, or contact us via phone or email to request one."
  },
  {
    step: 2,
    title: "Complete the Form",
    description: "Fill out the application form completely and accurately. Ensure all required fields are completed."
  },
  {
    step: 3,
    title: "Gather Required Documents",
    description: "Prepare all necessary documents including academic certificates, ID, photographs, and recommendation letters."
  },
  {
    step: 4,
    title: "Submit Application",
    description: "Submit your completed application form and documents to the admissions office at our campus."
  },
  {
    step: 5,
    title: "Await Response",
    description: "Your application will be reviewed. Successful applicants will be contacted with further instructions."
  }
]

const importantDates = [
  { event: "Application Period", date: "January - March 2026" },
  { event: "Application Review", date: "March - April 2026" },
  { event: "Interviews (if applicable)", date: "April 2026" },
  { event: "Admission Lists Released", date: "May 2026" },
  { event: "Reporting Date", date: "August 2026" },
  { event: "Orientation Week", date: "First Week of August 2026" }
]

const feesInfo = [
  { item: "Tuition (per semester)", note: "Contact the school for current rates" },
  { item: "Registration Fee", note: "One-time payment at enrollment" },
  { item: "Examination Fees", note: "Payable per examination session" },
  { item: "Laboratory/Practical Fees", note: "Per semester" },
  { item: "Library Fee", note: "Annual fee" },
  { item: "Student ID Card", note: "One-time payment" }
]

const faqs = [
  {
    question: "What are the minimum academic requirements?",
    answer: "Applicants need UCE with at least 5 passes including English, Mathematics, and Science subjects, plus UACE with at least 1 principal pass in a relevant subject. Specific programs may have additional requirements."
  },
  {
    question: "Is there an age limit for admission?",
    answer: "The minimum age for admission is 18 years. There is no upper age limit for applicants who meet the academic requirements."
  },
  {
    question: "Can I apply for more than one program?",
    answer: "Yes, you can indicate multiple program preferences on your application form. Admission will be offered based on qualifications and available space."
  },
  {
    question: "Are there evening or weekend classes?",
    answer: "Extension programs offer flexible scheduling including weekend and evening classes. Regular diploma programs follow a daytime schedule."
  },
  {
    question: "Is accommodation available?",
    answer: "Limited on-campus accommodation is available. Students can also find affordable housing in the surrounding community."
  },
  {
    question: "What is the duration of the programs?",
    answer: "Regular diploma programs (Nursing and Midwifery) are 3 years. Extension programs are 2 years. E-Learning programs have flexible durations."
  }
]

export function AdmissionsContent() {
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
            <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">Admissions</Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Join <span className="gradient-text">SSCN</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Begin your journey toward a rewarding career in healthcare. Learn about our admission requirements, 
              application process, and important dates.
            </p>
          </div>
        </div>
      </section>

      {/* Alert Banner */}
      <section className="bg-sky-50 border-y border-sky-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 text-sky-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">
              <strong>Note:</strong> Applications for the 2026 intake are now open. Contact our admissions office for the application form.
            </p>
          </div>
        </div>
      </section>

      {/* General Requirements */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">Requirements</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                General Admission Requirements
              </h2>
              <p className="text-foreground/60">
                To be considered for admission to any of our programs, applicants must meet the following general requirements. 
                Specific programs may have additional requirements.
              </p>
              
              <div className="space-y-3">
                {generalRequirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-sky-50 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80 text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">How to Apply</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Application Process
              </h2>
              <p className="text-foreground/60">
                Follow these steps to apply for admission to Soroti School of Comprehensive Nursing.
              </p>

              <div className="space-y-4">
                {applicationSteps.map((step) => (
                  <div key={step.step} className="flex gap-4 p-4 rounded-xl bg-white border border-sky-100 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold">{step.title}</h4>
                      <p className="text-foreground/60 text-sm mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">Timeline</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Important Dates for 2026 Intake
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Mark these important dates in your calendar to ensure you don't miss any deadlines.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-4">
              {importantDates.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-sky-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{item.event}</h4>
                    <p className="text-sky-600 font-semibold">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fees Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">Fees</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Fees & Payment Information
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              For detailed and up-to-date fee structures, please contact our admissions office directly. 
              Fees vary by program and are subject to periodic review.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="border-sky-100">
              <CardHeader className="bg-gradient-to-br from-muted/50 to-muted/30">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-sky-600" />
                  Fee Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {feesInfo.map((item, i) => (
                    <div key={i} className="flex justify-between items-start py-3 border-b last:border-0">
                      <span className="font-medium">{item.item}</span>
                      <span className="text-foreground/60 text-sm text-right">{item.note}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg bg-sky-50 border border-sky-100">
                  <p className="text-sm text-foreground/70">
                    <strong>Payment Options:</strong> Fees can be paid in installments. Please contact the bursar's office 
                    for payment plans and bank details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Find answers to common questions about admissions at SSCN.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="border-sky-100 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-foreground/70 ml-8">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-sky-100 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 bg-gradient-to-br from-sky-500 to-blue-600 text-white">
                  <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                  <p className="text-white/80 mb-6">
                    Contact our admissions office for application forms, fee structures, and any additional information you need.
                  </p>
                  <Button asChild size="lg" className="bg-white text-sky-600 hover:bg-white/90">
                    <Link href="/contact">
                      Contact Admissions
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
                <div className="p-8 bg-muted/50">
                  <h4 className="font-semibold text-lg mb-6">Admissions Office</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-sky-600" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-foreground/60 text-sm">Soroti City, Uganda</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-sky-600" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href="tel:+256393249195" className="text-foreground/60 text-sm hover:text-sky-600">+256 393 249195</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-sky-600" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:sscn16@gmail.com" className="text-foreground/60 text-sm hover:text-sky-600">sscn16@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-sky-600" />
                      <div>
                        <p className="font-medium">Office Hours</p>
                        <p className="text-foreground/60 text-sm">Mon-Fri, 8:00 AM - 5:00 PM EAT</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
