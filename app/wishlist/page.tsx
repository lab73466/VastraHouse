"use client"

import { useAppContext } from "@/lib/context/app-context"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function WishlistPage() {
  const { wishlist, products, addToCart } = useAppContext()

  const wishlistProducts = products.filter((product) => wishlist.includes(product.id))

  const handleAddAllToCart = () => {
    wishlistProducts.forEach((product) => {
      addToCart(product.id, 1)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
              {wishlistProducts.length} items
            </span>
          </div>

          {wishlistProducts.length > 0 && (
            <Button onClick={handleAddAllToCart} className="bg-amber-600 hover:bg-amber-700">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add All to Cart
            </Button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Discover beautiful ethnic wear and add items to your wishlist</p>
            <Link href="/products">
              <Button className="bg-amber-600 hover:bg-amber-700">Explore Collections</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
