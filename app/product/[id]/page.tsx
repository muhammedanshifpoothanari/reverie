"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/reverie/header"
import { Footer } from "@/components/reverie/footer"
import { Heart, Minus, Plus, Star, ChevronDown, ChevronLeft, Share2, ShoppingBag, Truck, RotateCcw, Shield, X, Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const products = [
  { id: 1, name: "Silk Midi Dress", price: 8999, originalPrice: 12999, image: "/images/product-1.jpg", images: ["/images/product-1.jpg", "/images/bestseller-1.jpg"], category: "Dresses", description: "A flowing silk midi dress that moves with grace. Crafted from premium mulberry silk with a subtle sheen. Features an elegant draped neckline and adjustable waist tie. Perfect for both day and evening occasions.", colors: ["Dusty Rose", "Ivory", "Midnight"], sizes: ["XS", "S", "M", "L", "XL"], rating: 4.8, reviews: 124, soldCount: "2.3k" },
  { id: 2, name: "Cashmere Wrap Blouse", price: 6499, originalPrice: null, image: "/images/product-2.jpg", images: ["/images/product-2.jpg"], category: "Tops", description: "Luxuriously soft cashmere blouse with an elegant wrap design. Perfect for transitional dressing.", colors: ["Cream", "Blush", "Charcoal"], sizes: ["XS", "S", "M", "L", "XL"], rating: 4.9, reviews: 89, soldCount: "1.5k" },
  { id: 3, name: "Wide Leg Trousers", price: 5999, originalPrice: null, image: "/images/product-3.jpg", images: ["/images/product-3.jpg"], category: "Bottoms", description: "Effortlessly chic wide-leg trousers in breathable linen. High-waisted with a flowing silhouette.", colors: ["Beige", "White", "Navy"], sizes: ["XS", "S", "M", "L", "XL"], rating: 4.7, reviews: 156, soldCount: "980" },
  { id: 4, name: "Linen Maxi Skirt", price: 4999, originalPrice: null, image: "/images/product-4.jpg", images: ["/images/product-4.jpg"], category: "Bottoms", description: "A romantic maxi skirt in soft sage linen with comfortable elasticated waist.", colors: ["Sage", "Terracotta", "Cream"], sizes: ["XS", "S", "M", "L", "XL"], rating: 4.6, reviews: 78, soldCount: "654" },
  { id: 5, name: "Embroidered Kurta", price: 7499, originalPrice: null, image: "/images/product-5.jpg", images: ["/images/product-5.jpg"], category: "Tops", description: "A modern take on the traditional kurta with delicate hand-embroidery.", colors: ["Off-White", "Powder Blue", "Blush"], sizes: ["XS", "S", "M", "L", "XL"], rating: 4.9, reviews: 203, soldCount: "1.8k" },
  { id: 6, name: "Draped Saree Gown", price: 15999, originalPrice: null, image: "/images/product-6.jpg", images: ["/images/product-6.jpg"], category: "Dresses", description: "An innovative fusion piece combining saree elegance with gown ease.", colors: ["Champagne", "Rose Gold", "Deep Plum"], sizes: ["XS", "S", "M", "L", "XL"], rating: 5.0, reviews: 67, soldCount: "432" },
  { id: 7, name: "The Signature Dress", price: 11999, originalPrice: null, image: "/images/bestseller-1.jpg", images: ["/images/bestseller-1.jpg"], category: "Dresses", description: "Our bestselling signature dress in rich burgundy silk.", colors: ["Burgundy", "Emerald", "Black"], sizes: ["XS", "S", "M", "L", "XL"], rating: 4.9, reviews: 342, soldCount: "3.2k" },
  { id: 8, name: "Cloud Soft Cardigan", price: 7999, originalPrice: 9999, image: "/images/bestseller-2.jpg", images: ["/images/bestseller-2.jpg"], category: "Outerwear", description: "Premium cashmere-blend cardigan with cloud-like softness.", colors: ["Blush", "Oatmeal", "Grey"], sizes: ["XS", "S", "M", "L", "XL"], rating: 4.8, reviews: 189, soldCount: "1.2k" },
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = Number(params.id)
  const product = products.find(p => p.id === productId) || products[0]
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showSizeSheet, setShowSizeSheet] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    if (selectedSize) {
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    } else {
      setShowSizeSheet(true)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Desktop Product Page */}
      <div className="hidden md:block">
        <Header />
        <div className="pt-32 lg:pt-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-foreground">Shop</Link>
              <span>/</span>
              <Link href={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-foreground">{product.category}</Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Images */}
              <div className="space-y-4">
                <div className="relative aspect-[3/4] bg-secondary overflow-hidden">
                  <Image
                    src={product.images[currentImageIndex] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {product.originalPrice && (
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-4">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={cn(
                          "relative w-20 h-24 bg-secondary overflow-hidden border-2 transition-colors",
                          currentImageIndex === i ? "border-foreground" : "border-transparent"
                        )}
                      >
                        <Image src={img || "/placeholder.svg"} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs tracking-[0.3em] text-muted-foreground mb-2">{product.category.toUpperCase()}</p>
                  <h1 className="text-3xl lg:text-4xl font-light tracking-wide text-foreground mb-4">{product.name}</h1>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-muted-foreground">{product.soldCount} sold</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-semibold">Rs.{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through">
                        Rs.{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">{product.description}</p>

                {/* Color Selection */}
                <div>
                  <p className="text-sm font-medium mb-3">Color: <span className="text-muted-foreground font-normal">{selectedColor}</span></p>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "px-5 py-2.5 text-sm border transition-colors",
                          selectedColor === color
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground"
                        )}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium">Size: <span className="text-muted-foreground font-normal">{selectedSize || "Select size"}</span></p>
                    <button className="text-sm text-primary font-medium underline underline-offset-4">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-14 px-4 py-3 text-sm border transition-colors",
                          selectedSize === size
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <p className="text-sm font-medium mb-3">Quantity</p>
                  <div className="flex items-center gap-4 border border-border w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    variant="outline"
                    className={cn(
                      "flex-1 rounded-none h-14 bg-transparent",
                      addedToCart && "bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-background"
                    )}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Added to Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Add to Bag
                      </>
                    )}
                  </Button>
                  <Link href="/checkout" className="flex-1">
                    <Button
                      size="lg"
                      className="w-full rounded-none h-14"
                      onClick={() => {
                        if (!selectedSize) {
                          setShowSizeSheet(true)
                        }
                      }}
                    >
                      Buy Now
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-none h-14 w-14 bg-transparent"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={cn("h-5 w-5", isWishlisted && "fill-primary text-primary")} />
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 py-6 border-t border-border">
                  <div className="flex items-center gap-3">
                    <Truck className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Free Shipping</p>
                      <p className="text-xs text-muted-foreground">On orders over Rs.2,999</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Easy Returns</p>
                      <p className="text-xs text-muted-foreground">7 days return policy</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Secure Payment</p>
                      <p className="text-xs text-muted-foreground">100% secure checkout</p>
                    </div>
                  </div>
                </div>

                {/* Accordion */}
                <Accordion type="single" collapsible className="border-t border-border">
                  <AccordionItem value="details">
                    <AccordionTrigger>Product Details</AccordionTrigger>
                    <AccordionContent>
                      <ul className="text-muted-foreground space-y-2">
                        <li>Premium quality fabric</li>
                        <li>Crafted with attention to detail</li>
                        <li>Comfortable fit</li>
                        <li>Easy care - machine washable</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="sizing">
                    <AccordionTrigger>Size & Fit</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">Model is 5`9" and wears size S. This style fits true to size.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="shipping">
                    <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">Free shipping on orders above Rs.2,999. Easy returns within 7 days of delivery.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <section className="py-16">
                <h2 className="text-2xl font-light tracking-wide mb-8">You May Also Like</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((item) => (
                    <Link key={item.id} href={`/product/${item.id}`} className="group">
                      <div className="relative aspect-[3/4] bg-secondary overflow-hidden mb-4">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <h3 className="text-base font-medium hover:text-primary transition-colors">{item.name}</h3>
                      <span className="text-muted-foreground">Rs.{item.price.toLocaleString()}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
          <Footer />
        </div>
      </div>

      {/* Mobile Product Page */}
      <div className="md:hidden pb-32">
        {/* Custom header for product page */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md safe-area-top">
          <div className="flex items-center justify-between px-4 py-3">
            <button 
              onClick={() => router.back()}
              className="p-2 -ml-2 active:scale-95 transition-transform"
              aria-label="Go back"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 active:scale-95 transition-transform" aria-label="Share">
                <Share2 className="h-5 w-5" />
              </button>
              <Link href="/cart" className="p-2 relative active:scale-95 transition-transform" aria-label="Cart">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
              </Link>
            </div>
          </div>
        </header>
        
        {/* Product Images */}
        <section className="pt-14">
          <div className="relative aspect-[3/4] bg-secondary overflow-hidden">
            <Image src={product.images[currentImageIndex] || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
            
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      i === currentImageIndex ? "bg-foreground" : "bg-foreground/30"
                    )}
                  />
                ))}
              </div>
            )}
            
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-95 transition-transform"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("h-5 w-5", isWishlisted ? "fill-primary text-primary" : "text-foreground")} />
            </button>
            
            {product.originalPrice && (
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
        </section>

        {/* Product Info */}
        <section className="px-5 py-6 space-y-5">
          <div>
            <p className="text-xs tracking-widest text-muted-foreground mb-1">{product.category.toUpperCase()}</p>
            <h1 className="text-2xl font-medium text-foreground mb-3">{product.name}</h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold">Rs.{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-base text-muted-foreground line-through">Rs.{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <div className="flex items-center gap-1 bg-secondary px-3 py-1.5 rounded-full">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">{product.soldCount} sold</p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Color Selection */}
          <div>
            <p className="text-sm font-medium mb-3">Color: <span className="text-muted-foreground font-normal">{selectedColor}</span></p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "px-4 py-2.5 text-sm rounded-full border transition-colors active:scale-95",
                    selectedColor === color
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-secondary"
                  )}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium">Size: <span className="text-muted-foreground font-normal">{selectedSize || "Select size"}</span></p>
              <button className="text-sm text-primary font-medium">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "min-w-14 px-4 py-3 text-sm rounded-xl border transition-colors active:scale-95",
                    selectedSize === size
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-secondary"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="text-sm font-medium mb-3">Quantity</p>
            <div className="flex items-center gap-4 bg-secondary rounded-2xl p-1 w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-xl active:bg-card transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl active:bg-card transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="flex gap-4 py-4">
            <div className="flex-1 flex flex-col items-center gap-2 p-4 bg-secondary rounded-2xl">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-xs text-center">Free Shipping</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2 p-4 bg-secondary rounded-2xl">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span className="text-xs text-center">Easy Returns</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2 p-4 bg-secondary rounded-2xl">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-xs text-center">Secure Pay</span>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-6">
            <div className="px-5 mb-4">
              <h2 className="text-lg font-medium">You May Also Like</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide px-5 pb-2">
              {relatedProducts.map((item) => (
                <Link key={item.id} href={`/product/${item.id}`} className="flex-shrink-0 w-36">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary mb-2">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                  <span className="text-sm text-muted-foreground">Rs.{item.price.toLocaleString()}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Fixed bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/50 p-4 pb-8 safe-area-bottom z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className={cn(
                "flex-1 py-4 rounded-2xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all active:scale-[0.98]",
                addedToCart ? "bg-emerald-500 text-white" : "bg-foreground text-background"
              )}
            >
              {addedToCart ? (
                <>
                  <Check className="h-5 w-5" />
                  Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" />
                  Add to Bag
                </>
              )}
            </button>
            <Link
              href="/cart"
              className="px-6 py-4 rounded-2xl text-sm font-medium tracking-wide border border-foreground active:scale-[0.98] transition-transform"
            >
              Buy Now
            </Link>
          </div>
        </div>

        {/* Size selection bottom sheet */}
        {showSizeSheet && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setShowSizeSheet(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl p-5 pb-10 animate-in slide-in-from-bottom duration-300">
              <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Select Size</h3>
                <button onClick={() => setShowSizeSheet(false)} className="p-2 -mr-2">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2 mb-6">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size)
                      setShowSizeSheet(false)
                      setAddedToCart(true)
                      setTimeout(() => setAddedToCart(false), 2000)
                    }}
                    className={cn(
                      "py-4 text-sm rounded-xl border transition-colors active:scale-95",
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
