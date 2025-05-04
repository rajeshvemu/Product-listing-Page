import type { Product } from "./types"

// This function simulates fetching products from an API
export async function fetchProducts(page = 1, limit = 12): Promise<Product[]> {
  // In a real application, you would fetch from an actual API
  // For this example, we'll use the Fake Store API
  try {
    const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`)
    }

    const products = await response.json()

    // Simulate pagination by returning different subsets based on page
    // In a real app, the API would handle pagination
    return products.map((product: any) => ({
      ...product,
      // Ensure we have different products for different pages by modifying the id
      id: `${product.id}-page-${page}`,
      // Keep the original image but you could modify it to simulate different products
      image: product.image,
    }))
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}
