"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Mail, Gift, Star, Users, CheckCircle } from "lucide-react"

export default function NewsletterPage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    preferences: {
      newArrivals: true,
      exclusiveOffers: true,
      artisanStories: false,
      styleGuides: false,
      events: false,
    },
  })
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubscribed(true)
      toast({
        title: "Welcome to VastraHaus Newsletter!",
        description: "You'll receive your first newsletter within 24 hours.",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  const handlePreferenceChange = (key: string, checked: boolean) => {
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        [key]: checked,
      },
    })
  }

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to VastraHaus!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for subscribing to our newsletter. You'll be the first to know about new collections, exclusive
              offers, and artisan stories.
            </p>
            <Button onClick={() => (window.location.href = "/")} className="bg-amber-600 hover:bg-amber-700">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Mail className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Newsletter</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay connected with VastraHaus and be the first to discover new collections, exclusive offers, and
              inspiring artisan stories.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Benefits */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">What You'll Get</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Gift className="h-6 w-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Exclusive Offers</h3>
                    <p className="text-gray-600">
                      Get early access to sales and subscriber-only discounts up to 30% off.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Star className="h-6 w-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">New Collection Previews</h3>
                    <p className="text-gray-600">Be the first to see and shop our latest ethnic wear collections.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Artisan Stories</h3>
                    <p className="text-gray-600">
                      Learn about the talented craftspeople behind our beautiful garments.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Form */}
            <Card>
              <CardHeader>
                <CardTitle>Subscribe Now</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Your first name"
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium">What would you like to receive?</Label>
                    <div className="space-y-3 mt-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newArrivals"
                          checked={formData.preferences.newArrivals}
                          onCheckedChange={(checked) => handlePreferenceChange("newArrivals", checked as boolean)}
                        />
                        <Label htmlFor="newArrivals" className="text-sm font-normal">
                          New arrivals and collections
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="exclusiveOffers"
                          checked={formData.preferences.exclusiveOffers}
                          onCheckedChange={(checked) => handlePreferenceChange("exclusiveOffers", checked as boolean)}
                        />
                        <Label htmlFor="exclusiveOffers" className="text-sm font-normal">
                          Exclusive offers and discounts
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="artisanStories"
                          checked={formData.preferences.artisanStories}
                          onCheckedChange={(checked) => handlePreferenceChange("artisanStories", checked as boolean)}
                        />
                        <Label htmlFor="artisanStories" className="text-sm font-normal">
                          Artisan stories and heritage content
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="styleGuides"
                          checked={formData.preferences.styleGuides}
                          onCheckedChange={(checked) => handlePreferenceChange("styleGuides", checked as boolean)}
                        />
                        <Label htmlFor="styleGuides" className="text-sm font-normal">
                          Style guides and fashion tips
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="events"
                          checked={formData.preferences.events}
                          onCheckedChange={(checked) => handlePreferenceChange("events", checked as boolean)}
                        />
                        <Label htmlFor="events" className="text-sm font-normal">
                          Events and trunk shows
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={isSubmitting}>
                    {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By subscribing, you agree to receive marketing emails from VastraHaus. You can unsubscribe at any
                    time.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
