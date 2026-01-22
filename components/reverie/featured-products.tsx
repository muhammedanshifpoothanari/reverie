"use client"

import React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star, Plus, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Silk Midi Dress",
    price: 8999,
    originalPrice: 12999,
    image: "/images/product-1.jpg",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    colors: ["Rose", "Ivory", "Black"],
  },
  {
    id: 2,
    name: "Cashmere Wrap Blouse",
    price: 6499,
    image: "/images/product-2.jpg",
    rating: 4.9,
    reviews: 89,
    isNew: true,
    colors: ["Cream", "Blush"],
  },
  {
    id: 3,
    name: "Wide Leg Trousers",
    price: 5999,
    image: "/images/product-3.jpg",
    rating: 4.7,
    reviews: 156,
    isNew: false,
    colors: ["Tan", "Black", "Navy"],
  },
  {
    id: 4,
    name: "Linen Maxi Skirt",
    price: 4999,
    image: "/images/product-4.jpg",
    rating: 4.6,
    reviews: 98,
    isNew: true,
    colors: ["Sage", "White"],
  },
  {
    id: 5,
    name: "Embroidered Kurta",
    price: 7499,
    image: "/images/product-5.jpg",
    rating: 4.9,
    reviews: 212,
    isNew: true,
    colors: ["Off-white", "Blush"],
  },
  {
    id: 6,
    name: "Draped Saree Gown",
    price: 15999,
    image: "/images/product-6.jpg",
    rating: 5.0,
    reviews: 78,
    isNew: true,
    colors: ["Champagne", "Emerald"],
  },
]

function ProductCard({ product, isDesktop = false }: { product: typeof products[0], isDesktop?: boolean }) {
  const [isLiked, setIsLiked] = useState(false)

  if (isDesktop) {
    return (
      <div className="group">
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Badges */}
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
            
            {/* Wishlist */}
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsLiked(!isLiked)
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
              aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart 
                className={cn(
                  "h-5 w-5 transition-colors",
                  isLiked ? "fill-primary text-primary" : "text-foreground"
                )} 
              />
            </button>

            {/* Quick add */}
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

          <div className="flex gap-1.5">
            {product.colors.map((color) => (
              <span key={color} className="text-xs text-muted-foreground">{color}</span>
            )).reduce((prev, curr, i) => i === 0 ? [curr] : [...prev, <span key={`sep-${i}`} className="text-muted-foreground/50">|</span>, curr], [] as React.ReactNode[])}
          </div>
        </div>
      </div>
    )
  }

  // Mobile card
  return (
    <div className="flex-shrink-0 w-[160px] group">
      <Link href={`/product/${product.id}`} className="block">
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
            <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-medium px-2 py-1 rounded-full">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
      </Link>
      
      <div className="space-y-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-medium text-foreground leading-tight line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex-shrink-0 p-1 active:scale-90 transition-transform"
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart 
              className={cn(
                "h-5 w-5 transition-colors",
                isLiked ? "fill-primary text-primary" : "text-muted-foreground"
              )} 
            />
          </button>
        </div>
        
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-foreground">
            Rs.{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              Rs.{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function FeaturedProducts() {
  return (
    <>
      {/* Desktop Products */}
      <section className="hidden md:block py-16 lg:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.5em] text-muted-foreground mb-3">JUST IN</p>
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-foreground">
                New Arrivals
              </h2>
            </div>
            <Link 
              href="/shop?category=new" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors tracking-wide underline underline-offset-4"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} isDesktop />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Products - Clean premium design */}
      <section className="md:hidden py-6">
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium tracking-wide text-foreground">
                New Arrivals
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Fresh drops this week
              </p>
            </div>
            <Link 
              href="/shop?category=new" 
              className="text-sm text-primary font-medium"
            >
              See All
            </Link>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 pl-4 pr-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
