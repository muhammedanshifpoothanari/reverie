"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/reverie/header"
import { Footer } from "@/components/reverie/footer"
import { BottomNav } from "@/components/reverie/bottom-nav"
import { Eye, EyeOff, Package, Heart, Settings, LogOut, ChevronRight, ChevronLeft, X, User, ShoppingBag, Bell, CreditCard, MapPin, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type AuthMode = "login" | "register" | "forgot"

export default function AccountPage() {
  const router = useRouter()
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState<string | null>(null)
  
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [forgotEmail, setForgotEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setIsLoading(false)
    setIsLoggedIn(true)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setIsLoading(false)
    setIsLoggedIn(true)
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setIsLoading(false)
    setAuthMode("login")
  }

  const mockOrders = [
    { id: "REV-001234", date: "Jan 15, 2026", status: "Delivered", total: 14498, items: 2 },
    { id: "REV-001198", date: "Dec 28, 2025", status: "Delivered", total: 8999, items: 1 },
  ]

  const mockWishlist = [
    { id: 6, name: "Draped Saree Gown", price: 15999, image: "/images/product-6.jpg" },
    { id: 7, name: "The Signature Dress", price: 11999, image: "/images/bestseller-1.jpg" },
  ]

  const menuItems = [
    { id: "orders", label: "My Orders", icon: Package, badge: "2" },
    { id: "wishlist", label: "Wishlist", icon: Heart, badge: mockWishlist.length.toString() },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "help", label: "Help & Support", icon: HelpCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  // Auth screens
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-background">
        {/* Desktop Auth */}
        <div className="hidden md:block">
          <Header />
          <div className="pt-32 lg:pt-36 min-h-screen flex items-center justify-center bg-secondary">
            <div className="max-w-md w-full bg-card p-8 mx-4">
              {/* Logo */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-light tracking-[0.3em]">REVERIE</h1>
                <p className="text-xs tracking-widest text-muted-foreground mt-1">BY ALIA BHATT</p>
              </div>

              {authMode === "login" && (
                <>
                  <h2 className="text-2xl font-light text-center mb-6">Welcome Back</h2>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Email</label>
                      <Input
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="rounded-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Password</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="rounded-none pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <button type="button" onClick={() => setAuthMode("forgot")} className="text-sm text-primary">
                        Forgot Password?
                      </button>
                    </div>
                    <Button type="submit" className="w-full rounded-none h-12" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                  <p className="text-center mt-6 text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button onClick={() => setAuthMode("register")} className="text-primary font-medium">Create Account</button>
                  </p>
                </>
              )}

              {authMode === "register" && (
                <>
                  <h2 className="text-2xl font-light text-center mb-6">Create Account</h2>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Full Name</label>
                      <Input
                        type="text"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        className="rounded-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Email</label>
                      <Input
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        className="rounded-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Password</label>
                      <Input
                        type="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        className="rounded-none"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full rounded-none h-12" disabled={isLoading}>
                      {isLoading ? "Creating..." : "Create Account"}
                    </Button>
                  </form>
                  <p className="text-center mt-6 text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <button onClick={() => setAuthMode("login")} className="text-primary font-medium">Sign In</button>
                  </p>
                </>
              )}

              {authMode === "forgot" && (
                <>
                  <h2 className="text-2xl font-light text-center mb-6">Reset Password</h2>
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Email</label>
                      <Input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="rounded-none"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full rounded-none h-12" disabled={isLoading}>
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>
                  </form>
                  <p className="text-center mt-6 text-sm text-muted-foreground">
                    <button onClick={() => setAuthMode("login")} className="text-primary font-medium">Back to Sign In</button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Auth */}
        <div className="md:hidden pb-24">
          <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30 safe-area-top">
            <div className="flex items-center justify-between px-5 py-3.5">
              <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center -ml-2 active:scale-95 transition-transform" aria-label="Go back">
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <h1 className="text-base font-medium tracking-wide absolute left-1/2 -translate-x-1/2">
                {authMode === "login" ? "Sign In" : authMode === "register" ? "Create Account" : "Reset Password"}
              </h1>
              <div className="w-10" />
            </div>
          </header>

          <section className="pt-16 px-5">
            <div className="text-center mb-8">
              <h2 className="text-xl font-light tracking-[0.2em]">REVERIE</h2>
            </div>

            {authMode === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-4 py-4 bg-secondary rounded-2xl text-sm"
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full px-4 py-4 bg-secondary rounded-2xl text-sm pr-12"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <div className="text-right">
                  <button type="button" onClick={() => setAuthMode("forgot")} className="text-sm text-primary">Forgot Password?</button>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-foreground text-background py-4 rounded-2xl text-sm font-medium active:scale-[0.98] transition-transform disabled:opacity-50">
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
                <p className="text-center text-sm text-muted-foreground pt-4">
                  Don't have an account?{" "}
                  <button type="button" onClick={() => setAuthMode("register")} className="text-primary font-medium">Create Account</button>
                </p>
              </form>
            )}

            {authMode === "register" && (
              <form onSubmit={handleRegister} className="space-y-4">
                <input type="text" placeholder="Full name" value={registerData.name} onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} className="w-full px-4 py-4 bg-secondary rounded-2xl text-sm" required />
                <input type="email" placeholder="Email address" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} className="w-full px-4 py-4 bg-secondary rounded-2xl text-sm" required />
                <input type="password" placeholder="Password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} className="w-full px-4 py-4 bg-secondary rounded-2xl text-sm" required />
                <button type="submit" disabled={isLoading} className="w-full bg-foreground text-background py-4 rounded-2xl text-sm font-medium active:scale-[0.98] transition-transform disabled:opacity-50">
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
                <p className="text-center text-sm text-muted-foreground pt-4">
                  Already have an account?{" "}
                  <button type="button" onClick={() => setAuthMode("login")} className="text-primary font-medium">Sign In</button>
                </p>
              </form>
            )}

            {authMode === "forgot" && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <p className="text-sm text-muted-foreground text-center mb-4">Enter your email and we'll send you a reset link.</p>
                <input type="email" placeholder="Email address" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} className="w-full px-4 py-4 bg-secondary rounded-2xl text-sm" required />
                <button type="submit" disabled={isLoading} className="w-full bg-foreground text-background py-4 rounded-2xl text-sm font-medium active:scale-[0.98] transition-transform disabled:opacity-50">
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
                <p className="text-center pt-4">
                  <button type="button" onClick={() => setAuthMode("login")} className="text-sm text-primary font-medium">Back to Sign In</button>
                </p>
              </form>
            )}
          </section>

          <BottomNav />
        </div>
      </main>
    )
  }

  // Logged in dashboard
  return (
    <main className="min-h-screen bg-background">
      {/* Desktop Dashboard */}
      <div className="hidden md:block">
        <Header />
        <div className="pt-32 lg:pt-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <span className="text-foreground">My Account</span>
            </div>

            <div className="grid lg:grid-cols-4 gap-12">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Priya Sharma</p>
                    <p className="text-sm text-muted-foreground">priya@example.com</p>
                  </div>
                </div>

                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between py-3 px-4 text-sm transition-colors",
                        activeTab === item.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </div>
                      {item.badge && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5">{item.badge}</span>}
                    </button>
                  ))}
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="w-full flex items-center gap-3 py-3 px-4 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </nav>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                {(!activeTab || activeTab === "orders") && (
                  <div>
                    <h2 className="text-2xl font-light mb-6">My Orders</h2>
                    {mockOrders.length === 0 ? (
                      <div className="text-center py-12 bg-secondary">
                        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">No orders yet</p>
                        <Button asChild className="rounded-none"><Link href="/shop">Start Shopping</Link></Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {mockOrders.map((order) => (
                          <div key={order.id} className="border border-border p-6 flex items-center justify-between">
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.date} - {order.items} items</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">Rs.{order.total.toLocaleString()}</p>
                              <span className="text-sm text-emerald-600">{order.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "wishlist" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-light">Wishlist</h2>
                      <Button asChild variant="outline" className="rounded-none bg-transparent">
                        <Link href="/wishlist">View All</Link>
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                      {mockWishlist.map((item) => (
                        <Link key={item.id} href={`/product/${item.id}`} className="group">
                          <div className="relative aspect-[3/4] bg-secondary overflow-hidden mb-3">
                            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                          <h3 className="font-medium hover:text-primary transition-colors">{item.name}</h3>
                          <p className="text-muted-foreground">Rs.{item.price.toLocaleString()}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div>
                    <h2 className="text-2xl font-light mb-6">Account Settings</h2>
                    <div className="max-w-md space-y-6">
                      <div>
                        <label className="text-sm font-medium block mb-2">Full Name</label>
                        <Input defaultValue="Priya Sharma" className="rounded-none" />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">Email</label>
                        <Input defaultValue="priya@example.com" className="rounded-none" />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">Phone</label>
                        <Input defaultValue="+91 98765 43210" className="rounded-none" />
                      </div>
                      <Button className="rounded-none">Save Changes</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* Mobile Dashboard */}
      <div className="md:hidden pb-24">
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30 safe-area-top">
          <div className="flex items-center justify-between px-5 py-3.5">
            {activeTab ? (
              <button onClick={() => setActiveTab(null)} className="w-10 h-10 flex items-center justify-center -ml-2 active:scale-95 transition-transform" aria-label="Go back">
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
            ) : (
              <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center -ml-2 active:scale-95 transition-transform" aria-label="Go back">
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
            )}
            <h1 className="text-base font-medium tracking-wide absolute left-1/2 -translate-x-1/2">{activeTab ? menuItems.find(m => m.id === activeTab)?.label || "Account" : "My Account"}</h1>
            <div className="w-10" />
          </div>
        </header>

        {!activeTab ? (
          <section className="pt-16 px-5">
            <div className="flex items-center gap-4 bg-secondary rounded-2xl p-4 mb-5">
              <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Priya Sharma</p>
                <p className="text-sm text-muted-foreground">priya@example.com</p>
              </div>
            </div>

            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="w-full flex items-center justify-between bg-secondary rounded-2xl p-4 active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">{item.badge}</span>}
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </button>
              ))}
              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-full flex items-center gap-3 bg-secondary rounded-2xl p-4 active:scale-[0.98] transition-transform"
              >
                <LogOut className="h-5 w-5 text-destructive" />
                <span className="text-sm font-medium text-destructive">Sign Out</span>
              </button>
            </div>
          </section>
        ) : (
          <section className="pt-16 px-5">
            {activeTab === "orders" && (
              <div className="space-y-3">
                {mockOrders.map((order) => (
                  <div key={order.id} className="bg-secondary rounded-2xl p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{order.id}</span>
                      <span className="text-sm text-emerald-600">{order.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                    <div className="flex justify-between mt-3 pt-3 border-t border-border">
                      <span className="text-sm text-muted-foreground">{order.items} items</span>
                      <span className="font-medium">Rs.{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {mockWishlist.map((item) => (
                    <Link key={item.id} href={`/product/${item.id}`}>
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary mb-2">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                      <span className="text-sm text-muted-foreground">Rs.{item.price.toLocaleString()}</span>
                    </Link>
                  ))}
                </div>
                <Link href="/wishlist" className="block w-full text-center text-sm text-primary font-medium py-3 bg-primary/10 rounded-2xl">
                  View All Wishlist Items
                </Link>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-4">
                <input type="text" defaultValue="Priya Sharma" className="w-full px-4 py-4 bg-secondary rounded-2xl text-sm" placeholder="Full name" />
                <input type="email" defaultValue="priya@example.com" className="w-full px-4 py-4 bg-secondary rounded-2xl text-sm" placeholder="Email" />
                <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-4 bg-secondary rounded-2xl text-sm" placeholder="Phone" />
                <button className="w-full bg-foreground text-background py-4 rounded-2xl text-sm font-medium active:scale-[0.98] transition-transform">
                  Save Changes
                </button>
              </div>
            )}
          </section>
        )}

        <BottomNav />
      </div>
    </main>
  )
}
