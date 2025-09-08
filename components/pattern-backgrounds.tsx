"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface PatternBackgroundProps {
  children: ReactNode
  pattern: "paisley" | "mandala" | "geometric" | "floral"
  intensity?: "subtle" | "medium" | "bold"
  className?: string
}

export function PatternBackground({ 
  children, 
  pattern, 
  intensity = "subtle", 
  className = "" 
}: PatternBackgroundProps) {
  const patterns = {
    paisley: {
      subtle: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20c0-11.046 8.954-20 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      medium: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.08'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20c0-11.046 8.954-20 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      bold: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.15'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20c0-11.046 8.954-20 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
    },
    mandala: {
      subtle: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a16207' fill-opacity='0.02'%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3Ccircle cx='40' cy='40' r='5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      medium: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a16207' fill-opacity='0.06'%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3Ccircle cx='40' cy='40' r='5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      bold: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a16207' fill-opacity='0.12'%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3Ccircle cx='40' cy='40' r='5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
    },
    geometric: {
      subtle: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fill-opacity='0.03'%3E%3Cpolygon points='20,0 40,20 20,40 0,20'/%3E%3C/g%3E%3C/svg%3E\")",
      medium: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fill-opacity='0.08'%3E%3Cpolygon points='20,0 40,20 20,40 0,20'/%3E%3C/g%3E%3C/svg%3E\")",
      bold: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fill-opacity='0.15'%3E%3Cpolygon points='20,0 40,20 20,40 0,20'/%3E%3C/g%3E%3C/svg%3E\")"
    },
    floral: {
      subtle: "url(\"data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a16207' fill-opacity='0.03'%3E%3Cpath d='M25 0C25 13.807 13.807 25 0 25s25 11.193 25 25 11.193-25 25-25S25 11.193 25 0z'/%3E%3C/g%3E%3C/svg%3E\")",
      medium: "url(\"data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a16207' fill-opacity='0.08'%3E%3Cpath d='M25 0C25 13.807 13.807 25 0 25s25 11.193 25 25 11.193-25 25-25S25 11.193 25 0z'/%3E%3C/g%3E%3C/svg%3E\")",
      bold: "url(\"data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a16207' fill-opacity='0.15'%3E%3Cpath d='M25 0C25 13.807 13.807 25 0 25s25 11.193 25 25 11.193-25 25-25S25 11.193 25 0z'/%3E%3C/g%3E%3C/svg%3E\")"
    }
  }

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        backgroundImage: patterns[pattern][intensity],
        backgroundRepeat: "repeat",
        backgroundSize: pattern === "mandala" ? "80px 80px" : "60px 60px"
      }}
    >
      {children}
    </div>
  )
}

export function FloatingPatterns() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Paisley */}
      <motion.div
        className="absolute top-20 left-10 w-8 h-8 opacity-10"
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-primary">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6.3-.11.49-.4.49-.72 0-.43-.35-.78-.78-.78-.22 0-.42.09-.56.24-.83.29-1.72.44-2.64.44-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8c0 .92-.15 1.81-.44 2.64-.15.14-.24.34-.24.56 0 .43.35.78.78.78.32 0 .61-.19.72-.49.39-1.07.6-2.22.6-3.41C22 6.48 17.52 2 12 2z"/>
        </svg>
      </motion.div>

      {/* Floating Mandala */}
      <motion.div
        className="absolute top-40 right-20 w-12 h-12 opacity-5"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-secondary">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="12" cy="12" r="1" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* More floating elements */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 opacity-5"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        >
          <div className="w-full h-full bg-primary rounded-full" />
        </motion.div>
      ))}
    </div>
  )
}