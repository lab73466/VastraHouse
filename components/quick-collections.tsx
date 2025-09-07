import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const collections = [
  {
    id: 1,
    name: "Banarasi Silk Sarees",
    description: "Handwoven masterpieces from Varanasi",
    image: "/banarasi-silk-saree-with-gold-zari-work-traditiona.jpg",
    link: "/collections/banarasi",
    featured: true,
  },
  {
    id: 2,
    name: "Anarkali Suits",
    description: "Timeless elegance for every occasion",
    image: "/elegant-anarkali-suit-with-embroidery-indian-ethni.jpg",
    link: "/collections/anarkali",
  },
  {
    id: 3,
    name: "Kanjivaram Sarees",
    description: "South Indian silk heritage",
    image: "/kanjivaram-silk-saree-with-temple-border-south-ind.jpg",
    link: "/collections/kanjivaram",
  },
  {
    id: 4,
    name: "Kurta Sets",
    description: "Contemporary comfort meets tradition",
    image: "/modern-kurta-set-with-palazzo-pants-contemporary-i.jpg",
    link: "/collections/kurta-sets",
  },
  {
    id: 5,
    name: "Lehenga Choli",
    description: "Bridal & festive grandeur",
    image: "/designer-lehenga-choli-with-heavy-embroidery-brida.jpg",
    link: "/collections/lehenga",
  },
  {
    id: 6,
    name: "Men's Sherwanis",
    description: "Regal attire for special occasions",
    image: "/placeholder-i091z.png",
    link: "/collections/sherwanis",
  },
]

export function QuickCollections() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gradient-gold mb-4">Curated Collections</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of authentic Indian ethnic wear, crafted by skilled artisans across the
            country
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Card key={collection.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {collection.featured && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <Button asChild className="w-full">
                    <Link href={collection.link}>Explore Collection</Link>
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {collection.name}
                </h3>
                <p className="text-muted-foreground">{collection.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/collections">View All Collections</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
