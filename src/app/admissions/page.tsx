import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import { 
  FileText,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Download,
  ArrowRight,
  GraduationCap,
  Users,
  CreditCard,
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'

const steps = [
  { step: 1, title: "Check Requirements", description: "Review the entry requirements for your chosen program." },
  { step: 2, title: "Prepare Documents", description: "Gather certified copies of academic documents, photos, and ID." },
  { step: 3, title: "Submit Application", description: "Complete the application form and pay the application fee." },
  { step: 4, title: "Await Response", description: "Application review takes 2-4 weeks. You'll be notified via email." }
]

const requirements = [
  { program: "Diploma Programs", requirements: ["UCE with 5 passes (including English, Math, Biology)", "UACE with at least 1 principal pass", "Certified academic documents", "4 passport photographs"] },
  { program: "Extension Programs", requirements: ["Certificate in Nursing/Midwifery", "Valid practicing license", "2+ years work experience", "Employer recommendation"] }
]

const fees = [
  { item: "Application Form", amount: "UGX 50,000" },
  { item: "Tuition (Per Semester)", amount: "UGX 700,000 - 900,000" },
  { item: "Registration Fee", amount: "UGX 100,000" },
  { item: "Examination Fee", amount: "UGX 150,000" },
  { item: "Student ID", amount: "UGX 30,000" },
  { item: "Clinical Uniforms", amount: "UGX 200,000" }
]

const dates = [
  { event: "Application Opens", date: "January 15, 2025" },
  { event: "Application Deadline", date: "May 31, 2025" },
  { event: "Interviews", date: "June 15-30, 2025" },
  { event: "Admission Letters", date: "July 15, 2025" },
  { event: "Semester Begins", date: "September 1, 2025" }
]

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 h-[450px]">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&h=600&fit=crop&auto=format"
              alt="Students"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/70 to-emerald-600/50" />
          </div>
          
          <div className="relative container mx-auto px-4 py-20">
            <div className="max-w-2xl text-white">
              <Badge className="bg-white/20 text-white mb-4 px-4 py-1">Admissions</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Begin Your Journey in Healthcare
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Take the first step toward a rewarding career in nursing or midwifery. 
                Join SSCN and become part of Uganda's healthcare transformation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-green-600 hover:bg-green-50">
                  <a href="#apply">
                    Apply Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="white-outline" className="backdrop-blur-sm">
                  <Link href="#requirements">
                    View Requirements
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Dates Banner */}
        <section className="py-4 bg-green-600 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 overflow-x-auto">
              <Badge className="bg-white/20 shrink-0 text-white">
                <Calendar className="w-3 h-3 mr-1" />
                Key Dates
              </Badge>
              <div className="flex gap-8 text-sm">
                {dates.slice(0, 3).map((item, i) => (
                  <span key={i} className="whitespace-nowrap">
                    <strong>{item.event}:</strong> {item.date}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Admission Steps */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-green-600 border-green-200 mb-4">How to Apply</Badge>
              <h2 className="text-3xl font-bold">Admission Process</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((item, i) => (
                <div key={i} className="relative">
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                        {item.step}
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </CardContent>
                  </Card>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 text-green-300" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section id="requirements" className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-green-600 border-green-200 mb-4">Entry Requirements</Badge>
              <h2 className="text-3xl font-bold">What You Need to Apply</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {requirements.map((item, i) => (
                <Card key={i} className="shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-green-600" />
                      {item.program}
                    </h3>
                    <ul className="space-y-3">
                      {item.requirements.map((req, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Fees Structure */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge variant="outline" className="text-green-600 border-green-200 mb-4">Fees</Badge>
                <h2 className="text-3xl font-bold mb-4">Fee Structure</h2>
                <p className="text-gray-600 mb-6">
                  SSCN offers affordable, quality nursing education with flexible payment plans. 
                  Government scholarships are available for qualifying students.
                </p>

                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-green-50">
                          <th className="text-left p-4 font-medium">Item</th>
                          <th className="text-right p-4 font-medium">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fees.map((item, i) => (
                          <tr key={i} className="border-b">
                            <td className="p-4">{item.item}</td>
                            <td className="p-4 text-right font-medium">{item.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                <div className="flex items-center gap-4 mt-6">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Full Fee Structure
                  </Button>
                </div>
              </div>

              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop&auto=format"
                  alt="Students studying"
                  className="rounded-2xl shadow-xl w-full"
                />
                <Card className="absolute -bottom-6 -left-6 max-w-xs shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-10 h-10 text-green-500" />
                      <div>
                        <p className="font-semibold">Flexible Payment</p>
                        <p className="text-sm text-gray-500">Pay in 2-3 installments</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="py-16 bg-gradient-to-b from-green-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Badge variant="outline" className="text-green-600 border-green-200 mb-4">Apply Now</Badge>
                <h2 className="text-3xl font-bold">Submit Your Application</h2>
                <p className="text-gray-600 mt-2">
                  Fill out the form below to start your application. Our admissions team will contact you within 2-3 business days.
                </p>
              </div>

              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="John" className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Doe" className="mt-1" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" placeholder="john@example.com" className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" placeholder="+256 XXX XXX XXX" className="mt-1" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="program">Program of Interest *</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nursing">Diploma in Nursing</SelectItem>
                          <SelectItem value="midwifery">Diploma in Midwifery</SelectItem>
                          <SelectItem value="extension">Nursing Extension</SelectItem>
                          <SelectItem value="elearning">E-Learning Program</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="education">Previous Education</Label>
                      <Textarea 
                        id="education" 
                        placeholder="List your educational background, including schools attended and qualifications obtained..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-700">
                        After submitting this form, you will need to provide certified copies of your academic documents 
                        and pay the application fee to complete your application.
                      </p>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 h-12 text-lg">
                      Submit Application
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Need Help With Your Application?</h2>
              <p className="text-white/80 mb-8">
                Our admissions team is here to help you through every step of the application process.
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>+256 393 249195</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>admissions@sscn.ac.ug</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Soroti City, Uganda</span>
                </div>
              </div>

              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-green-50">
                <Link href="/contact">
                  Contact Admissions Office
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
