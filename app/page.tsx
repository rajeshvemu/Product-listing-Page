"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import ScrollMoreButton from "@/components/scroll-more-button"
import { fetchProducts } from "@/lib/api"
import type { Product } from "@/lib/types"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadInitialProducts = async () => {
      setLoading(true)
      try {
        const initialProducts = await fetchProducts(1)
        setProducts(initialProducts)
      } catch (error) {
        console.error("Failed to load initial products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadInitialProducts()
  }, [])

  const loadMoreProducts = async () => {
    if (loading) return

    setLoading(true)
    try {
      const nextPage = page + 1
      const newProducts = await fetchProducts(nextPage)
      setProducts((prevProducts) => [...prevProducts, ...newProducts])
      setPage(nextPage)
    } catch (error) {
      console.error("Failed to load more products:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">Product Collection</h1>
        </div>
      </header>

      {/* Product Grid */}
      <div className="container mx-auto px-4">
        {loading && products.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="bg-white rounded-lg shadow-sm p-4 animate-pulse h-72">
                <div className="bg-gray-200 h-40 rounded-md mb-4"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2 mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Scroll More Button */}
      <ScrollMoreButton onClick={loadMoreProducts} loading={loading} />
    </main>
  )
}
