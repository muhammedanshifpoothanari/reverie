"use client"

import { useState, useMemo, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/reverie/header"
import { Footer } from "@/components/reverie/footer"
import { BottomNav } from "@/components/reverie/bottom-nav"
import { Heart, Star, SlidersHorizontal, X, Check, ChevronDown, ShoppingBag, Grid3X3, LayoutList } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categories = [
  { id: "all", name: "All" },
  { id: "new", name: "New" },
  { id: "dresses", name: "Dresses" },
  { id: "tops", name: "Tops" },
  { id: "bottoms", name: "Bottoms" },
  { id: "outerwear", name: "Outerwear" },
  { id: "sarees", name: "Sarees" },
]

const sortOptions = [
  { id: "newest", name: "Newest First" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
  { id: "bestselling", name: "Bestselling" },
]

const products = [
  { id: 1, name: "Silk Midi Dress", price: 8999, originalPrice: 12999, image: "/images/product-1.jpg", rating: 4.8, reviews: 124, isNew: true, category: "dresses", colors: ["Rose", "Ivory"] },
  { id: 2, name: "Cashmere Wrap Blouse", price: 6499, originalPrice: null, image: "/images/product-2.jpg", rating: 4.9, reviews: 89, isNew: true, category: "tops", colors: ["Cream", "Blush"] },
  { id: 3, name: "Wide Leg Trousers", price: 5999, originalPrice: null, image: "/images/product-3.jpg", rating: 4.7, reviews: 156, isNew: false, category: "bottoms", colors: ["Tan", "Black"] },
  { id: 4, name: "Linen Maxi Skirt", price: 4999, originalPrice: null, image: "/images/product-4.jpg", rating: 4.6, reviews: 98, isNew: true, category: "bottoms", colors: ["Sage", "White"] },
  { id: 5, name: "Embroidered Kurta", price: 7499, originalPrice: null, image: "/images/product-5.jpg", rating: 4.8, reviews: 203, isNew: false, category: "tops", colors: ["Off-white"] },
  { id: 6, name: "Draped Saree Gown", price: 15999, originalPrice: null, image: "/images/product-6.jpg", rating: 4.9, reviews: 67, isNew: true, category: "sarees", colors: ["Champagne", "Emerald"] },
  { id: 7, name: "The Signature Dress", price: 11999, originalPrice: null, image: "/images/bestseller-1.jpg", rating: 4.9, reviews: 248, isNew: false, category: "dresses", colors: ["Burgundy", "Navy"] },
  { id: 8, name: "Cloud Soft Cardigan", price: 7999, originalPrice: 9999, image: "/images/bestseller-2.jpg", rating: 4.8, reviews: 186, isNew: false, category: "outerwear", colors: ["Blush", "Grey"] },
]

function ShopContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") || "all"
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [selectedSort, setSelectedSort] = useState("newest")
  const [showSort, setShowSort] = useState(false)
  const [likedItems, setLikedItems] = useState<number[]>([])

  const toggleLike = (id: number) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const filteredProducts = useMemo(() => {
    let filtered = products
    
    if (selectedCategory === "new") {
      filtered = products.filter(p => p.isNew)
    } else if (selectedCategory !== "all") {
      filtered = products.filter(p => p.category === selectedCategory)
    }
    
    switch (selectedSort) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price)
      default:
        return filtered
    }
  }, [selectedCategory, selectedSort])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Desktop Shop */}
      <div className="hidden md:block pt-32 lg:pt-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Shop</span>
          </div>

          <div className="flex gap-12">
            {/* Sidebar filters */}
            <aside className="w-64 flex-shrink-0">
              <h2 className="text-lg font-medium mb-6">Categories</h2>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "w-full text-left py-2 text-sm transition-colors",
                      selectedCategory === cat.id
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-light tracking-wide text-foreground">
                    {categories.find(c => c.id === selectedCategory)?.name || "All Products"}
                  </h1>
                  <p className="text-muted-foreground mt-1">{filteredProducts.length} products</p>
                </div>
                
                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group">
                    <Link href={`/product/${product.id}`} className="block">
                      <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {product.isNew && (
                            <span className="bg-foreground text-background text-xs tracking-wider px-3 py-1.5">
                              NEW
                            </span>
                          )}
                          {product.originalPrice && (
                            <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5">
                              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                            </span>
                          )}
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleLike(product.id)
                          }}
                          className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                          aria-label="Add to wishlist"
                        >
                          <Heart 
                            className={cn(
                              "h-5 w-5 transition-colors",
                              likedItems.includes(product.id) ? "fill-primary text-primary" : "text-foreground"
                            )} 
                          />
                        </button>

                        <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button className="w-full rounded-none" size="lg">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Quick Add
                          </Button>
                        </div>
                      </div>
                    </Link>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                      
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-base font-medium text-foreground hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-foreground">
                          Rs.{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            Rs.{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-1.5 text-xs text-muted-foreground">
                        {product.colors.join(" | ")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No products found</p>
                  <Button variant="outline" onClick={() => setSelectedCategory("all")}>
                    View all products
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Mobile Shop */}
      <div className="md:hidden pb-24">
        <div className="pt-16">
          {/* Title */}
          <div className="px-5 py-4">
            <h1 className="text-xl font-medium text-foreground tracking-wide">Shop</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {filteredProducts.length} products
            </p>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-colors active:scale-95",
                  selectedCategory === cat.id
                    ? "bg-foreground text-background"
                    : "bg-secondary text-foreground"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <button 
              onClick={() => setShowSort(true)}
              className="flex items-center gap-2 text-sm text-foreground active:opacity-70 transition-opacity"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Sort & Filter
            </button>
            <span className="text-sm text-muted-foreground">
              {sortOptions.find(s => s.id === selectedSort)?.name}
            </span>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 gap-3 p-5">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                <Link href={`/product/${product.id}`}>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary mb-3">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-foreground text-background text-[10px] tracking-wider px-2.5 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                    
                    {product.originalPrice && (
                      <span className="absolute top-3 right-12 bg-primary text-primary-foreground text-[10px] font-medium px-2 py-1 rounded-full">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    )}
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleLike(product.id)
                      }}
                      className="absolute top-3 right-3 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-90 transition-transform"
                      aria-label="Add to wishlist"
                    >
                      <Heart 
                        className={cn(
                          "h-4 w-4",
                          likedItems.includes(product.id) ? "fill-primary text-primary" : "text-foreground"
                        )} 
                      />
                    </button>
                  </div>
                </Link>
                
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="text-xs font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Rs.{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        Rs.{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 px-5">
              <p className="text-muted-foreground mb-4">No products found</p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-primary font-medium active:opacity-70"
              >
                View all products
              </button>
            </div>
          )}
        </div>

        {/* Sort bottom sheet */}
        {showSort && (
          <div className="fixed inset-0 z-50">
            <div 
              className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
              onClick={() => setShowSort(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl p-5 pb-10 animate-in slide-in-from-bottom duration-300">
              <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Sort By</h3>
                <button 
                  onClick={() => setShowSort(false)}
                  className="p-2 -mr-2 active:opacity-70"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSelectedSort(option.id)
                      setShowSort(false)
                    }}
                    className={cn(
                      "w-full flex items-center justify-between py-4 px-4 rounded-2xl transition-colors",
                      selectedSort === option.id ? "bg-secondary" : "active:bg-secondary/50"
                    )}
                  >
                    <span className="text-sm font-medium">{option.name}</span>
                    {selectedSort === option.id && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    </main>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ShopContent />
    </Suspense>
  )
}
