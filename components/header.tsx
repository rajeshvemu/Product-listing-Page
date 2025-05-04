"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, ShoppingCart, Menu, X, User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import AuthModal from "./auth-modal"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, isLoading } = useAuth()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            ShopNow
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-600">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
          </nav>

          {/* Search, Cart, and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <Link href="/cart" className="p-2 rounded-full hover:bg-gray-100">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
            </Link>

            {isLoading ? (
              <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <Link href="/account" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  {user.name?.[0] || user.email[0].toUpperCase()}
                </div>
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Products
              </Link>
              <Link
                href="/categories"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/cart"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart</span>
                </Link>

                {isLoading ? (
                  <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse" />
                ) : user ? (
                  <Link href="/account" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      {user.name?.[0] || user.email[0].toUpperCase()}
                    </div>
                    <span>My Account</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsAuthModalOpen(true)
                    }}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
                  >
                    <User className="h-5 w-5" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </header>
  )
}
