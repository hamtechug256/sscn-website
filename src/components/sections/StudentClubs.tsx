'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Heart } from 'lucide-react'

const clubs = [
  {
    name: "Red Cross Club",
    description: "Part of the global Red Cross and Red Crescent Movement, members participate in community health outreach, first aid training, disaster response preparedness, and humanitarian activities serving vulnerable communities in the Soroti region.",
    activities: [
      "First aid training & certification",
      "Community health outreach",
      "Blood donation drives",
      "Disaster preparedness",
      "Health education in schools"
    ],
    color: "red",
    affiliation: "Uganda Red Cross Society"
  },
  {
    name: "Rotaract Club",
    description: "Sponsored by the Rotary Club of Soroti and part of Rotary International's global network of young leaders, focusing on professional development, community service, and international understanding.",
    activities: [
      "Professional development",
      "Community service projects",
      "Leadership training",
      "International youth exchange",
      "Networking with Rotarians"
    ],
    color: "blue",
    affiliation: "Rotary International"
  },
  {
    name: "UNESCO Club",
    description: "Part of the global UNESCO movement promoting peace through education, science, culture, and communication. The club focuses on sustainable development goals, cultural heritage, and health education initiatives.",
    activities: [
      "SDG awareness programs",
      "Cultural heritage preservation",
      "Health education campaigns",
      "Peace & human rights education",
      "Environmental conservation"
    ],
    color: "teal",
    affiliation: "UNESCO"
  }
]

// Red Cross Logo SVG
function RedCrossLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="white" stroke="#DC2626" strokeWidth="2"/>
      <path d="M40 30H60V40H70V60H60V70H40V60H30V40H40V30Z" fill="#DC2626"/>
    </svg>
  )
}

// Rotaract Logo SVG (Rotary wheel)
function RotaractLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" stroke="#1D4ED8" strokeWidth="3" fill="white"/>
      <line x1="50" y1="2" x2="50" y2="8" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="50" y1="92" x2="50" y2="98" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="2" y1="50" x2="8" y2="50" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="92" y1="50" x2="98" y2="50" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="15" y1="15" x2="20" y2="20" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="80" y1="80" x2="85" y2="85" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="85" y1="15" x2="80" y2="20" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="20" y1="80" x2="15" y2="85" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="28" y1="8" x2="30" y2="14" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="70" y1="86" x2="72" y2="92" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="72" y1="8" x2="70" y2="14" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="28" y1="86" x2="30" y2="92" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="50" cy="50" r="25" stroke="#1D4ED8" strokeWidth="3" fill="none"/>
      <circle cx="50" cy="50" r="5" fill="#1D4ED8"/>
      <circle cx="50" cy="30" r="3" fill="#1D4ED8"/>
      <circle cx="50" cy="70" r="3" fill="#1D4ED8"/>
      <circle cx="30" cy="50" r="3" fill="#1D4ED8"/>
      <circle cx="70" cy="50" r="3" fill="#1D4ED8"/>
      <circle cx="37" cy="37" r="3" fill="#1D4ED8"/>
      <circle cx="63" cy="63" r="3" fill="#1D4ED8"/>
    </svg>
  )
}

// UNESCO Logo SVG
function UNESCOLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="white"/>
      <circle cx="50" cy="50" r="45" stroke="#0D9488" strokeWidth="3" fill="none"/>
      {/* Parthenon-style temple pillars */}
      <rect x="25" y="40" width="4" height="30" fill="#0D9488"/>
      <rect x="35" y="40" width="4" height="30" fill="#0D9488"/>
      <rect x="45" y="40" width="4" height="30" fill="#0D9488"/>
      <rect x="55" y="40" width="4" height="30" fill="#0D9488"/>
      <rect x="65" y="40" width="4" height="30" fill="#0D9488"/>
      {/* Roof/Triangle */}
      <path d="M20 40 L50 20 L80 40 Z" fill="#0D9488"/>
      {/* Base */}
      <rect x="20" y="70" width="54" height="5" fill="#0D9488"/>
    </svg>
  )
}

function ClubCard({ club }: { club: typeof clubs[0] }) {
  const colorClasses = {
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-600",
      badge: "bg-red-100 text-red-700"
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
      badge: "bg-blue-100 text-blue-700"
    },
    teal: {
      bg: "bg-teal-50",
      border: "border-teal-200",
      text: "text-teal-600",
      badge: "bg-teal-100 text-teal-700"
    }
  }

  const classes = colorClasses[club.color as keyof typeof colorClasses]

  return (
    <div className={`flex-shrink-0 w-80 md:w-96 p-6 rounded-3xl ${classes.bg} border-2 ${classes.border} hover:shadow-2xl transition-all duration-300`}>
      <div className="flex items-center gap-4 mb-5">
        <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center p-2">
          {club.name === "Red Cross Club" && <RedCrossLogo className="w-full h-full" />}
          {club.name === "Rotaract Club" && <RotaractLogo className="w-full h-full" />}
          {club.name === "UNESCO Club" && <UNESCOLogo className="w-full h-full" />}
        </div>
        <div>
          <h3 className="text-xl font-bold">{club.name}</h3>
          <p className={`${classes.text} text-xs font-medium`}>{club.affiliation}</p>
        </div>
      </div>
      
      <p className="text-foreground/70 text-sm mb-4 leading-relaxed line-clamp-3">
        {club.description}
      </p>
      
      <h4 className="font-semibold text-xs text-foreground/80 mb-2 flex items-center gap-2">
        <Heart className={`w-3 h-3 ${classes.text}`} />
        Key Activities
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {club.activities.slice(0, 4).map((activity, j) => (
          <span key={j} className={`px-2 py-1 text-xs font-medium rounded-full ${classes.badge}`}>
            {activity}
          </span>
        ))}
      </div>
    </div>
  )
}

export function StudentClubs() {
  // Triple the clubs array for seamless infinite scroll
  const allClubs = [...clubs, ...clubs, ...clubs]

  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="text-sky-600 border-sky-200 px-4 py-1">Student Life</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Student Clubs & Organizations
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Our students develop leadership skills and serve communities through active participation in recognized student organizations.
          </p>
        </div>

        {/* Infinite Scroll Container */}
        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <div className="flex gap-6 animate-scroll-x">
            {allClubs.map((club, index) => (
              <ClubCard key={`${club.name}-${index}`} club={club} />
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Students are encouraged to join these clubs to develop professional skills, build networks, 
            and contribute to community development. Membership is open to all registered students.
          </p>
        </div>
      </div>
    </section>
  )
}
