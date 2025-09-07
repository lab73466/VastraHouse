"use client"

import { useApp } from "@/lib/context/app-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Plus, Minus, X, Truck } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"

export function MiniCart() {
  const { state, dispatch } = useApp()

  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 999 ? 0 : 99
  const total = subtotal + shipping

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

  const handleClose = () => {
    dispatch({ type: "TOGGLE_MINI_CART" })
  }

  return (
    <Sheet open={state.isMiniCartOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({state.cart.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {state.cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground mb-4">Add some items to get started</p>
                <Button onClick={handleClose}>Continue Shopping</Button>
              </div>
            </div>
          ) : (
            <>
              {/* Free Shipping Progress */}
              {subtotal < 999 && (
                <div className="bg-card p-4 rounded-lg border mb-4">
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

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-4 py-4">
                {state.cart.map((item) => {
                  const itemId = `${item.id}-${item.selectedSize}-${item.selectedColor}`

                  return (
                    <div key={itemId} className="flex gap-3 p-3 bg-card rounded-lg border">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm truncate pr-2">{item.name}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 flex-shrink-0"
                            onClick={() => handleRemoveItem(itemId)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-xs text-muted-foreground mb-2">
                          {item.selectedSize} • {item.selectedColor}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0 bg-transparent"
                              onClick={() => handleQuantityChange(itemId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0 bg-transparent"
                              onClick={() => handleQuantityChange(itemId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-sm font-medium">₹{(item.price * item.quantity).toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link href="/cart" onClick={handleClose}>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Cart
                    </Button>
                  </Link>
                  <Link href="/checkout" onClick={handleClose}>
                    <Button className="w-full">Checkout</Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span>✓ Secure Payment</span>
                    <span>✓ Easy Returns</span>
                  </div>
                  <div className="text-xs text-muted-foreground">✓ Authentic Products</div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
