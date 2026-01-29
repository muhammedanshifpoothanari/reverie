"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingBag, Package, Users, BarChart3, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
]

const settingsItems = [
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Logout", href: "/", icon: LogOut },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 bg-card border-r border-border/50 flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <Link href="/admin" className="flex flex-col">
          <h1 className="text-xl font-light tracking-[0.25em] text-foreground">rêverie</h1>
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground -mt-0.5">ADMIN</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Settings */}
      <div className="p-4 space-y-2 border-t border-border/50">
        {settingsItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                "text-muted-foreground hover:bg-secondary"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
