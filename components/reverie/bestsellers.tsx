"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const bestsellers = [
  {
    id: 1,
    name: "The Signature Dress",
    price: 11999,
    image: "/images/bestseller-1.jpg",
    rating: 4.9,
    reviews: 248,
    soldCount: "2.3k",
  },
  {
    id: 2,
    name: "Cloud Soft Cardigan",
    price: 7999,
    image: "/images/bestseller-2.jpg",
    rating: 4.8,
    reviews: 186,
    soldCount: "1.8k",
  },
  {
    id: 3,
    name: "Heritage Saree",
    price: 18999,
    image: "/images/bestseller-3.jpg",
    rating: 5.0,
    reviews: 312,
    soldCount: "890",
  },
  {
    id: 4,
    name: "Evening Gown",
    price: 22999,
    image: "/images/bestseller-4.jpg",
    rating: 4.9,
    reviews: 94,
    soldCount: "456",
  },
]

export function Bestsellers() {
  const [likedItems, setLikedItems] = useState<number[]>([])

  const toggleLike = (id: number) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <>
      {/* Desktop Bestsellers */}
      <section className="hidden md:block py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.5em] text-muted-foreground mb-3">CUSTOMER FAVORITES</p>
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-foreground">
                Bestsellers
              </h2>
            </div>
            <Link 
              href="/shop?sort=bestselling" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors tracking-wide underline underline-offset-4"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {bestsellers.map((product) => (
              <div key={product.id} className="group">
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs tracking-wider px-3 py-1.5">
                      BESTSELLER
                    </span>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleLike(product.id)
                      }}
                      className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                      aria-label={likedItems.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{product.soldCount} sold</span>
                  </div>
                  
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-base font-medium text-foreground hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <span className="text-lg font-semibold text-foreground">
                    Rs.{product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Bestsellers - Premium grid design */}
      <section className="md:hidden py-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-medium tracking-wide text-foreground">
              Bestsellers
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Most loved by our community
            </p>
          </div>
          <Link href="/shop?sort=bestselling" className="text-sm text-primary font-medium">
            See All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {bestsellers.map((product, index) => (
            <div 
              key={product.id} 
              className={cn(
                "group",
                index === 0 && "col-span-2"
              )}
            >
              <Link href={`/product/${product.id}`}>
                <div className={cn(
                  "relative rounded-2xl overflow-hidden bg-secondary mb-2",
                  index === 0 ? "aspect-[2/1]" : "aspect-[3/4]"
                )}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  
                  <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] tracking-wider px-2.5 py-1 rounded-full font-medium">
                    BESTSELLER
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleLike(product.id)
                    }}
                    className="absolute top-3 right-3 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-90 transition-transform"
                    aria-label={likedItems.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart 
                      className={cn(
                        "h-4 w-4 transition-colors",
                        likedItems.includes(product.id) ? "fill-primary text-primary" : "text-foreground"
                      )} 
                    />
                  </button>
                </div>
              </Link>
              
              <div className="space-y-1">
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-sm font-medium text-foreground line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-xs font-medium text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>
                
                <span className="text-sm font-semibold text-foreground">
                  Rs.{product.price.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
