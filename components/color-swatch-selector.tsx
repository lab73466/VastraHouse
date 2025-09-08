"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface ColorSwatchSelectorProps {
  colors: string[]
  selectedColor: string
  onColorChange: (color: string) => void
}

const colorMap: Record<string, string> = {
  "Red": "#DC2626",
  "Blue": "#2563EB", 
  "Green": "#16A34A",
  "Yellow": "#EAB308",
  "Pink": "#EC4899",
  "Purple": "#9333EA",
  "Orange": "#EA580C",
  "Black": "#000000",
  "White": "#FFFFFF",
  "Gold": "#F59E0B",
  "Silver": "#6B7280",
  "Maroon": "#7F1D1D",
  "Navy": "#1E3A8A",
  "Cream": "#FEF3C7",
  "Ivory": "#FFFBEB",
  "Royal Blue": "#1D4ED8",
  "Emerald Green": "#059669",
  "Deep Purple": "#6B21A8",
  "Crimson Red": "#B91C1C",
  "Powder Blue": "#BFDBFE",
  "Mint Green": "#A7F3D0",
  "Fuchsia Pink": "#E879F9",
  "Orange Red": "#EA580C",
  "Indigo Blue": "#3730A3",
  "Madder Red": "#B91C1C",
  "Natural Black": "#1F2937"
}

export function ColorSwatchSelector({ colors, selectedColor, onColorChange }: ColorSwatchSelectorProps) {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium">Color</label>
        <Badge variant="outline" className="text-xs">
          {selectedColor}
        </Badge>
      </div>

      <div className="grid grid-cols-6 gap-3">
        {colors.map((color) => {
          const colorValue = colorMap[color] || "#6B7280"
          const isSelected = selectedColor === color
          const isHovered = hoveredColor === color

          return (
            <motion.button
              key={color}
              onClick={() => onColorChange(color)}
              onMouseEnter={() => setHoveredColor(color)}
              onMouseLeave={() => setHoveredColor(null)}
              className={`relative w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                isSelected 
                  ? "border-primary shadow-lg scale-110" 
                  : "border-gray-300 hover:border-primary/50 hover:scale-105"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: colorValue }}
              />
              
              {/* White border for light colors */}
              {(color === "White" || color === "Cream" || color === "Ivory") && (
                <div className="absolute inset-1 rounded-full border border-gray-200" />
              )}

              {/* Check mark for selected color */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="bg-white rounded-full p-1 shadow-lg">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                </motion.div>
              )}

              {/* Hover tooltip */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10"
                >
                  {color}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Color Description */}
      {hoveredColor && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-muted/50 rounded-lg p-4"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">{hoveredColor}</span> - Perfect for {
              hoveredColor.includes("Red") ? "festive occasions and weddings" :
              hoveredColor.includes("Blue") ? "formal events and celebrations" :
              hoveredColor.includes("Green") ? "traditional ceremonies" :
              hoveredColor.includes("Gold") ? "special occasions and festivals" :
              "versatile styling options"
            }
          </p>
        </motion.div>
      )}
    </div>
  )
}