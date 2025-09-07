"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product, CartItem, User, FilterOptions } from "@/lib/types"
import { mockProducts } from "@/lib/mock-data"

interface AppState {
  user: User | null
  cart: CartItem[]
  wishlist: string[]
  products: Product[]
  filteredProducts: Product[]
  filters: FilterOptions
  isAuthModalOpen: boolean
  isMiniCartOpen: boolean
  searchQuery: string
  currentCategory: string
  sortBy: "featured" | "price-low" | "price-high" | "newest" | "rating"
  viewMode: "grid" | "list"
}

type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "ADD_TO_CART"; payload: { product: Product; size: string; color: string; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_CART_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_WISHLIST"; payload: string }
  | { type: "SET_FILTERS"; payload: Partial<FilterOptions> }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_SORT_BY"; payload: AppState["sortBy"] }
  | { type: "SET_VIEW_MODE"; payload: AppState["viewMode"] }
  | { type: "TOGGLE_AUTH_MODAL" }
  | { type: "TOGGLE_MINI_CART" }
  | { type: "FILTER_PRODUCTS" }

const initialState: AppState = {
  user: null,
  cart: [],
  wishlist: [],
  products: mockProducts,
  filteredProducts: mockProducts,
  filters: {
    categories: [],
    priceRange: [0, 50000],
    colors: [],
    sizes: [],
    fabrics: [],
    rating: 0,
    inStock: false,
    heritage: [],
  },
  isAuthModalOpen: false,
  isMiniCartOpen: false,
  searchQuery: "",
  currentCategory: "all",
  sortBy: "featured",
  viewMode: "grid",
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }

    case "ADD_TO_CART":
      const existingItem = state.cart.find(
        (item) =>
          item.id === action.payload.product.id &&
          item.selectedSize === action.payload.size &&
          item.selectedColor === action.payload.color,
      )

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === existingItem.id &&
            item.selectedSize === existingItem.selectedSize &&
            item.selectedColor === existingItem.selectedColor
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        }
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload.product,
            quantity: action.payload.quantity,
            selectedSize: action.payload.size,
            selectedColor: action.payload.color,
          },
        ],
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => `${item.id}-${item.selectedSize}-${item.selectedColor}` !== action.payload),
      }

    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          `${item.id}-${item.selectedSize}-${item.selectedColor}` === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      }

    case "CLEAR_CART":
      return { ...state, cart: [] }

    case "TOGGLE_WISHLIST":
      const isInWishlist = state.wishlist.includes(action.payload)
      return {
        ...state,
        wishlist: isInWishlist
          ? state.wishlist.filter((id) => id !== action.payload)
          : [...state.wishlist, action.payload],
      }

    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } }

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload }

    case "SET_CATEGORY":
      return { ...state, currentCategory: action.payload }

    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload }

    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload }

    case "TOGGLE_AUTH_MODAL":
      return { ...state, isAuthModalOpen: !state.isAuthModalOpen }

    case "TOGGLE_MINI_CART":
      return { ...state, isMiniCartOpen: !state.isMiniCartOpen }

    case "FILTER_PRODUCTS":
      let filtered = state.products

      // Filter by category
      if (state.currentCategory !== "all") {
        filtered = filtered.filter((product) => product.category === state.currentCategory)
      }

      // Filter by search query
      if (state.searchQuery) {
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(state.searchQuery.toLowerCase()),
        )
      }

      // Apply filters
      if (state.filters.categories.length > 0) {
        filtered = filtered.filter((product) => state.filters.categories.includes(product.category))
      }

      if (state.filters.colors.length > 0) {
        filtered = filtered.filter((product) => product.colors.some((color) => state.filters.colors.includes(color)))
      }

      if (state.filters.sizes.length > 0) {
        filtered = filtered.filter((product) => product.sizes.some((size) => state.filters.sizes.includes(size)))
      }

      if (state.filters.inStock) {
        filtered = filtered.filter((product) => product.inStock)
      }

      // Filter by price range
      filtered = filtered.filter(
        (product) => product.price >= state.filters.priceRange[0] && product.price <= state.filters.priceRange[1],
      )

      // Filter by rating
      if (state.filters.rating > 0) {
        filtered = filtered.filter((product) => product.rating >= state.filters.rating)
      }

      // Sort products
      switch (state.sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          filtered.sort((a, b) => b.price - a.price)
          break
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case "newest":
          filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
          break
        default:
          filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
      }

      return { ...state, filteredProducts: filtered }

    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Auto-filter products when dependencies change
  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" })
  }, [state.filters, state.searchQuery, state.currentCategory, state.sortBy])

  // Persist cart to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vastrahaus-cart", JSON.stringify(state.cart))
    }
  }, [state.cart])

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("vastrahaus-cart")
      if (savedCart) {
        const cartItems = JSON.parse(savedCart)
        cartItems.forEach((item: CartItem) => {
          dispatch({
            type: "ADD_TO_CART",
            payload: {
              product: item,
              size: item.selectedSize,
              color: item.selectedColor,
              quantity: item.quantity,
            },
          })
        })
      }
    }
  }, [])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

export function useAppContext() {
  const { state, dispatch } = useApp()

  return {
    // State
    user: state.user,
    cart: state.cart,
    wishlist: state.wishlist,
    products: state.products,
    filteredProducts: state.filteredProducts,
    filters: state.filters,
    isAuthModalOpen: state.isAuthModalOpen,
    isMiniCartOpen: state.isMiniCartOpen,
    searchQuery: state.searchQuery,
    currentCategory: state.currentCategory,
    sortBy: state.sortBy,
    viewMode: state.viewMode,

    // Actions
    setUser: (user: User | null) => dispatch({ type: "SET_USER", payload: user }),
    addToCart: (productId: string, quantity = 1, size = "M", color = "Default") => {
      const product = state.products.find((p) => p.id === productId)
      if (product) {
        dispatch({ type: "ADD_TO_CART", payload: { product, size, color, quantity } })
      }
    },
    removeFromCart: (itemId: string) => dispatch({ type: "REMOVE_FROM_CART", payload: itemId }),
    updateCartQuantity: (itemId: string, quantity: number) =>
      dispatch({ type: "UPDATE_CART_QUANTITY", payload: { id: itemId, quantity } }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    toggleWishlist: (productId: string) => dispatch({ type: "TOGGLE_WISHLIST", payload: productId }),
    setFilters: (filters: Partial<FilterOptions>) => dispatch({ type: "SET_FILTERS", payload: filters }),
    setSearchQuery: (query: string) => dispatch({ type: "SET_SEARCH_QUERY", payload: query }),
    setCategory: (category: string) => dispatch({ type: "SET_CATEGORY", payload: category }),
    setSortBy: (sortBy: AppState["sortBy"]) => dispatch({ type: "SET_SORT_BY", payload: sortBy }),
    setViewMode: (viewMode: AppState["viewMode"]) => dispatch({ type: "SET_VIEW_MODE", payload: viewMode }),
    toggleAuthModal: () => dispatch({ type: "TOGGLE_AUTH_MODAL" }),
    toggleMiniCart: () => dispatch({ type: "TOGGLE_MINI_CART" }),

    // Computed values
    cartTotal: state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    cartItemsCount: state.cart.reduce((count, item) => count + item.quantity, 0),
    wishlistCount: state.wishlist.length,
  }
}
