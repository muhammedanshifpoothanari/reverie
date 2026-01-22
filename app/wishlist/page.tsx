"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/reverie/header"
import { Footer } from "@/components/reverie/footer"
import { Heart, X, ChevronLeft, ShoppingBag, Share2, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const initialWishlistItems = [
  { id: 1, name: "Silk Midi Dress", color: "Dusty Rose", price: 8999, originalPrice: 10999, image: "/images/product-1.jpg", inStock: true },
  { id: 6, name: "Draped Saree Gown", color: "Champagne Gold", price: 15999, originalPrice: null, image: "/images/product-6.jpg", inStock: true },
  { id: 7, name: "The Signature Dress", color: "Burgundy", price: 11999, originalPrice: null, image: "/images/bestseller-1.jpg", inStock: true },
  { id: 8, name: "Cloud Soft Cardigan", color: "Blush Pink", price: 6999, originalPrice: 8999, image: "/images/bestseller-2.jpg", inStock: false },
]

export default function WishlistPage() {
  const router = useRouter()
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)
  const [addedToBag, setAddedToBag] = useState<number[]>([])

  const removeItem = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
  }

  const addToBag = (id: number) => {
    setAddedToBag(prev => [...prev, id])
    setTimeout(() => {
      setAddedToBag(prev => prev.filter(i => i !== id))
    }, 2000)
  }

  const moveAllToBag = () => {
    const inStockIds = wishlistItems.filter(item => item.inStock).map(item => item.id)
    setAddedToBag(inStockIds)
    setTimeout(() => {
      setAddedToBag([])
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Desktop Wishlist */}
      <div className="hidden md:block">
        <Header />
        <div className="pt-32 lg:pt-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">Wishlist</span>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-light tracking-wide text-foreground">My Wishlist</h1>
                <p className="text-muted-foreground mt-2">{wishlistItems.length} items saved</p>
              </div>
              {wishlistItems.length > 0 && (
                <Button onClick={moveAllToBag} variant="outline" className="rounded-none bg-transparent">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add All to Bag
                </Button>
              )}
            </div>

            {wishlistItems.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-light text-foreground mb-3">Your wishlist is empty</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Save your favorite pieces here to shop them later
                </p>
                <Button asChild size="lg" className="rounded-none">
                  <Link href="/shop">Explore Collection</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="group relative">
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-3 right-3 z-10 w-9 h-9 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                      aria-label="Remove from wishlist"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {/* Product Image */}
                    <Link href={`/product/${item.id}`}>
                      <div className={cn(
                        "relative aspect-[3/4] bg-secondary overflow-hidden mb-4",
                        !item.inStock && "opacity-60"
                      )}>
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {!item.inStock && (
                          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                            <span className="bg-foreground text-background px-4 py-2 text-sm font-medium">
                              Out of Stock
                            </span>
                          </div>
                        )}
                        {item.originalPrice && item.inStock && (
                          <span className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                            SALE
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-medium hover:text-primary transition-colors">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.color}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Rs.{item.price.toLocaleString()}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            Rs.{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Add to Bag Button */}
                      <Button
                        onClick={() => addToBag(item.id)}
                        disabled={!item.inStock || addedToBag.includes(item.id)}
                        className="w-full rounded-none mt-3"
                        variant={addedToBag.includes(item.id) ? "secondary" : "default"}
                      >
                        {addedToBag.includes(item.id) ? "Added to Bag" : item.inStock ? "Add to Bag" : "Notify Me"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Footer />
        </div>
      </div>

      {/* Mobile Wishlist */}
      <div className="md:hidden pb-32">
        {/* Premium Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30 safe-area-top">
          <div className="flex items-center justify-between px-5 py-3.5">
            <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center -ml-2 active:scale-95 transition-transform" aria-label="Go back">
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <h1 className="text-base font-medium tracking-wide absolute left-1/2 -translate-x-1/2">Wishlist</h1>
            <button className="w-10 h-10 flex items-center justify-center -mr-2 active:scale-95 transition-transform" aria-label="Share wishlist">
              <Share2 className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </header>

        {wishlistItems.length === 0 ? (
          <section className="pt-20 px-5">
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium text-foreground mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-xs">Save your favorite pieces to shop them later</p>
              <Link href="/shop" className="bg-foreground text-background px-8 py-4 rounded-2xl text-sm font-medium active:scale-[0.98] transition-transform">
                Explore Collection
              </Link>
            </div>
          </section>
        ) : (
          <>
            <section className="pt-14 px-5">
              <p className="text-sm text-muted-foreground mb-4">{wishlistItems.length} saved items</p>

              <div className="grid grid-cols-2 gap-3">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="relative">
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-2 z-10 w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-90 transition-transform"
                      aria-label="Remove from wishlist"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <Link href={`/product/${item.id}`}>
                      <div className={cn(
                        "relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary mb-3",
                        !item.inStock && "opacity-60"
                      )}>
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        {!item.inStock && (
                          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                            <span className="bg-foreground text-background px-3 py-1.5 text-xs font-medium rounded-lg">
                              Out of Stock
                            </span>
                          </div>
                        )}
                        {item.originalPrice && item.inStock && (
                          <span className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-[10px] font-medium rounded-lg">
                            SALE
                          </span>
                        )}
                      </div>
                    </Link>

                    <div className="space-y-1">
                      <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.color}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">Rs.{item.price.toLocaleString()}</span>
                        {item.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            Rs.{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToBag(item.id)}
                        disabled={!item.inStock || addedToBag.includes(item.id)}
                        className={cn(
                          "w-full py-2.5 rounded-xl text-xs font-medium mt-2 active:scale-[0.98] transition-all",
                          addedToBag.includes(item.id)
                            ? "bg-secondary text-foreground"
                            : item.inStock
                            ? "bg-foreground text-background"
                            : "bg-secondary text-muted-foreground"
                        )}
                      >
                        {addedToBag.includes(item.id) ? "Added" : item.inStock ? "Add to Bag" : "Notify Me"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Fixed bottom action bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/50 p-4 pb-8 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] safe-area-bottom">
              <button
                onClick={moveAllToBag}
                className="w-full bg-foreground text-background py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-lg"
              >
                <ShoppingBag className="h-5 w-5" />
                Add All to Bag ({wishlistItems.filter(i => i.inStock).length} items)
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
