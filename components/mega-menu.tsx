"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, Star, Sparkles } from "lucide-react"

interface MegaMenuProps {
  isOpen: boolean
  category: "women" | "men" | "collections"
}

const womenCategories = [
  {
    title: "Traditional",
    items: [
      { name: "Banarasi Sarees", href: "/products?category=sarees&subcategory=banarasi", image: "/banarasi-silk-saree-with-gold-zari-work-traditiona.jpg", badge: "Heritage" },
      { name: "Kanjivaram Silk", href: "/products?category=sarees&subcategory=kanjivaram", image: "/kanjivaram-silk-saree-with-temple-border-south-ind.jpg", badge: "Premium" },
      { name: "Lehenga Choli", href: "/products?category=lehengas", image: "/designer-lehenga-choli-with-heavy-embroidery-brida.jpg", badge: "Bridal" },
      { name: "Anarkali Suits", href: "/products?category=suits&subcategory=anarkali", image: "/elegant-anarkali-suit-with-embroidery-indian-ethni.jpg", badge: "Festive" },
    ]
  },
  {
    title: "Contemporary",
    items: [
      { name: "Kurta Sets", href: "/products?category=kurta-sets", image: "/modern-kurta-set-with-palazzo-pants-contemporary-i.jpg", badge: "New" },
      { name: "Indo-Western", href: "/products?category=fusion", image: "/placeholder-bxrbz.png", badge: "Trending" },
      { name: "Palazzo Sets", href: "/products?category=palazzo-sets", image: "/placeholder-xlnm0.png" },
      { name: "Crop Top Sets", href: "/products?category=crop-sets", image: "/placeholder-imqmb.png", badge: "Modern" },
    ]
  }
]

const featuredCollections = [
  {
    title: "Diwali Special",
    description: "Illuminate your festivities",
    image: "/woman-in-golden-silk-saree-diwali-celebration-trad.jpg",
    href: "/collections/diwali",
    badge: "Limited Edition"
  },
  {
    title: "Bridal Couture",
    description: "Your dream wedding ensemble",
    image: "/beautiful-indian-bride-in-red-lehenga-with-gold-em.jpg",
    href: "/collections/bridal",
    badge: "Exclusive"
  }
]

export function MegaMenu({ isOpen, category }: MegaMenuProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="absolute top-full left-0 w-full bg-background border-t shadow-2xl z-50"
      >
        <div className="container mx-auto px-4 py-12">
          {category === "women" && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Categories */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {womenCategories.map((section, sectionIndex) => (
                  <div key={section.title}>
                    <h3 className="font-playfair text-xl font-bold mb-4 text-primary">{section.title}</h3>
                    <div className="space-y-3">
                      {section.items.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (sectionIndex * 4 + index) * 0.1 }}
                        >
                          <Link 
                            href={item.href}
                            className="group flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium group-hover:text-primary transition-colors">{item.name}</span>
                                {item.badge && (
                                  <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                                )}
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured Collections */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="font-playfair text-xl font-bold text-primary">Featured Collections</h3>
                <div className="space-y-4">
                  {featuredCollections.map((collection, index) => (
                    <motion.div
                      key={collection.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Link href={collection.href} className="group block">
                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                          <Image
                            src={collection.image}
                            alt={collection.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            {collection.badge && (
                              <Badge className="mb-2 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                                {collection.badge}
                              </Badge>
                            )}
                            <h4 className="text-white font-playfair text-xl font-bold mb-1">{collection.title}</h4>
                            <p className="text-white/90 text-sm">{collection.description}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <motion.div 
            className="mt-12 pt-8 border-t text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-muted-foreground mb-4">Discover the artistry behind every piece</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/heritage">Heritage Stories</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/artisans">Meet Our Artisans</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}