"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    id: 1,
    title: "Heritage Handwoven Collection",
    subtitle: "Discover the artistry of traditional Indian craftsmanship",
    description: "Each piece tells a story of generations of skilled artisans",
    image: "/elegant-indian-woman-wearing-handwoven-silk-saree-.jpg",
    cta: "Explore Collection",
    link: "/collections/heritage",
  },
  {
    id: 2,
    title: "Festive Splendor",
    subtitle: "Celebrate every occasion in style",
    description: "From Diwali to weddings, find your perfect festive ensemble",
    image: "/beautiful-indian-bride-in-red-lehenga-with-gold-em.jpg",
    cta: "Shop Festive",
    link: "/collections/festive",
  },
  {
    id: 3,
    title: "Contemporary Fusion",
    subtitle: "Where tradition meets modernity",
    description: "Versatile pieces for the modern Indian woman",
    image: "/modern-indian-woman-in-contemporary-kurta-and-pala.jpg",
    cta: "View Fusion",
    link: "/collections/fusion",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-muted to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-mandala opacity-30"></div>

      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="grid lg:grid-cols-2 h-full">
            {/* Content */}
            <div className="flex items-center justify-center p-8 lg:p-16">
              <div className="max-w-lg space-y-6 text-center lg:text-left">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-primary tracking-wider uppercase">{slide.subtitle}</p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gradient-gold leading-tight">
                    {slide.title}
                  </h1>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">{slide.description}</p>
                <Button size="lg" className="text-base px-8 py-6 animate-float">
                  {slide.cta}
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative hidden lg:block">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/20"></div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-primary scale-125" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
