export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  images: string[]
  category: string
  subcategory: string
  description: string
  fabric: string
  care: string[]
  sizes: string[]
  colors: string[]
  inStock: boolean
  stockCount: number
  rating: number
  reviewCount: number
  isNew?: boolean
  isFeatured?: boolean
  artisan?: {
    name: string
    location: string
    story: string
    image: string
  }
  heritage?: {
    region: string
    craft: string
    history: string
  }
}

export interface CartItem extends Product {
  quantity: number
  selectedSize: string
  selectedColor: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  addresses: Address[]
  wishlist: string[]
  orders: Order[]
}

export interface Address {
  id: string
  type: "home" | "work" | "other"
  name: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  createdAt: Date
  deliveryAddress: Address
  paymentMethod: string
  trackingId?: string
}

export interface FilterOptions {
  categories: string[]
  priceRange: [number, number]
  colors: string[]
  sizes: string[]
  fabrics: string[]
  rating: number
  inStock: boolean
  heritage: string[]
}
