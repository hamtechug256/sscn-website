'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Heart, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface HeroSlideData {
  id: string
  title: string
  subtitle: string | null
  badge: string | null
  image: string
  link: string | null
  buttonText: string | null
  order: number
  active: boolean
}

// Fallback slides if database is empty
const fallbackSlides: HeroSlideData[] = [
  {
    id: '1',
    title: 'Excellence in Nursing Education',
    subtitle: 'Training compassionate healthcare professionals to serve communities across Uganda and East Africa',
    badge: 'Nursing',
    image: '/uploads/carousel/hero-1.jpg',
    link: '/programs',
    buttonText: 'Explore Programs',
    order: 0,
    active: true
  },
  {
    id: '2',
    title: 'Midwifery Excellence',
    subtitle: 'Empowering mothers with skilled birth attendants and quality maternal healthcare in Uganda',
    badge: 'Midwifery',
    image: '/uploads/carousel/hero-2.jpg',
    link: '/programs',
    buttonText: 'Learn More',
    order: 1,
    active: true
  },
  {
    id: '3',
    title: 'Clinical Skills Training',
    subtitle: 'Hands-on practical training preparing students for real-world healthcare challenges',
    badge: 'Clinical Training',
    image: '/uploads/carousel/hero-3.jpg',
    link: '/programs',
    buttonText: 'Explore Programs',
    order: 2,
    active: true
  },
  {
    id: '4',
    title: 'Learn Anywhere, Anytime',
    subtitle: 'Modern e-learning platform bringing nursing education to every corner of Uganda',
    badge: 'E-Learning',
    image: '/uploads/carousel/hero-4.jpg',
    link: '/e-learning',
    buttonText: 'Start Learning',
    order: 3,
    active: true
  },
  {
    id: '5',
    title: 'Community Health Impact',
    subtitle: 'Making a difference in rural communities through quality healthcare education and outreach',
    badge: 'Community Health',
    image: '/uploads/carousel/hero-5.jpg',
    link: '/about',
    buttonText: 'Our Impact',
    order: 4,
    active: true
  }
]

export function HeroCarousel() {
  const [slides, setSlides] = useState<HeroSlideData[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [loading, setLoading] = useState(true)

  // Fetch slides from API
  useEffect(() => {
    async function fetchSlides() {
      try {
        const response = await fetch('/api/hero-slides')
        if (response.ok) {
          const data = await response.json()
          // Filter only active slides
          const activeSlides = data.filter((s: HeroSlideData) => s.active)
          if (activeSlides.length > 0) {
            setSlides(activeSlides)
          } else {
            setSlides(fallbackSlides)
          }
        } else {
          setSlides(fallbackSlides)
        }
      } catch (error) {
        console.error('Failed to fetch hero slides:', error)
        setSlides(fallbackSlides)
      } finally {
        setLoading(false)
      }
    }
    fetchSlides()
  }, [])

  // Go to next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  // Go to previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, slides.length])

  // Pause on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  // Loading state
  if (loading) {
    return (
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl bg-gradient-to-r from-sky-600 to-blue-600 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    )
  }

  // No slides
  if (slides.length === 0) {
    return null
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div 
      className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-all duration-1000 ease-in-out",
              index === currentSlide 
                ? "opacity-100 z-10" 
                : "opacity-0 z-0 pointer-events-none"
            )}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 lg:px-12">
                <div className="max-w-2xl text-white">
                  {/* Badge */}
                  {slide.badge && (
                    <Badge className="bg-sky-500/90 backdrop-blur-sm text-white mb-4 px-4 py-1.5 text-sm border border-white/20">
                      <Heart className="w-4 h-4 mr-2" />
                      {slide.badge}
                    </Badge>
                  )}

                  {/* Title */}
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h2>

                  {/* Subtitle */}
                  {slide.subtitle && (
                    <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 max-w-xl">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* CTA Button */}
                  {slide.link && slide.buttonText && (
                    <Button asChild size="lg" className="bg-sky-500 hover:bg-sky-600 text-white shadow-lg">
                      <Link href={slide.link}>
                        {slide.buttonText}
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Only show if more than 1 slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white hover:bg-white/50 transition-all md:opacity-100 opacity-0 group-hover:opacity-100 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white hover:bg-white/50 transition-all md:opacity-100 opacity-0 group-hover:opacity-100 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {/* Slide Indicators (Dots) - Only show if more than 1 slide */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 md:gap-3 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "transition-all duration-300 rounded-full",
                index === currentSlide
                  ? "w-8 md:w-10 h-2.5 bg-white shadow-md"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {slides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
          <div
            className="h-full bg-sky-400 transition-all duration-300 ease-linear"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
            }}
          />
        </div>
      )}

      {/* Slide Counter */}
      {slides.length > 1 && (
        <div className="absolute top-4 right-4 z-30 bg-black/30 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
          {currentSlide + 1} / {slides.length}
        </div>
      )}
    </div>
  )
}
