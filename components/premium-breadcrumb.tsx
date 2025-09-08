"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { motion } from "framer-motion"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PremiumBreadcrumbProps {
  items: BreadcrumbItem[]
}

export function PremiumBreadcrumb({ items }: PremiumBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link 
          href="/" 
          className="flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <Home className="w-4 h-4" />
        </Link>
      </motion.div>

      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center space-x-2"
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          {item.href ? (
            <Link 
              href={item.href}
              className="text-muted-foreground hover:text-primary transition-colors capitalize"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium capitalize">{item.label}</span>
          )}
        </motion.div>
      ))}
    </nav>
  )
}