"use client"

import { useState } from "react"
import { useApp } from "@/lib/context/app-context"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, X, Star } from "lucide-react"
import { categories, colors, sizes, fabrics } from "@/lib/mock-data"

export function ProductFilters() {
  const { state, dispatch } = useApp()
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    colors: true,
    sizes: true,
    fabrics: true,
    rating: true,
    heritage: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...state.filters.categories, categoryId]
      : state.filters.categories.filter((id) => id !== categoryId)

    dispatch({ type: "SET_FILTERS", payload: { categories: newCategories } })
  }

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked ? [...state.filters.colors, color] : state.filters.colors.filter((c) => c !== color)

    dispatch({ type: "SET_FILTERS", payload: { colors: newColors } })
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked ? [...state.filters.sizes, size] : state.filters.sizes.filter((s) => s !== size)

    dispatch({ type: "SET_FILTERS", payload: { sizes: newSizes } })
  }

  const handleFabricChange = (fabric: string, checked: boolean) => {
    const newFabrics = checked ? [...state.filters.fabrics, fabric] : state.filters.fabrics.filter((f) => f !== fabric)

    dispatch({ type: "SET_FILTERS", payload: { fabrics: newFabrics } })
  }

  const handlePriceChange = (value: number[]) => {
    dispatch({ type: "SET_FILTERS", payload: { priceRange: value as [number, number] } })
  }

  const handleRatingChange = (rating: number) => {
    dispatch({ type: "SET_FILTERS", payload: { rating } })
  }

  const handleInStockChange = (checked: boolean) => {
    dispatch({ type: "SET_FILTERS", payload: { inStock: checked } })
  }

  const clearAllFilters = () => {
    dispatch({
      type: "SET_FILTERS",
      payload: {
        categories: [],
        priceRange: [0, 50000],
        colors: [],
        sizes: [],
        fabrics: [],
        rating: 0,
        inStock: false,
        heritage: [],
      },
    })
  }

  const getActiveFiltersCount = () => {
    return (
      state.filters.categories.length +
      state.filters.colors.length +
      state.filters.sizes.length +
      state.filters.fabrics.length +
      (state.filters.rating > 0 ? 1 : 0) +
      (state.filters.inStock ? 1 : 0) +
      (state.filters.priceRange[0] > 0 || state.filters.priceRange[1] < 50000 ? 1 : 0)
    )
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{activeFiltersCount}</Badge>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </div>
        )}
      </div>

      {/* Categories */}
      <Collapsible open={openSections.categories} onOpenChange={() => toggleSection("categories")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-0">
          <h3 className="font-medium">Categories</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.categories ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={state.filters.categories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                />
                <Label htmlFor={category.id} className="text-sm cursor-pointer">
                  {category.name}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">({category.count})</span>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Price Range */}
      <Collapsible open={openSections.price} onOpenChange={() => toggleSection("price")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-0">
          <h3 className="font-medium">Price Range</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.price ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-3">
          <div className="px-2">
            <Slider
              value={state.filters.priceRange}
              onValueChange={handlePriceChange}
              max={50000}
              min={0}
              step={500}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>₹{state.filters.priceRange[0].toLocaleString()}</span>
            <span>₹{state.filters.priceRange[1].toLocaleString()}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Colors */}
      <Collapsible open={openSections.colors} onOpenChange={() => toggleSection("colors")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-0">
          <h3 className="font-medium">Colors</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.colors ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="grid grid-cols-2 gap-2">
            {colors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={state.filters.colors.includes(color)}
                  onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                />
                <Label htmlFor={`color-${color}`} className="text-sm cursor-pointer">
                  {color}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Sizes */}
      <Collapsible open={openSections.sizes} onOpenChange={() => toggleSection("sizes")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-0">
          <h3 className="font-medium">Sizes</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.sizes ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={state.filters.sizes.includes(size)}
                  onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                />
                <Label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Fabrics */}
      <Collapsible open={openSections.fabrics} onOpenChange={() => toggleSection("fabrics")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-0">
          <h3 className="font-medium">Fabric</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.fabrics ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          {fabrics.map((fabric) => (
            <div key={fabric} className="flex items-center space-x-2">
              <Checkbox
                id={`fabric-${fabric}`}
                checked={state.filters.fabrics.includes(fabric)}
                onCheckedChange={(checked) => handleFabricChange(fabric, checked as boolean)}
              />
              <Label htmlFor={`fabric-${fabric}`} className="text-sm cursor-pointer">
                {fabric}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Rating */}
      <Collapsible open={openSections.rating} onOpenChange={() => toggleSection("rating")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-0">
          <h3 className="font-medium">Customer Rating</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.rating ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`flex items-center space-x-2 w-full text-left p-2 rounded-md transition-colors ${
                state.filters.rating === rating ? "bg-primary/10" : "hover:bg-muted"
              }`}
            >
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm">& Up</span>
            </button>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Availability */}
      <div className="space-y-3">
        <h3 className="font-medium">Availability</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="in-stock" checked={state.filters.inStock} onCheckedChange={handleInStockChange} />
          <Label htmlFor="in-stock" className="text-sm cursor-pointer">
            In Stock Only
          </Label>
        </div>
      </div>

      <Separator />

      {/* Heritage Crafts */}
      <Collapsible open={openSections.heritage} onOpenChange={() => toggleSection("heritage")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-0">
          <h3 className="font-medium">Heritage Crafts</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections.heritage ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          {[
            "Banarasi Weaving",
            "Chanderi Weaving",
            "Bandhani Tie-Dye",
            "Kanjivaram Silk Weaving",
            "Phulkari Embroidery",
            "Ajrakh Block Printing",
          ].map((craft) => (
            <div key={craft} className="flex items-center space-x-2">
              <Checkbox
                id={`heritage-${craft}`}
                checked={state.filters.heritage.includes(craft)}
                onCheckedChange={(checked) => {
                  const newHeritage = checked
                    ? [...state.filters.heritage, craft]
                    : state.filters.heritage.filter((h) => h !== craft)
                  dispatch({ type: "SET_FILTERS", payload: { heritage: newHeritage } })
                }}
              />
              <Label htmlFor={`heritage-${craft}`} className="text-sm cursor-pointer">
                {craft}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
