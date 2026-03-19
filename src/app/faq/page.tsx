import { db } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import { HelpCircle, ChevronDown } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

// Force dynamic rendering for Netlify compatibility
export const dynamic = 'force-dynamic'

async function getActiveFAQs() {
  return db.fAQ.findMany({
    where: { active: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }]
  })
}

const categoryLabels: Record<string, string> = {
  'admission': 'Admissions',
  'academics': 'Academics',
  'fees': 'Fees & Payments',
  'general': 'General',
  'clinical': 'Clinical Training'
}

export default async function FAQPage() {
  const faqs = await getActiveFAQs()
  
  // Group by category
  const categories = faqs.reduce((acc, faq) => {
    const cat = faq.category || 'general'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(faq)
    return acc
  }, {} as Record<string, typeof faqs>)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white mb-4">FAQ</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-white/80">
                Find answers to common questions about admissions, programs, fees, and student life at SSCN
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {faqs.length === 0 ? (
              <Card className="p-8 text-center">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">FAQ content coming soon.</p>
              </Card>
            ) : (
              <div className="max-w-3xl mx-auto space-y-8">
                {Object.entries(categories).map(([category, categoryFaqs]) => (
                  <div key={category}>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-indigo-500" />
                      {categoryLabels[category] || category}
                    </h2>
                    <Accordion type="single" collapsible className="space-y-2">
                      {categoryFaqs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
                          <AccordionTrigger className="text-left font-medium hover:text-indigo-600">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Feel free to contact us.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
