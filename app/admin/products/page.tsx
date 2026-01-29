"use client"

import { useState } from "react"
import { Plus, Search, Edit2, Trash2, Eye, MoreHorizontal } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

// Mock product data
const products = [
  {
    id: 1,
    name: "Silk Saree - Midnight Blue",
    category: "Sarees",
    price: "SAR 3,999",
    stock: 45,
    image: "/images/product-1.jpg",
    status: "Active",
  },
  {
    id: 2,
    name: "Embroidered Lehenga",
    category: "Lehengas",
    price: "SAR 4,299",
    stock: 28,
    image: "/images/product-2.jpg",
    status: "Active",
  },
  {
    id: 3,
    name: "Cotton Kurtis Collection",
    category: "Kurtis",
    price: "SAR 1,299",
    stock: 120,
    image: "/images/product-3.jpg",
    status: "Active",
  },
  {
    id: 4,
    name: "Designer Anarkali",
    category: "Dresses",
    price: "SAR 4,499",
    stock: 12,
    image: "/images/product-4.jpg",
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Premium Dupatta",
    category: "Accessories",
    price: "SAR 899",
    stock: 0,
    image: "/images/product-5.jpg",
    status: "Out of Stock",
  },
  {
    id: 6,
    name: "Silk Blend Kurta",
    category: "Kurtis",
    price: "SAR 2,299",
    stock: 85,
    image: "/images/product-6.jpg",
    status: "Active",
  },
]

const Loading = () => null

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const searchParams = useSearchParams()

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleSelectProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length && filteredProducts.length > 0) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id))
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-medium text-foreground mb-2">Products</h1>
            <p className="text-muted-foreground">Manage all your products</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-5 w-5" />
            Add Product
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4 bg-card border-border/50">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary border-border/50"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </Card>

        {/* Products Table */}
        <Card className="bg-card border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleSelectProduct(product.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{product.name}</p>
                          <p className="text-xs text-muted-foreground">ID: #{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">{product.price}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{product.stock} units</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${product.status === "Active" ? "bg-green-100 text-green-700" :
                          product.status === "Low Stock" ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                        }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <div className="flex gap-2">
            <Button variant="outline">← Previous</Button>
            <Button variant="outline">Next →</Button>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
