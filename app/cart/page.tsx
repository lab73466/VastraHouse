"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useApp } from "@/lib/context/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Minus, ShoppingBag, Truck } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { state, dispatch } = useApp()
  const [promoCode, setPromoCode] = useState("")
  const [giftMessage, setGiftMessage] = useState("")

  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 999 ? 0 : 99
  const tax = Math.round(subtotal * 0.18) // 18% GST
  const total = subtotal + shipping + tax

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: itemId })
      toast.success("Item removed from cart")
    } else {
      dispatch({ type: "UPDATE_CART_QUANTITY", payload: { id: itemId, quantity: newQuantity } })
    }
  }

  const handleRemoveItem = (itemId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId })
    toast.success("Item removed from cart")
  }

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      toast.success("Promo code applied! 10% discount")
    } else {
      toast.error("Invalid promo code")
    }
  }

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span>/</span>
          <span className="text-foreground">Shopping Cart</span>
        </nav>

        <h1 className="text-3xl font-playfair font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Progress */}
            {subtotal < 999 && (
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    Add ₹{(999 - subtotal).toLocaleString()} more for free shipping!
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((subtotal / 999) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {state.cart.map((item) => {
              const itemId = `${item.id}-${item.selectedSize}-${item.selectedColor}`

              return (
                <div key={itemId} className="bg-card p-6 rounded-lg border">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.images[0] || "/placeholder.svg"}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>Size: {item.selectedSize}</span>
                            <span>Color: {item.selectedColor}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(itemId)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(itemId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(itemId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</div>
                          {item.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              ₹{(item.originalPrice * item.quantity).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-4">Promo Code</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button onClick={handleApplyPromo}>Apply</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Try "WELCOME10" for 10% off</p>
            </div>

            {/* Gift Message */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-4">Gift Message (Optional)</h3>
              <textarea
                className="w-full p-3 border rounded-md resize-none"
                rows={3}
                placeholder="Add a personal message..."
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
              />
            </div>

            {/* Order Summary */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-4">Order Summary</h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({state.cart.length} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (GST 18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Link href="/checkout" className="block mt-6">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/products" className="block mt-2">
                <Button variant="outline" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-4">Why Shop With Us?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full" />
                  <span>100% Authentic Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full" />
                  <span>Easy 30-day Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full" />
                  <span>Secure Payment Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full" />
                  <span>Supporting Local Artisans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
