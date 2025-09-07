"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/lib/context/app-context"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

interface WishlistButtonProps {
  product: Product
  className?: string
  size?: "sm" | "md" | "lg"
}

export function WishlistButton({ product, className, size = "md" }: WishlistButtonProps) {
  const { wishlist, addToWishlist, removeFromWishlist } = useAppContext()
  const isInWishlist = wishlist.some((item) => item.id === product.id)

  const handleToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={cn(
        sizeClasses[size],
        "rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200",
        isInWishlist && "text-red-500 hover:text-red-600",
        className,
      )}
    >
      <Heart size={iconSizes[size]} className={cn("transition-all duration-200", isInWishlist && "fill-current")} />
    </Button>
  )
}
