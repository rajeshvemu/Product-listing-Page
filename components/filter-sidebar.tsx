"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

type FilterSection = {
  title: string
  options: { id: string; label: string }[]
}

const filterSections: FilterSection[] = [
  {
    title: "Category",
    options: [
      { id: "electronics", label: "Electronics" },
      { id: "clothing", label: "Clothing" },
      { id: "jewelry", label: "Jewelry" },
      { id: "home", label: "Home & Kitchen" },
    ],
  },
  {
    title: "Price Range",
    options: [
      { id: "under-25", label: "Under $25" },
      { id: "25-50", label: "$25 to $50" },
      { id: "50-100", label: "$50 to $100" },
      { id: "over-100", label: "Over $100" },
    ],
  },
  {
    title: "Rating",
    options: [
      { id: "4-up", label: "4 Stars & Up" },
      { id: "3-up", label: "3 Stars & Up" },
      { id: "2-up", label: "2 Stars & Up" },
      { id: "1-up", label: "1 Star & Up" },
    ],
  },
]

export default function FilterSidebar() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    Object.fromEntries(filterSections.map((section) => [section.title, true])),
  )

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <div className="bg-white rounded-lg border p-4">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {filterSections.map((section) => (
        <div key={section.title} className="mb-4 pb-4 border-b last:border-b-0">
          <button
            className="flex justify-between items-center w-full text-left font-medium"
            onClick={() => toggleSection(section.title)}
          >
            {section.title}
            {expandedSections[section.title] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {expandedSections[section.title] && (
            <div className="mt-2 space-y-1">
              {section.options.map((option) => (
                <div key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={option.id}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={option.id} className="ml-2 text-sm text-gray-600">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded">
        Clear All Filters
      </button>
    </div>
  )
}
