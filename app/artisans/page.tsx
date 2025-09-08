"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollAnimation, StaggeredAnimation } from "@/components/scroll-animations"
import { PremiumBreadcrumb } from "@/components/premium-breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Award, Heart, Search, Filter, Play, Star, Users } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const artisans = [
  {
    id: 1,
    name: "Masterji Ravi Kumar",
    craft: "Banarasi Silk Weaving",
    location: "Varanasi, Uttar Pradesh",
    experience: "35+ years",
    specialty: "Gold Zari Work",
    image: "/indian-artisan-weaver-portrait.jpg",
    story: "Third-generation weaver preserving the ancient art of Banarasi silk weaving. His family has been creating masterpieces for the royal families of India for over a century.",
    achievements: ["National Award Winner 2019", "UNESCO Heritage Craftsman", "Master Trainer"],
    products: 156,
    rating: 4.9,
    videoUrl: "/artisan-ravi-story.mp4",
    gallery: ["/placeholder-a6xt8.png", "/placeholder-bxrbz.png", "/placeholder-xlnm0.png"]
  },
  {
    id: 2,
    name: "Smt. Kamala Devi",
    craft: "Kanjivaram Silk Weaving",
    location: "Kanchipuram, Tamil Nadu",
    experience: "28+ years",
    specialty: "Temple Border Designs",
    image: "/placeholder-okecm.png",
    story: "Award-winning weaver known for her intricate temple motifs and vibrant color combinations. She has trained over 200 women in traditional Kanjivaram techniques.",
    achievements: ["Padma Shri Nominee", "State Award Winner", "Women Entrepreneur"],
    products: 89,
    rating: 4.8,
    videoUrl: "/artisan-kamala-story.mp4",
    gallery: ["/placeholder-okecm.png", "/placeholder-rabwy.png", "/placeholder-f5rwk.png"]
  },
  {
    id: 3,
    name: "Ustad Ahmed Ali",
    craft: "Chikankari Embroidery",
    location: "Lucknow, Uttar Pradesh",
    experience: "40+ years",
    specialty: "Shadow Work Embroidery",
    image: "/placeholder-ph9z3.png",
    story: "Master craftsman specializing in the delicate art of Lucknowi chikankari. His intricate shadow work and jaali patterns are sought after by designers worldwide.",
    achievements: ["Master Craftsman Award", "Export Excellence", "Heritage Keeper"],
    products: 234,
    rating: 4.9,
    videoUrl: "/artisan-ahmed-story.mp4",
    gallery: ["/placeholder-ph9z3.png", "/placeholder-0exfb.png", "/placeholder-oqoz8.png"]
  },
  {
    id: 4,
    name: "Smt. Meera Patel",
    craft: "Bandhani Tie-Dye",
    location: "Bhuj, Gujarat",
    experience: "25+ years",
    specialty: "Gharchola Patterns",
    image: "/placeholder-oqoz8.png",
    story: "Renowned for her expertise in traditional Gujarati bandhani patterns, especially the intricate gharchola designs worn by brides. She leads a cooperative of 50+ women artisans.",
    achievements: ["Craft Council Award", "Women's Cooperative Leader", "Design Innovation"],
    products: 178,
    rating: 4.7,
    videoUrl: "/artisan-meera-story.mp4",
    gallery: ["/placeholder-5xi3u.png", "/placeholder-cws89.png", "/placeholder-ug17b.png"]
  }
]

const regions = [
  "All Regions", "Uttar Pradesh", "Tamil Nadu", "Gujarat", "Rajasthan", 
  "West Bengal", "Karnataka", "Madhya Pradesh", "Odisha"
]

const crafts = [
  "All Crafts", "Silk Weaving", "Embroidery", "Block Printing", 
  "Tie-Dye", "Hand Painting", "Zardozi", "Mirror Work"
]

export default function ArtisansPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedCraft, setSelectedCraft] = useState("All Crafts")
  const [selectedArtisan, setSelectedArtisan] = useState<typeof artisans[0] | null>(null)

  const filteredArtisans = artisans.filter(artisan => {
    const matchesSearch = artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artisan.craft.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = selectedRegion === "All Regions" || 
                         artisan.location.includes(selectedRegion)
    const matchesCraft = selectedCraft === "All Crafts" || 
                        artisan.craft.toLowerCase().includes(selectedCraft.toLowerCase())
    
    return matchesSearch && matchesRegion && matchesCraft
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <PremiumBreadcrumb items={[{ label: "Artisans" }]} />

        {/* Hero Section */}
        <ScrollAnimation>
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Meet Our Master Craftspeople
            </Badge>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gradient-gold mb-6">
              The Hands Behind Heritage
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every piece in our collection is crafted by skilled artisans who have dedicated their lives to 
              preserving and perfecting traditional Indian textile arts.
            </p>
          </div>
        </ScrollAnimation>

        {/* Filters */}
        <ScrollAnimation>
          <Card className="mb-12">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search artisans..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCraft} onValueChange={setSelectedCraft}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Craft" />
                  </SelectTrigger>
                  <SelectContent>
                    {crafts.map(craft => (
                      <SelectItem key={craft} value={craft}>{craft}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" className="bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimation>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <StaggeredAnimation>
            {filteredArtisans.map((artisan) => (
              <Card key={artisan.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div className="relative aspect-square overflow-hidden">
                  <Image 
                    src={artisan.image} 
                    alt={artisan.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Play Button Overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Button size="icon" className="rounded-full bg-white/20 backdrop-blur-sm border-white/30">
                      <Play className="w-6 h-6 text-white" />
                    </Button>
                  </motion.div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      <Award className="w-3 h-3 mr-1" />
                      Master Craftsman
                    </Badge>
                    {artisan.achievements.length > 0 && (
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
                        {artisan.achievements.length} Awards
                      </Badge>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs font-medium">{artisan.rating}</span>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-playfair">{artisan.name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {artisan.location}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline">{artisan.craft}</Badge>
                    <Badge variant="outline">{artisan.experience}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-primary mb-1">Specialty</h4>
                    <p className="text-sm text-muted-foreground">{artisan.specialty}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-primary mb-1">Story</h4>
                    <p className="text-sm text-muted-foreground line-clamp-3">{artisan.story}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-sm text-muted-foreground">
                      {artisan.products} Products
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedArtisan(artisan)}
                      className="bg-transparent"
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </StaggeredAnimation>
        </div>

        {/* Impact Stats */}
        <ScrollAnimation>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { label: "Master Artisans", value: "500+", icon: Users },
              { label: "Heritage Crafts", value: "25+", icon: Award },
              { label: "States Covered", value: "15", icon: MapPin },
              { label: "Years of Heritage", value: "5000+", icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="text-3xl font-bold text-gradient-gold mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollAnimation>

        {/* Call to Action */}
        <ScrollAnimation>
          <div className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 pattern-mandala rounded-2xl p-12">
            <h2 className="text-3xl font-playfair font-bold text-gradient-gold mb-4">
              Support Traditional Craftsmanship
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              When you choose VastraHaus, you're not just buying clothing – you're supporting families, 
              preserving traditions, and keeping ancient arts alive for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/products">Shop Artisan Collections</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/heritage">Learn About Heritage</Link>
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </main>

      <Footer />
    </div>
  )
}