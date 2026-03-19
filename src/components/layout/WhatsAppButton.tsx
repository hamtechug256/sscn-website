'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/256393249195"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all z-50 group animate-pulse-glow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" />
      <span className="absolute right-full mr-3 px-4 py-2 bg-white rounded-lg shadow-xl text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border">
        Chat with us
      </span>
    </a>
  )
}
