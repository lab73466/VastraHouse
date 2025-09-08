"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollAnimation } from "@/components/scroll-animations"
import { PremiumBreadcrumb } from "@/components/premium-breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Award, Users, Palette, Scissors } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const heritageStories = [
  {
    id: 1,
    title: "The Golden Threads of Banarasi",
    region: "Varanasi, Uttar Pradesh",
    craft: "Banarasi Silk Weaving",
    timeline: "16th Century - Present",
    description: "In the holy city of Varanasi, where the Ganges flows eternal, master weavers have been creating silk masterpieces for over 400 years. Each Banarasi saree is a testament to the intricate artistry passed down through generations.",
    image: "/banarasi-silk-saree-with-gold-zari-work-traditiona.jpg",
    artisans: 2500,
    techniques: ["Kadhua", "Cutwork", "Tanchoi", "Tissue"],
    significance: "Symbol of Indian bridal tradition and royal heritage",
    videoUrl: "/banarasi-weaving-process.mp4"
  },
  {
    id: 2,
    title: "Kanjivaram: The Queen of Silks",
    region: "Kanchipuram, Tamil Nadu",
    craft: "Kanjivaram Silk Weaving",
    timeline: "15th Century - Present",
    description: "Born in the temple town of Kanchipuram, these sarees are woven with pure mulberry silk and real gold threads. The distinctive temple borders and rich colors make each piece a work of art.",
    image: "/kanjivaram-silk-saree-with-temple-border-south-ind.jpg",
    artisans: 1800,
    techniques: ["Korvai", "Petni", "Temple Borders", "Contrast Weaving"],
    significance: "Sacred geometry and temple architecture in textile form",
    videoUrl: "/kanjivaram-weaving-process.mp4"
  },
  {
    id: 3,
    title: "Bandhani: Dots of Devotion",
    region: "Rajasthan & Gujarat",
    craft: "Bandhani Tie-Dye",
    timeline: "5000 Years - Present",
    description: "One of the oldest textile techniques in the world, Bandhani creates mesmerizing patterns through the ancient art of tie and dye. Each dot is tied by hand, creating unique patterns that tell stories of celebration and joy.",
    image: "/placeholder-5xi3u.png",
    artisans: 3000,
    techniques: ["Ekdali", "Trikunti", "Chaubandi", "Dungar Shahi"],
    significance: "Worn during auspicious occasions and festivals",
    videoUrl: "/bandhani-process.mp4"
  }
]

const craftTimeline = [
  { period: "3000 BCE", event: "First evidence of cotton cultivation in Indus Valley" },
  { period: "1500 BCE", event: "Silk weaving begins in ancient India" },
  { period: "400 CE", event: "Ajanta cave paintings show textile patterns" },
  { period: "1200 CE", event: "Mughal influence introduces new techniques" },
  { period: "1600 CE", event: "European trade brings global recognition" },
  { period: "Present", event: "Digital age preservation and innovation" }
]

export default function HeritagePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <PremiumBreadcrumb items={[{ label: "Heritage" }]} />

        {/* Hero Section */}
        <ScrollAnimation>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                5000 Years of Textile Heritage
              </Badge>
              <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gradient-gold mb-6">
                India's Living Textile Legacy
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Journey through millennia of textile artistry, where every thread tells a story of cultural richness, 
                spiritual significance, and unparalleled craftsmanship that continues to inspire the world.
              </p>
            </motion.div>
          </div>
        </ScrollAnimation>

        {/* Heritage Stories */}
        <section className="mb-20">
          <ScrollAnimation>
            <h2 className="text-3xl font-playfair font-bold text-center mb-12">Craft Chronicles</h2>
          </ScrollAnimation>

          <div className="space-y-20">
            {heritageStories.map((story, index) => (
              <ScrollAnimation key={story.id} delay={index * 0.2}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{story.region}</span>
                        <span>•</span>
                        <Clock className="w-4 h-4" />
                        <span>{story.timeline}</span>
                      </div>
                      
                      <h3 className="text-3xl font-playfair font-bold text-gradient-gold">
                        {story.title}
                      </h3>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {story.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                          <p className="font-bold text-2xl">{story.artisans.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Active Artisans</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Scissors className="w-8 h-8 text-primary mx-auto mb-2" />
                          <p className="font-bold text-2xl">{story.techniques.length}</p>
                          <p className="text-sm text-muted-foreground">Techniques</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Traditional Techniques</h4>
                      <div className="flex flex-wrap gap-2">
                        {story.techniques.map((technique) => (
                          <Badge key={technique} variant="outline">{technique}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                      <h4 className="font-semibold mb-2">Cultural Significance</h4>
                      <p className="text-sm text-muted-foreground">{story.significance}</p>
                    </div>

                    <div className="flex gap-3">
                      <Button asChild>
                        <Link href={`/products?heritage=${story.craft}`}>
                          Shop {story.craft.split(' ')[0]} Collection
                        </Link>
                      </Button>
                      <Button variant="outline">
                        <Link href={`/artisans?region=${story.region}`}>
                          Meet Artisans
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    
                    {/* Floating Stats */}
                    <motion.div
                      className="absolute -bottom-6 -right-6 bg-background p-4 rounded-xl shadow-lg border"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{story.timeline.split(' - ')[0]}</p>
                        <p className="text-sm text-muted-foreground">Heritage Since</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <ScrollAnimation>
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-gradient-gold mb-4">
                Timeline of Indian Textiles
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Trace the evolution of Indian textile artistry through the ages
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full" />

              <div className="space-y-12">
                {craftTimeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                          <Badge className="mb-2">{item.period}</Badge>
                          <p className="font-medium">{item.event}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* Call to Action */}
        <ScrollAnimation>
          <div className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 pattern-paisley rounded-2xl p-12">
            <h2 className="text-3xl font-playfair font-bold text-gradient-gold mb-4">
              Preserve Heritage, Embrace Future
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every purchase supports traditional artisans and helps preserve these ancient crafts for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/products">Explore Heritage Collection</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/artisans">Meet Our Artisans</Link>
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </main>

      <Footer />
    </div>
  )
}