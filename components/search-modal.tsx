"use client"

import { useState, useEffect } from "react"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppContext } from "@/lib/context/app-context"
import type { Product } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const { products } = useAppContext()

  const trendingSearches = ["Banarasi Sarees", "Lehenga Choli", "Silk Kurtas", "Wedding Collection", "Festive Wear"]

  useEffect(() => {
    if (query.length > 2) {
      const filtered = products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
        )
        .slice(0, 6)
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query, products])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      setRecentSearches((prev) => {
        const updated = [searchQuery, ...prev.filter((s) => s !== searchQuery)].slice(0, 5)
        return updated
      })
      onOpenChange(false)
      // Navigate to search results
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search for sarees, lehengas, kurtas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
              className="pl-10 pr-10 h-12 text-lg border-0 bg-muted/50 focus-visible:ring-0"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
              >
                <X size={16} />
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="max-h-96 overflow-y-auto">
          {query.length > 2 && results.length > 0 && (
            <div className="p-6 pt-0">
              <h3 className="font-medium mb-4">Products</h3>
              <div className="space-y-3">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={() => onOpenChange(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <p className="font-semibold text-amber-600">₹{product.price.toLocaleString()}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {query.length <= 2 && (
            <div className="p-6 pt-0 space-y-6">
              {recentSearches.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Clock size={16} />
                    Recent Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-muted"
                        onClick={() => handleSearch(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <TrendingUp size={16} />
                  Trending Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-muted border-amber-200 text-amber-700"
                      onClick={() => handleSearch(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {query.length > 2 && results.length === 0 && (
            <div className="p-6 pt-0 text-center text-muted-foreground">
              <p>No products found for "{query}"</p>
              <p className="text-sm mt-1">Try searching for sarees, lehengas, or kurtas</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
