"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAppContext } from "@/lib/context/app-context"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const { products } = useAppContext()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  useEffect(() => {
    const query = searchQuery.toLowerCase()
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.fabric.toLowerCase().includes(query) ||
        product.heritage.region.toLowerCase().includes(query),
    )
    setFilteredProducts(filtered)
  }, [searchQuery, products])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    window.history.pushState({}, "", `/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const popularSearches = ["Banarasi Sarees", "Lehengas", "Kurtis", "Wedding Collection", "Silk Sarees"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for sarees, lehengas, kurtis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700 h-12 px-8">
                Search
              </Button>
            </form>

            {/* Popular Searches */}
            {!searchQuery && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search) => (
                    <Button
                      key={search}
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchQuery(search)}
                      className="text-amber-700 border-amber-200 hover:bg-amber-50"
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-600">Active filters:</span>
                {activeFilters.map((filter) => (
                  <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                    {filter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(filter)} />
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" onClick={() => setActiveFilters([])} className="text-amber-600">
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Search Results */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {searchQuery ? `Search results for "${searchQuery}"` : "Search Products"}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{filteredProducts.length} products found</span>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                {searchQuery ? "No products found" : "Start your search"}
              </h2>
              <p className="text-gray-500 mb-8">
                {searchQuery
                  ? "Try adjusting your search terms or browse our collections"
                  : "Enter a search term to find beautiful ethnic wear"}
              </p>
              {searchQuery && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Try searching for:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {popularSearches.map((search) => (
                      <Button key={search} variant="outline" size="sm" onClick={() => setSearchQuery(search)}>
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
