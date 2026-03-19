import { Metadata } from 'next'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import { ContactContent } from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Soroti School of Comprehensive Nursing. Contact us for admissions inquiries, program information, or general questions. Located in Soroti City, Uganda.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <ContactContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
