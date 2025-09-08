"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ZoomIn, Heart, Share2, Maximize2 } from "lucide-react"
import { ImageLightbox } from "@/components/image-lightbox"

interface PremiumProductGalleryProps {
  images: string[]
  productName: string
  badges?: { text: string; variant?: "default" | "secondary" | "destructive" | "outline" }[]
}

export function PremiumProductGallery({ images, productName, badges = [] }: PremiumProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/5] bg-card rounded-2xl overflow-hidden group">
        <motion.div
          className="relative w-full h-full cursor-zoom-in"
          whileHover={{ scale: isZoomed ? 1 : 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={images[selectedImage] || "/placeholder.svg"}
            alt={productName}
            fill
            className="object-cover"
            priority
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          {badges.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {badges.map((badge, index) => (
                <Badge key={index} variant={badge.variant || "default"}>
                  {badge.text}
                </Badge>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
              onClick={(e) => {
                e.stopPropagation()
                setIsLightboxOpen(true)
              }}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Zoom Indicator */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click to zoom
          </div>
        </motion.div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              selectedImage === index 
                ? "border-primary shadow-lg scale-105" 
                : "border-transparent hover:border-primary/50"
            }`}
            whileHover={{ scale: selectedImage === index ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} ${index + 1}`}
              fill
              className="object-cover"
            />
            {selectedImage === index && (
              <div className="absolute inset-0 bg-primary/20" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center text-sm text-muted-foreground">
        {selectedImage + 1} of {images.length} images
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={images}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        initialIndex={selectedImage}
      />
    </div>
  )
}