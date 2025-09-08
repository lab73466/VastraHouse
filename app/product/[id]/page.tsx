"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { PremiumHeader } from "@/components/premium-header"
import { Footer } from "@/components/footer"
import { PremiumProductGallery } from "@/components/premium-product-gallery"
import { ColorSwatchSelector } from "@/components/color-swatch-selector"
import { InteractiveSizeGuide } from "@/components/interactive-size-guide"
import { PremiumBreadcrumb } from "@/components/premium-breadcrumb"
import { ScrollAnimation } from "@/components/scroll-animations"
import { PremiumProductGallery } from "@/components/premium-product-gallery"
import { ColorSwatchSelector } from "@/components/color-swatch-selector"
import { InteractiveSizeGuide } from "@/components/interactive-size-guide"
import { PremiumBreadcrumb } from "@/components/premium-breadcrumb"
import { ScrollAnimation } from "@/components/scroll-animations"
import { PremiumProductGallery } from "@/components/premium-product-gallery"
import { ColorSwatchSelector } from "@/components/color-swatch-selector"
import { InteractiveSizeGuide } from "@/components/interactive-size-guide"
import { PremiumBreadcrumb } from "@/components/premium-breadcrumb"
import { ScrollAnimation } from "@/components/scroll-animations"
import { ProductCard } from "@/components/product-card"
import { useApp } from "@/lib/context/app-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Share2, Star, Truck, Shield, RotateCcw, Award, Ruler, Phone, MessageCircle } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import { motion } from "framer-motion"
import Image from "next/image"

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)

  const product = state.products.find((p) => p.id === params.id)

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0])
      setSelectedSize(product.sizes[0])
    }
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <PremiumHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const relatedProducts = state.products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  const isInWishlist = state.wishlist.includes(product.id)

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color")
      return
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product,
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
        color: selectedColor,
          <ScrollAnimation>
            <PremiumProductGallery
              images={product.images}
              productName={product.name}
              badges={[
                ...(product.isNew ? [{ text: "NEW", variant: "default" as const }] : []),
                ...(product.isFeatured ? [{ text: "FEATURED", variant: "secondary" as const }] : []),
                ...(product.discount ? [{ text: `${product.discount}% OFF`, variant: "destructive" as const }] : [])
              ]}
            />
          </ScrollAnimation>
          </ScrollAnimation>

          {/* Product Info */}
          <ScrollAnimation delay={0.2}>
            <div className="space-y-8">
              {/* Product Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  {product.isNew && <Badge>New Arrival</Badge>}
                  {product.isFeatured && <Badge variant="secondary">Editor's Choice</Badge>}
                  {product.discount && <Badge variant="destructive">{product.discount}% OFF</Badge>}
                </div>

                <h1 className="text-4xl font-playfair font-bold mb-4 text-gradient-gold">{product.name}</h1>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-2xl text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discount && (
                    <Badge variant="destructive" className="text-sm">
                      Save ₹{(product.originalPrice! - product.price).toLocaleString()}
                    </Badge>
                  )}
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
              </motion.div>

              {/* Heritage Info */}
              {product.heritage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-primary">Heritage Craft</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Region:</span> {product.heritage.region}
                    </div>
                    <div>
                      <span className="font-medium">Craft:</span> {product.heritage.craft}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{product.heritage.history}</p>
                </motion.div>
              )}

              {/* Size Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium">Size</label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs bg-transparent"
                  >
                    <Ruler className="w-3 h-3 mr-1" />
                    Size Guide
                  </Button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105"
                          : "border-border hover:border-primary/50 hover:scale-102"
                      }`}
                      whileHover={{ scale: selectedSize === size ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Color Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ColorSwatchSelector
                  colors={product.colors}
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                />
              </motion.div>

              {/* Quantity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-4"
              >
                <label className="block text-sm font-medium">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-r-none"
                    >
                      -
                    </Button>
                    <span className="w-16 text-center py-2 border-x">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-l-none"
                    >
                      +
                    </Button>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.stockCount} in stock
                  </Badge>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-4"
              >
                <div className="flex gap-4">
                  <Button 
                    onClick={handleAddToCart} 
                    className="flex-1 h-14 text-lg font-medium"
                    disabled={!product.inStock}
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  <Button variant="outline" onClick={handleToggleWishlist} className="h-14 px-6">
                    <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current text-red-500" : ""}`} />
                  </Button>
                  <Button variant="outline" className="h-14 px-6">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <Button variant="outline" className="w-full h-12 bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask Our Styling Expert
                </Button>
              </motion.div>

          <ScrollAnimation>
            <PremiumProductGallery
              images={product.images}
              productName={product.name}
              badges={[
                ...(product.isNew ? [{ text: "NEW", variant: "default" as const }] : []),
                ...(product.isFeatured ? [{ text: "FEATURED", variant: "secondary" as const }] : []),
                ...(product.discount ? [{ text: `${product.discount}% OFF`, variant: "destructive" as const }] : [])
              ]}
            />
          </ScrollAnimation>
                  <div>
                    <p className="font-medium">Easy Returns</p>
                    <p className="text-muted-foreground text-xs">30-day policy</p>
          <ScrollAnimation delay={0.2}>
            <div className="space-y-8">
              {/* Product Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  {product.isNew && <Badge>New Arrival</Badge>}
                  {product.isFeatured && <Badge variant="secondary">Editor's Choice</Badge>}
                  {product.discount && <Badge variant="destructive">{product.discount}% OFF</Badge>}
                </div>
                </div>
                <h1 className="text-4xl font-playfair font-bold mb-4 text-gradient-gold">{product.name}</h1>
                <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-2xl text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discount && (
                    <Badge variant="destructive" className="text-sm">
                      Save ₹{(product.originalPrice! - product.price).toLocaleString()}
                    </Badge>
                  )}
                </div>
                    <Shield className="h-5 w-5 text-primary" />
                <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
              </motion.div>
                  </div>
              {/* Heritage Info */}
              {product.heritage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-primary">Heritage Craft</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Region:</span> {product.heritage.region}
                    </div>
                    <div>
                      <span className="font-medium">Craft:</span> {product.heritage.craft}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{product.heritage.history}</p>
                </motion.div>
              )}
                  <div>
              {/* Size Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium">Size</label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs bg-transparent"
                  >
                    <Ruler className="w-3 h-3 mr-1" />
                    Size Guide
                  </Button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105"
                          : "border-border hover:border-primary/50 hover:scale-102"
                      }`}
                      whileHover={{ scale: selectedSize === size ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
                    <p className="font-medium">Authentic</p>
              {/* Color Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ColorSwatchSelector
                  colors={product.colors}
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                />
              </motion.div>
                    <p className="text-muted-foreground text-xs">Guaranteed genuine</p>
              {/* Quantity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-4"
              >
                <label className="block text-sm font-medium">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-r-none"
                    >
                      -
                    </Button>
                    <span className="w-16 text-center py-2 border-x">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-l-none"
                    >
                      +
                    </Button>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.stockCount} in stock
                  </Badge>
                </div>
              </motion.div>
                  </div>
              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-4"
              >
                <div className="flex gap-4">
                  <Button 
                    onClick={handleAddToCart} 
                    className="flex-1 h-14 text-lg font-medium"
                    disabled={!product.inStock}
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  <Button variant="outline" onClick={handleToggleWishlist} className="h-14 px-6">
                    <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current text-red-500" : ""}`} />
                  </Button>
                  <Button variant="outline" className="h-14 px-6">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
                <Button variant="outline" className="w-full h-12 bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask Our Styling Expert
                </Button>
              </motion.div>
                <div className="flex items-center gap-3 text-sm">
              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="grid grid-cols-2 gap-6 pt-8 border-t"
              >
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-muted-foreground text-xs">Above ₹2,999</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <RotateCcw className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Easy Returns</p>
                    <p className="text-muted-foreground text-xs">30-day policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Authentic</p>
                    <p className="text-muted-foreground text-xs">Guaranteed genuine</p>
                  </div>
          <ScrollAnimation delay={0.2}>
            <div className="space-y-8">
              {/* Product Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  {product.isNew && <Badge>New Arrival</Badge>}
                  {product.isFeatured && <Badge variant="secondary">Editor's Choice</Badge>}
                  {product.discount && <Badge variant="destructive">{product.discount}% OFF</Badge>}
                </div>
                <div className="flex items-center gap-3 text-sm">
                <h1 className="text-4xl font-playfair font-bold mb-4 text-gradient-gold">{product.name}</h1>
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                    <Award className="h-5 w-5 text-primary" />
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-2xl text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discount && (
                    <Badge variant="destructive" className="text-sm">
                      Save ₹{(product.originalPrice! - product.price).toLocaleString()}
                    </Badge>
                  )}
                </div>
                  </div>
                <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
              </motion.div>
                  <div>
              {/* Heritage Info */}
              {product.heritage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-primary">Heritage Craft</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Region:</span> {product.heritage.region}
                    </div>
                    <div>
                      <span className="font-medium">Craft:</span> {product.heritage.craft}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{product.heritage.history}</p>
                </motion.div>
              )}
                    <p className="font-medium">Artisan Made</p>
              {/* Size Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium">Size</label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs bg-transparent"
                  >
                    <Ruler className="w-3 h-3 mr-1" />
                    Size Guide
                  </Button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105"
                          : "border-border hover:border-primary/50 hover:scale-102"
                      }`}
                      whileHover={{ scale: selectedSize === size ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
                    <p className="text-muted-foreground text-xs">Handcrafted quality</p>
              {/* Color Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ColorSwatchSelector
                  colors={product.colors}
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                />
              </motion.div>
                  </div>
              {/* Quantity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-4"
              >
                <label className="block text-sm font-medium">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-r-none"
                    >
                      -
                    </Button>
                    <span className="w-16 text-center py-2 border-x">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-l-none"
                    >
                      +
                    </Button>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.stockCount} in stock
                  </Badge>
                </div>
              </motion.div>
                </div>
              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-4"
              >
                <div className="flex gap-4">
                  <Button 
                    onClick={handleAddToCart} 
                    className="flex-1 h-14 text-lg font-medium"
                    disabled={!product.inStock}
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  <Button variant="outline" onClick={handleToggleWishlist} className="h-14 px-6">
                    <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current text-red-500" : ""}`} />
                  </Button>
                  <Button variant="outline" className="h-14 px-6">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
                <Button variant="outline" className="w-full h-12 bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask Our Styling Expert
                </Button>
              </motion.div>
          </ScrollAnimation>
              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="grid grid-cols-2 gap-6 pt-8 border-t"
              >
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-muted-foreground text-xs">Above ₹2,999</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <RotateCcw className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Easy Returns</p>
                    <p className="text-muted-foreground text-xs">30-day policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Authentic</p>
                    <p className="text-muted-foreground text-xs">Guaranteed genuine</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Artisan Made</p>
                    <p className="text-muted-foreground text-xs">Handcrafted quality</p>
                  </div>
                </div>
              </motion.div>
          </ScrollAnimation>
          </ScrollAnimation>
        </div>

        {/* Product Details Tabs */}
        <ScrollAnimation>
          <Tabs defaultValue="details" className="mb-16">
          <Tabs defaultValue="details" className="mb-16">
          <Tabs defaultValue="details" className="mb-16">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
              <TabsTrigger value="artisan">Artisan Story</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p>
                      <strong>Fabric:</strong> {product.fabric}
                    </p>
                    <p>
                      <strong>Category:</strong> {product.category}
                    </p>
                    <p>
                      <strong>Available Sizes:</strong> {product.sizes.join(", ")}
                    </p>
                    <p>
                      <strong>Available Colors:</strong> {product.colors.join(", ")}
                    </p>
                  </div>
                  {product.heritage && (
                    <div>
                      <h4 className="font-semibold mb-2">Heritage & Craft</h4>
                      <p>
                        <strong>Region:</strong> {product.heritage.region}
                      </p>
                      <p>
                        <strong>Craft:</strong> {product.heritage.craft}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">{product.heritage.history}</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="care" className="mt-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">Care Instructions</h3>
                <ul className="space-y-2">
                  {product.care.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="artisan" className="mt-6">
              {product.artisan && (
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-4">Meet the Artisan</h3>
                  <div className="flex gap-6">
                    <Image
                      src={product.artisan.image || "/placeholder.svg"}
                      alt={product.artisan.name}
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{product.artisan.name}</h4>
                      <p className="text-muted-foreground mb-2">{product.artisan.location}</p>
                      <p>{product.artisan.story}</p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
                <p className="text-muted-foreground mb-4">Coming Soon!</p>
                <p className="text-sm text-muted-foreground">
                  We're working on bringing you authentic customer reviews and ratings.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollAnimation>
        </ScrollAnimation>
        </ScrollAnimation>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <ScrollAnimation>
            <section>
            <section>
            <section>
              <h2 className="text-2xl font-playfair font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} viewMode="grid" />
                ))}
              </div>
            </section>
          </ScrollAnimation>
          </ScrollAnimation>
          </ScrollAnimation>
        )}
      </main>

      {/* Size Guide Modal */}
      <InteractiveSizeGuide
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />

      {/* Size Guide Modal */}
      <InteractiveSizeGuide
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />

      {/* Size Guide Modal */}
      <InteractiveSizeGuide
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />

      <Footer />
    </div>
  )
}