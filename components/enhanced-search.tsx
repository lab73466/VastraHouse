"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Clock, TrendingUp, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/context/app-context"
import Image from "next/image"
import Link from "next/link"

interface EnhancedSearchProps {
  isOpen: boolean
  onClose: () => void
}

export function EnhancedSearch({ isOpen, onClose }: EnhancedSearchProps) {
  const { state } = useApp()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Banarasi Sarees", "Lehenga Choli", "Silk Kurtas"
  ])
  const inputRef = useRef<HTMLInputElement>(null)

  const trendingSearches = [
    "Diwali Collection", "Bridal Lehengas", "Kanjivaram Sarees", 
    "Anarkali Suits", "Festive Wear", "Wedding Collection"
  ]

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (query.length > 2) {
      const filtered = state.products
        .filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.fabric.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6)
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query, state.products])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      setRecentSearches(prev => {
        const updated = [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 5)
        return updated
      })
      onClose()
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="bg-background mx-4 mt-20 rounded-2xl shadow-2xl max-w-2xl mx-auto overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="p-6 border-b">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                ref={inputRef}
                placeholder="Search for sarees, lehengas, kurtas..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
                className="pl-12 pr-12 h-14 text-lg border-0 bg-muted/50 focus-visible:ring-0 rounded-xl"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.length > 2 && results.length > 0 && (
              <div className="p-6">
                <h3 className="font-medium mb-4 text-muted-foreground">Products</h3>
                <div className="space-y-3">
                  {results.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 4 }}
                    >
                      <Link
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate group-hover:text-primary transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{product.fabric}</Badge>
                            {product.heritage?.region && (
                              <Badge variant="secondary" className="text-xs">{product.heritage.region}</Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">₹{product.price.toLocaleString()}</p>
                          {product.originalPrice && (
                            <p className="text-xs text-muted-foreground line-through">
                              ₹{product.originalPrice.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {query.length <= 2 && (
              <div className="p-6 space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Recent Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Badge
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                            onClick={() => handleSearch(search)}
                          >
                            {search}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    Trending Now
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {trendingSearches.map((search, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-auto p-3 text-left hover:bg-muted/50"
                          onClick={() => handleSearch(search)}
                        >
                          <div>
                            <p className="font-medium">{search}</p>
                            <p className="text-xs text-muted-foreground">Popular this week</p>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {query.length > 2 && results.length === 0 && (
              <div className="p-6 text-center text-muted-foreground">
                <p>No products found for "{query}"</p>
                <p className="text-sm mt-1">Try searching for sarees, lehengas, or kurtas</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}