import Image from "next/image"
import type { Product } from "@/lib/types"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative h-48 md:h-56 bg-gray-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h2 className="text-sm md:text-base font-medium text-gray-900 line-clamp-1">{product.title}</h2>
        <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-1">{product.category}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm md:text-base font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <div className="flex items-center">
            <span className="text-xs md:text-sm text-yellow-500">★</span>
            <span className="text-xs md:text-sm text-gray-600 ml-1">{product.rating.rate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
