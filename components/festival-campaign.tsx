import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Gift, Clock } from "lucide-react"

export function FestivalCampaign() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5 pattern-paisley">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Diwali Special Collection
              </Badge>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gradient-gold leading-tight">
                Illuminate Your Festivities
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Celebrate the festival of lights with our exclusive Diwali collection. From shimmering sarees to elegant
                kurta sets, find the perfect outfit to make your celebrations truly special.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-primary/20">
                <CardContent className="p-4 text-center">
                  <Gift className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Free Gift Wrapping</h3>
                  <p className="text-sm text-muted-foreground">Beautiful packaging for gifting</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Express Delivery</h3>
                  <p className="text-sm text-muted-foreground">Get it delivered in 2-3 days</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base px-8" asChild>
                <Link href="/collections/diwali">Shop Diwali Collection</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8 bg-transparent" asChild>
                <Link href="/gift-guide">Diwali Gift Guide</Link>
              </Button>
            </div>

            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 border">
              <h4 className="font-semibold text-primary mb-2">Limited Time Offer</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Get up to 30% off on festive wear + complimentary styling consultation
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium">Offer ends in 5 days</span>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image src="/woman-in-golden-silk-saree-diwali-celebration-trad.jpg" alt="Diwali Saree Collection" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src="/elegant-kurta-set-with-dupatta-diwali-ethnic-wear.jpg" alt="Festive Kurta Sets" fill className="object-cover" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src="/designer-lehenga-with-embroidery-diwali-party-wear.jpg" alt="Designer Lehengas" fill className="object-cover" />
              </div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Men's Festive Wear"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
