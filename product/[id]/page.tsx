import { getProduct } from "@/lib/api"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Star } from "lucide-react"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: product.title,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg">
          <div className="relative h-96 w-full bg-gray-100 rounded-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(product.rating.rate) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Category</h2>
            <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-800">
              {product.category}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium flex-1">
              Add to Cart
            </button>
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 px-6 rounded-md font-medium flex-1">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
