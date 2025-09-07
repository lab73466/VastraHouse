"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const stateData = {
  "West Bengal": {
    name: "West Bengal",
    craft: "Tant & Jamdani Sarees",
    description: "Known for handwoven cotton tant sarees and intricate jamdani work",
    specialties: ["Tant Sarees", "Jamdani", "Baluchari", "Kantha Embroidery"],
    colors: ["White", "Red", "Yellow", "Blue"],
  },
  "Tamil Nadu": {
    name: "Tamil Nadu",
    craft: "Kanjivaram Silk Sarees",
    description: "Famous for pure silk sarees with temple borders and rich zari work",
    specialties: ["Kanjivaram Silk", "Temple Borders", "Korvai Technique", "Pattu Sarees"],
    colors: ["Gold", "Red", "Green", "Purple"],
  },
  "Uttar Pradesh": {
    name: "Uttar Pradesh",
    craft: "Banarasi & Chikankari",
    description: "Home to luxurious Banarasi silk and delicate chikankari embroidery",
    specialties: ["Banarasi Silk", "Chikankari", "Zardozi", "Mukaish Work"],
    colors: ["Gold", "Silver", "White", "Cream"],
  },
  Rajasthan: {
    name: "Rajasthan",
    craft: "Bandhani & Block Prints",
    description: "Vibrant tie-dye bandhani and traditional block printed fabrics",
    specialties: ["Bandhani", "Block Prints", "Leheriya", "Gota Work"],
    colors: ["Red", "Yellow", "Pink", "Orange"],
  },
  Gujarat: {
    name: "Gujarat",
    craft: "Patola & Bandhani",
    description: "Double ikat patola sarees and colorful bandhani textiles",
    specialties: ["Patola", "Bandhani", "Ajrakh", "Mirror Work"],
    colors: ["Red", "Green", "Yellow", "Blue"],
  },
  Karnataka: {
    name: "Karnataka",
    craft: "Mysore Silk & Ilkal",
    description: "Elegant Mysore silk sarees and traditional Ilkal cotton sarees",
    specialties: ["Mysore Silk", "Ilkal Sarees", "Kasuti Embroidery", "Lambani Work"],
    colors: ["Cream", "Gold", "Maroon", "Green"],
  },
}

export function InteractiveCultureMap() {
  const [selectedState, setSelectedState] = useState<string | null>("Tamil Nadu")

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gradient-gold mb-4">
            Explore India's Textile Heritage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the rich textile traditions from different states of India. Click on a state to learn about its
            unique crafts and specialties.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interactive Map Placeholder */}
          <div className="relative">
            <div className="bg-background rounded-lg p-8 border shadow-sm">
              <h3 className="text-xl font-semibold mb-6 text-center">Indian States & Their Crafts</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(stateData).map(([stateKey, state]) => (
                  <Button
                    key={stateKey}
                    variant={selectedState === stateKey ? "default" : "outline"}
                    className="h-auto p-4 text-left justify-start"
                    onClick={() => setSelectedState(stateKey)}
                  >
                    <div>
                      <div className="font-medium">{state.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{state.craft}</div>
                    </div>
                  </Button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-6 text-center">
                Click on any state to explore its textile heritage
              </p>
            </div>
          </div>

          {/* State Details */}
          <div className="space-y-6">
            {selectedState && stateData[selectedState] && (
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair text-gradient-gold">
                    {stateData[selectedState].name}
                  </CardTitle>
                  <p className="text-lg font-medium text-primary">{stateData[selectedState].craft}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">{stateData[selectedState].description}</p>

                  <div>
                    <h4 className="font-semibold mb-3">Traditional Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {stateData[selectedState].specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Traditional Colors</h4>
                    <div className="flex flex-wrap gap-2">
                      {stateData[selectedState].colors.map((color) => (
                        <Badge key={color} variant="outline">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button asChild className="w-full">
                      <a href={`/collections/${selectedState.toLowerCase().replace(/\s+/g, "-")}`}>
                        Shop {stateData[selectedState].name} Collection
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-primary">Did You Know?</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  India has over 40 different types of traditional textiles, each with its own unique weaving
                  techniques, patterns, and cultural significance. Many of these crafts have been passed down through
                  generations and are protected under Geographical Indication (GI) tags.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
