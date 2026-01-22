"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, Bell, ShoppingBag, User, Menu, X, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "New Arrivals", href: "/shop?category=new" },
  { name: "Dresses", href: "/shop?category=dresses" },
  { name: "Tops", href: "/shop?category=tops" },
  { name: "Bottoms", href: "/shop?category=bottoms" },
  { name: "Outerwear", href: "/shop?category=outerwear" },
  { name: "About", href: "/about" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Header - Hidden on mobile */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        {/* Announcement bar */}
        <div className="bg-foreground text-background text-center py-2.5 text-xs tracking-wider">
          FREE SHIPPING ON ORDERS ABOVE Rs.2,999 | USE CODE: REVERIE10
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl lg:text-3xl font-light tracking-[0.3em] text-foreground">
                REVERIE
              </h1>
              <p className="text-[9px] tracking-[0.5em] text-muted-foreground -mt-0.5">
                BY ALIA BHATT
              </p>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors tracking-wide"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-4">
              <Link href="/shop" className="p-2 hover:text-primary transition-colors" aria-label="Search">
                <Search className="h-5 w-5" />
              </Link>
              <Link href="/account" className="p-2 hover:text-primary transition-colors" aria-label="Account">
                <User className="h-5 w-5" />
              </Link>
              <Link href="/cart" className="p-2 hover:text-primary transition-colors relative" aria-label="Shopping bag">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>
              <Link href="/admin" className="p-2 hover:text-primary transition-colors" aria-label="Admin">
                <LayoutDashboard className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header - Premium minimal Alia-inspired design */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 safe-area-top">
        {/* Premium frosted glass header */}
        <div className="bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-sm">
          <div className="flex items-center justify-between px-5 py-3.5">
            {/* Left - Menu */}
            <button 
              className="w-10 h-10 flex items-center justify-center -ml-2 active:scale-95 transition-transform"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5 text-foreground" strokeWidth={1.5} />
            </button>

            {/* Center - Premium Logo */}
            <Link href="/" className="text-center absolute left-1/2 -translate-x-1/2">
              <h1 className="text-xl font-light tracking-[0.25em] text-foreground">
                REVERIE
              </h1>
              <p className="text-[7px] tracking-[0.3em] text-muted-foreground -mt-0.5">
                BY ALIA BHATT
              </p>
            </Link>

            {/* Right - Cart */}
            <Link 
              href="/cart" 
              className="w-10 h-10 flex items-center justify-center -mr-2 active:scale-95 transition-transform relative" 
              aria-label="Shopping bag"
            >
              <ShoppingBag className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              <span className="absolute top-1 right-0.5 bg-primary text-primary-foreground text-[9px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-semibold">
                2
              </span>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
