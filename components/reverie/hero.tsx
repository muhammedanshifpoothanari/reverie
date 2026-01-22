"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <>
      {/* Desktop Hero - Hidden on mobile */}
      <section className="hidden md:block pt-32 lg:pt-36">
        <div className="relative h-[85vh] min-h-[600px] overflow-hidden">
          <Image
            src="/images/hero-mobile.jpg"
            alt="Reverie Spring Collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <div className="max-w-xl">
                <p className="text-xs lg:text-sm tracking-[0.5em] text-card mb-4 lg:mb-6">
                  SPRING/SUMMER 2026
                </p>
                <h2 className="text-5xl lg:text-7xl font-light text-card mb-4 lg:mb-6 leading-tight">
                  Timeless elegance
                  <br />
                  <span className="italic">meets modern grace</span>
                </h2>
                <p className="text-lg text-card/80 mb-8 leading-relaxed max-w-md">
                  Discover our new collection of ethereal pieces designed for the woman who dreams, dares, and defines her own style.
                </p>
                
                <div className="flex gap-4">
                  <Button asChild size="lg" className="text-base px-8 py-6 rounded-none">
                    <Link href="/shop?category=new">
                      Shop Collection
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-none border-card text-card hover:bg-card hover:text-foreground bg-transparent">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Film
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Hero - Premium Alia-inspired design */}
      <section className="md:hidden pt-14 pb-4 px-4">
        {/* Main hero card */}
        <div className="relative h-[62vh] rounded-3xl overflow-hidden bg-secondary">
          <Image
            src="/images/hero-mobile.jpg"
            alt="Reverie Collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          
          {/* Subtle badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-full text-[10px] font-medium tracking-wider text-foreground/90">
              NEW COLLECTION
            </span>
          </div>
          
          {/* Content overlay */}
          <div className="absolute inset-x-0 bottom-0 p-5 text-card">
            <p className="text-[10px] tracking-[0.3em] mb-2 opacity-70">SPRING/SUMMER 2026</p>
            <h2 className="text-2xl font-light tracking-wide mb-1 leading-tight">
              Timeless Elegance
            </h2>
            <p className="text-sm opacity-80 mb-4 font-light">
              Curated by Alia Bhatt
            </p>
            
            <div className="flex gap-3">
              <Link 
                href="/shop?category=new"
                className="flex-1 bg-card text-foreground py-3.5 rounded-xl text-center text-sm font-semibold tracking-wide active:scale-[0.98] transition-transform"
              >
                Shop Collection
              </Link>
              <button 
                className="w-14 h-14 bg-card/20 backdrop-blur-sm rounded-xl flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Watch video"
              >
                <Play className="h-5 w-5 fill-card text-card ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick action pills */}
        <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
          {["Trending", "Under 5K", "Wedding", "Festive", "Daily Wear"].map((tag) => (
            <Link
              key={tag}
              href={`/shop?tag=${tag.toLowerCase()}`}
              className="flex-shrink-0 px-4 py-2.5 bg-secondary rounded-full text-sm font-medium text-foreground active:scale-95 transition-transform"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
