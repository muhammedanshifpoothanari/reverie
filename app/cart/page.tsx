"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/reverie/header"
import { Footer } from "@/components/reverie/footer"
import { Minus, Plus, X, Truck, Shield, RotateCcw, Tag, ChevronLeft, Percent, ChevronRight, ShoppingBag, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const initialCartItems = [
  { id: 1, name: "Silk Midi Dress", color: "Dusty Rose", size: "M", price: 8999, quantity: 1, image: "/images/product-1.jpg" },
  { id: 2, name: "Cashmere Wrap Blouse", color: "Cream", size: "S", price: 6499, quantity: 2, image: "/images/product-2.jpg" }
]

const suggestedProducts = [
  { id: 3, name: "Wide Leg Trousers", price: 5999, image: "/images/product-3.jpg" },
  { id: 4, name: "Linen Maxi Skirt", price: 4999, image: "/images/product-4.jpg" },
  { id: 5, name: "Embroidered Kurta", price: 7499, image: "/images/product-5.jpg" },
]

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [showPromo, setShowPromo] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item))
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 2999 ? 0 : 99
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + shipping - discount

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "reverie10") {
      setPromoApplied(true)
      setShowPromo(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Desktop Cart */}
      <div className="hidden md:block">
        <Header />
        <div className="pt-32 lg:pt-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <span className="text-foreground">Shopping Bag</span>
            </div>

            <h1 className="text-3xl font-light tracking-wide text-foreground mb-8">Shopping Bag</h1>

            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-light text-foreground mb-3">Your bag is empty</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Explore our collection and find something you love
                </p>
                <Button asChild size="lg" className="rounded-none">
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                  <p className="text-muted-foreground">{cartItems.length} items</p>
                  
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-6 py-6 border-b border-border">
                      <Link href={`/product/${item.id}`}>
                        <div className="relative w-32 h-40 bg-secondary overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                      </Link>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <Link href={`/product/${item.id}`}>
                              <h3 className="text-lg font-medium hover:text-primary transition-colors">{item.name}</h3>
                            </Link>
                            <p className="text-muted-foreground mt-1">{item.color} / {item.size}</p>
                          </div>
                          <span className="text-lg font-semibold">Rs.{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center gap-4 border border-border">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Suggested Products */}
                  <div className="pt-8">
                    <h2 className="text-xl font-light mb-6">Complete Your Look</h2>
                    <div className="grid grid-cols-3 gap-6">
                      {suggestedProducts.map((product) => (
                        <Link key={product.id} href={`/product/${product.id}`} className="group">
                          <div className="relative aspect-[3/4] bg-secondary overflow-hidden mb-3">
                            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                          <h3 className="text-sm font-medium">{product.name}</h3>
                          <span className="text-sm text-muted-foreground">Rs.{product.price.toLocaleString()}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-secondary p-6 sticky top-40">
                    <h2 className="text-lg font-medium mb-6">Order Summary</h2>
                    
                    {/* Promo Code */}
                    <div className="mb-6">
                      {!promoApplied && (
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Promo code"
                            className="flex-1 rounded-none"
                          />
                          <Button onClick={applyPromo} variant="outline" className="rounded-none bg-transparent">Apply</Button>
                        </div>
                      )}
                      {promoApplied && (
                        <div className="flex items-center justify-between bg-emerald-50 text-emerald-700 px-4 py-3">
                          <span className="text-sm font-medium">REVERIE10 Applied</span>
                          <span className="text-sm">-10%</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 pb-4 border-b border-border">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>Rs.{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className={shipping === 0 ? "text-emerald-600" : ""}>
                          {shipping === 0 ? "FREE" : `Rs.${shipping}`}
                        </span>
                      </div>
                      {promoApplied && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Discount</span>
                          <span className="text-emerald-600">-Rs.{discount.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between text-lg font-semibold py-4 mb-6">
                      <span>Total</span>
                      <span>Rs.{total.toLocaleString()}</span>
                    </div>

                    <Button asChild className="w-full rounded-none h-14 mb-4">
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>

                    <div className="flex justify-center gap-6 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        <span className="text-xs">Free Shipping</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span className="text-xs">Secure Payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Footer />
        </div>
      </div>

      {/* Mobile Cart */}
      <div className="md:hidden pb-52">
        {/* Premium Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30 safe-area-top">
          <div className="flex items-center justify-between px-5 py-3.5">
            <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center -ml-2 active:scale-95 transition-transform" aria-label="Go back">
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <h1 className="text-base font-medium tracking-wide absolute left-1/2 -translate-x-1/2">My Bag</h1>
            <div className="w-10" />
          </div>
        </header>

        {cartItems.length === 0 ? (
          <section className="pt-20 px-5">
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                <Tag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium text-foreground mb-2">Your bag is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-xs">Explore our collection and find something you love</p>
              <Link href="/shop" className="bg-foreground text-background px-8 py-4 rounded-2xl text-sm font-medium tracking-wide active:scale-[0.98] transition-transform">
                Start Shopping
              </Link>
            </div>
          </section>
        ) : (
          <>
            {/* Cart Items */}
            <section className="pt-14 px-5">
              <p className="text-sm text-muted-foreground mb-4">{cartItems.length} items</p>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-secondary rounded-2xl p-4">
                    <Link href={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-card">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                    </Link>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/product/${item.id}`}>
                          <h3 className="font-medium text-foreground line-clamp-1">{item.name}</h3>
                        </Link>
                        <button onClick={() => removeItem(item.id)} className="p-1 text-muted-foreground active:scale-90 transition-transform" aria-label="Remove item">
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-1">{item.color} / {item.size}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 bg-card rounded-xl p-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded-lg active:bg-secondary transition-colors" aria-label="Decrease quantity">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-lg active:bg-secondary transition-colors" aria-label="Increase quantity">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="font-semibold">Rs.{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Promo Code */}
            <section className="px-5 py-6">
              <button onClick={() => setShowPromo(!showPromo)} className="w-full flex items-center justify-between bg-secondary rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <Percent className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{promoApplied ? "REVERIE10 Applied" : "Apply Promo Code"}</span>
                </div>
                {promoApplied ? (
                  <span className="text-sm text-emerald-600 font-medium">-10%</span>
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              
              {showPromo && !promoApplied && (
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code (try REVERIE10)"
                    className="flex-1 px-4 py-3 bg-secondary rounded-xl text-sm border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button onClick={applyPromo} className="px-5 py-3 bg-foreground text-background rounded-xl text-sm font-medium active:scale-95 transition-transform">
                    Apply
                  </button>
                </div>
              )}
            </section>

            {/* Trust badges */}
            <section className="px-5 pb-6">
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 bg-secondary rounded-2xl p-4">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-xs">Free Shipping</span>
                </div>
                <div className="flex-1 flex items-center gap-2 bg-secondary rounded-2xl p-4">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span className="text-xs">Easy Returns</span>
                </div>
                <div className="flex-1 flex items-center gap-2 bg-secondary rounded-2xl p-4">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-xs">Secure</span>
                </div>
              </div>
            </section>

            {/* Suggested Products */}
            <section className="py-6">
              <div className="px-5 mb-4">
                <h2 className="text-lg font-medium">Complete Your Look</h2>
              </div>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide px-5 pb-2">
                {suggestedProducts.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`} className="flex-shrink-0 w-32">
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary mb-2">
                      <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                    </div>
                    <h3 className="text-xs font-medium line-clamp-1">{product.name}</h3>
                    <span className="text-xs text-muted-foreground">Rs.{product.price.toLocaleString()}</span>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Fixed bottom checkout bar */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/50 p-5 pb-8 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] safe-area-bottom">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rs.{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className={shipping === 0 ? "text-emerald-600" : ""}>{shipping === 0 ? "FREE" : `Rs.${shipping}`}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-emerald-600">-Rs.{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                <span>Total</span>
                <span>Rs.{total.toLocaleString()}</span>
              </div>
            </div>
            
            <Link href="/checkout" className="w-full bg-foreground text-background py-3.5 rounded-xl text-sm font-semibold tracking-wide active:scale-[0.98] transition-transform flex items-center justify-center shadow-lg">
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
