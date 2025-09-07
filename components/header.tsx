"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingBag, User, Menu, X, Heart, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAppContext } from "@/lib/context/app-context"
import { AuthModal } from "@/components/auth-modal"
import { MiniCart } from "@/components/mini-cart"
import { useToast } from "@/hooks/use-toast"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, cart, wishlist, toggleAuthModal, toggleMiniCart, setUser } = useAppContext()
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const handleAuthClick = () => {
    toggleAuthModal()
  }

  const handleCartClick = () => {
    toggleMiniCart()
  }

  const handleWishlistClick = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to view your wishlist",
      })
      toggleAuthModal()
      return
    }
    window.location.href = "/wishlist"
  }

  const handleLogout = () => {
    setUser(null)
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const handleSearchClick = () => {
    setIsSearchOpen(true)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Top announcement bar */}
        <div className="bg-primary text-primary-foreground text-center py-2 text-sm">
          <p>Free shipping on orders above ₹2,999 | Handcrafted with love ❤️</p>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="font-playfair text-2xl font-bold text-gradient-gold">VastraHaus</span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium">Women</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-muted-foreground">Traditional</h4>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/products?category=sarees"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Sarees</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Handwoven silk, cotton & designer sarees
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/products?category=kurta-sets"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Suits & Sets</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Anarkali, straight cut & palazzo sets
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-muted-foreground">Fusion</h4>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/products?category=kurtas"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Kurtas & Kurtis</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Contemporary & traditional kurtas
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/products?category=lehengas"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Lehengas</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Festive & wedding wear
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium">Men</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/products?category=kurtas"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Kurtas & Shirts</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Traditional & contemporary menswear
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/products?category=sherwanis"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Sherwanis</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Wedding & festive wear
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/products"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Collections
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    onClick={() =>
                      toast({
                        title: "Coming Soon!",
                        description: "Heritage section is under development",
                      })
                    }
                  >
                    Heritage
                  </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    onClick={() =>
                      toast({
                        title: "Coming Soon!",
                        description: "Artisans section is under development",
                      })
                    }
                  >
                    Artisans
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-2 flex-1 max-w-sm mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for sarees, kurtas..."
                  className="pl-10 bg-muted/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={handleSearchClick}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              <Button variant="ghost" size="icon" className="hidden md:flex relative" onClick={handleWishlistClick}>
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {wishlist.length}
                  </Badge>
                )}
                <span className="sr-only">Wishlist</span>
              </Button>

              {/* User Account */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => (window.location.href = "/profile")}>My Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => (window.location.href = "/orders")}>My Orders</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleWishlistClick}>My Wishlist</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        toast({
                          title: "Coming Soon!",
                          description: "Address management is under development",
                        })
                      }
                    >
                      Addresses
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" onClick={handleAuthClick}>
                  <User className="h-5 w-5" />
                  <span className="sr-only">Login</span>
                </Button>
              )}

              <Button variant="ghost" size="icon" className="relative" onClick={handleCartClick}>
                <ShoppingBag className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cart.length}
                  </Badge>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>

              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t py-4">
              <div className="space-y-4">
                <nav className="space-y-2">
                  <Link href="/products?category=sarees" className="block py-2 text-sm font-medium">
                    Women
                  </Link>
                  <Link href="/products?category=kurtas" className="block py-2 text-sm font-medium">
                    Men
                  </Link>
                  <Link href="/products" className="block py-2 text-sm font-medium">
                    Collections
                  </Link>
                  <Button
                    variant="ghost"
                    className="block py-2 text-sm font-medium w-full justify-start p-0 h-auto"
                    onClick={() =>
                      toast({
                        title: "Coming Soon!",
                        description: "Heritage section is under development",
                      })
                    }
                  >
                    Heritage
                  </Button>
                  <Button
                    variant="ghost"
                    className="block py-2 text-sm font-medium w-full justify-start p-0 h-auto"
                    onClick={() =>
                      toast({
                        title: "Coming Soon!",
                        description: "Artisans section is under development",
                      })
                    }
                  >
                    Artisans
                  </Button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <AuthModal />
      <MiniCart />
    </>
  )
}
