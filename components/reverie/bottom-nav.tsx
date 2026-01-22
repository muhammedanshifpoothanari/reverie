"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Heart, User, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop", href: "/shop", icon: Search },
  { name: "Wishlist", href: "/wishlist", icon: Heart },
  { name: "Bag", href: "/cart", icon: ShoppingBag },
  { name: "Account", href: "/account", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    /* Premium minimal bottom navigation */
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border/50 safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/" && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all active:scale-95 min-w-[60px]",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "relative p-1.5 rounded-xl transition-all",
                isActive && "bg-primary/10"
              )}>
                <item.icon 
                  className={cn(
                    "h-5 w-5 transition-all",
                    isActive ? "stroke-[2]" : "stroke-[1.5]"
                  )} 
                />
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </div>
              <span className={cn(
                "text-[10px] tracking-wide transition-all",
                isActive ? "font-semibold" : "font-medium"
              )}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
