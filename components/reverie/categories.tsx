"use client"

import { cn } from "@/lib/utils"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Dresses",
    count: "124",
    image: "/images/category-dresses.jpg",
    href: "/shop?category=dresses",
  },
  {
    name: "Tops",
    count: "86",
    image: "/images/category-tops.jpg",
    href: "/shop?category=tops",
  },
  {
    name: "Bottoms",
    count: "52",
    image: "/images/category-bottoms.jpg",
    href: "/shop?category=bottoms",
  },
  {
    name: "Outerwear",
    count: "38",
    image: "/images/category-outerwear.jpg",
    href: "/shop?category=outerwear",
  },
  {
    name: "Sarees",
    count: "64",
    image: "/images/bestseller-3.jpg",
    href: "/shop?category=sarees",
  },
  {
    name: "Ethnic",
    count: "78",
    image: "/images/product-5.jpg",
    href: "/shop?category=ethnic",
  },
]

export function Categories() {
  return (
    <>
      {/* Desktop Categories */}
      <section className="hidden md:block py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.5em] text-muted-foreground mb-3">EXPLORE</p>
            <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-foreground">
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative aspect-[3/4] overflow-hidden bg-secondary"
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-xl font-medium text-card mb-1">{category.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-card/80">{category.count} items</span>
                    <ArrowRight className="h-5 w-5 text-card transform translate-x-0 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Categories - Clean premium design */}
      <section className="md:hidden py-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium tracking-wide text-foreground">
            Categories
          </h2>
          <Link 
            href="/shop" 
            className="text-sm text-primary font-medium"
          >
            See All
          </Link>
        </div>

        {/* Horizontal scroll categories */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
          {categories.slice(0, 5).map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex-shrink-0 group active:scale-95 transition-transform"
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-secondary mb-2 ring-2 ring-border">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center text-xs font-medium text-foreground">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
