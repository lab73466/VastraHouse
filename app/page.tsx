"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { PremiumHeader } from "@/components/premium-header"
import { ParallaxHero } from "@/components/parallax-hero"
import { ScrollAnimation } from "@/components/scroll-animations"
import { PatternBackground, FloatingPatterns } from "@/components/pattern-backgrounds"
import { ProductCard } from "@/components/product-card"
import { useApp } from "@/lib/context/app-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Share2, Star, Truck, Shield, RotateCcw, Award } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

export default function ProductDetailPage() {
  const params = useParams()
  const { state, dispatch } = useApp()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

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
        <Header />
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
        size: selectedSize,
        color: selectedColor,
        quantity,
      },
    })

import { PremiumHeader } from "@/components/premium-header"
import { ParallaxHero } from "@/components/parallax-hero"
import { PremiumHeader } from "@/components/premium-header"
import { ParallaxHero } from "@/components/parallax-hero"
import { PremiumHeader } from "@/components/premium-header"
import { ParallaxHero } from "@/components/parallax-hero"
import { PremiumHeader } from "@/components/premium-header"
import { ParallaxHero } from "@/components/parallax-hero"
import { PremiumHeader } from "@/components/premium-header"
import { ParallaxHero } from "@/components/parallax-hero"
import { ScrollAnimation } from "@/components/scroll-animations"
import { PatternBackground, FloatingPatterns } from "@/components/pattern-backgrounds"
  }

  const handleToggleWishlist = () => {
    dispatch({ type: "TOGGLE_WISHLIST", payload: product.id })
    toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist")
  }

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingPatterns />
      <PremiumHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span>/</span>
          <span>Products</span>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-card rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isNew && <Badge>New</Badge>}
                {product.isFeatured && <Badge variant="secondary">Featured</Badge>}
                {product.discount && <Badge variant="destructive">{product.discount}% OFF</Badge>}
              </div>

              <h1 className="text-3xl font-playfair font-bold mb-2">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-2 border rounded-md text-sm ${
                      selectedColor === color
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleAddToCart} className="flex-1" disabled={!product.inStock}>
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button variant="outline" onClick={handleToggleWishlist}>
                <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>Free shipping above ₹999</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-4 w-4 text-primary" />
                <span>Easy 30-day returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>Authentic products</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-primary" />
                <span>Artisan crafted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="details" className="mb-12">
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

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-playfair font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
        <ParallaxHero />
        <ScrollAnimation>
          <PatternBackground pattern="paisley" intensity="subtle">
            <QuickCollections />
          </PatternBackground>
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <FeaturedArtisans />
        </ScrollAnimation>
    <div className="min-h-screen bg-background relative">
      <FloatingPatterns />
      <PremiumHeader />
            <FestivalCampaign />
        <ParallaxHero />
        <ScrollAnimation>
          <PatternBackground pattern="paisley" intensity="subtle">
            <QuickCollections />
          </PatternBackground>
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <FeaturedArtisans />
        </ScrollAnimation>
    <div className="min-h-screen bg-background relative">
      <FloatingPatterns />
      <PremiumHeader />
            <FestivalCampaign />
        <ParallaxHero />
        <ScrollAnimation>
          <PatternBackground pattern="paisley" intensity="subtle">
            <QuickCollections />
          </PatternBackground>
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <FeaturedArtisans />
        </ScrollAnimation>
    <div className="min-h-screen bg-background relative">
      <FloatingPatterns />
      <PremiumHeader />
            <FestivalCampaign />
        <ParallaxHero />
        <ScrollAnimation>
          <PatternBackground pattern="paisley" intensity="subtle">
            <QuickCollections />
          </PatternBackground>
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <FeaturedArtisans />
        </ScrollAnimation>
    <div className="min-h-screen bg-background relative">
      <FloatingPatterns />
      <PremiumHeader />
            <FestivalCampaign />
        <ParallaxHero />
        <ScrollAnimation>
          <PatternBackground pattern="paisley" intensity="subtle">
            <QuickCollections />
          </PatternBackground>
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <FeaturedArtisans />
        </ScrollAnimation>
    <div className="min-h-screen bg-background relative">
      <FloatingPatterns />
      <PremiumHeader />
            <FestivalCampaign />
        <ParallaxHero />
        <ScrollAnimation>
          <PatternBackground pattern="paisley" intensity="subtle">
            <QuickCollections />
          </PatternBackground>
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <FeaturedArtisans />
        </ScrollAnimation>
        <ScrollAnimation delay={0.4}>
          <PatternBackground pattern="mandala" intensity="medium">
            <FestivalCampaign />
          </PatternBackground>
        </ScrollAnimation>
        <ScrollAnimation delay={0.6}>
          <InteractiveCultureMap />
        </ScrollAnimation>
      </main>

      <Footer />
    </div>
  )
}