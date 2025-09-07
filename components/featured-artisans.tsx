import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Award } from "lucide-react"

const artisans = [
  {
    id: 1,
    name: "Masterji Ravi Kumar",
    craft: "Banarasi Weaving",
    location: "Varanasi, Uttar Pradesh",
    experience: "35+ years",
    specialty: "Gold Zari Work",
    image: "/placeholder-a6xt8.png",
    story: "Third-generation weaver preserving the ancient art of Banarasi silk weaving",
  },
  {
    id: 2,
    name: "Smt. Kamala Devi",
    craft: "Kanjivaram Silk",
    location: "Kanchipuram, Tamil Nadu",
    experience: "28+ years",
    specialty: "Temple Border Designs",
    image: "/placeholder-okecm.png",
    story: "Award-winning weaver known for intricate temple motifs and vibrant colors",
  },
  {
    id: 3,
    name: "Ustad Ahmed Ali",
    craft: "Chikankari Embroidery",
    location: "Lucknow, Uttar Pradesh",
    experience: "40+ years",
    specialty: "Shadow Work",
    image: "/placeholder-ph9z3.png",
    story: "Master craftsman specializing in the delicate art of Lucknowi chikankari",
  },
]

export function FeaturedArtisans() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gradient-gold mb-4">Meet Our Artisans</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Behind every piece is a story of dedication, skill, and generations of craftsmanship. Meet the talented
            artisans who bring our collections to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map((artisan) => (
            <Card key={artisan.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-square overflow-hidden">
                <Image src={artisan.image || "/placeholder.svg"} alt={artisan.name} fill className="object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                    <Award className="w-3 h-3 mr-1" />
                    Master Craftsman
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-playfair">{artisan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {artisan.location}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{artisan.craft}</Badge>
                    <Badge variant="outline">{artisan.experience}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-primary mb-1">Specialty</h4>
                    <p className="text-sm text-muted-foreground">{artisan.specialty}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-primary mb-1">Story</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{artisan.story}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Every purchase directly supports these skilled artisans and helps preserve traditional Indian crafts
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              Fair Trade Certified
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              Artisan Welfare Program
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              Heritage Preservation
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
