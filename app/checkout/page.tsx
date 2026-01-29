"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/reverie/header"
import { Footer } from "@/components/reverie/footer"
import {
  ChevronLeft, ChevronRight, Check, CreditCard, Truck, MapPin,
  Lock, Shield, Package, ChevronDown, ChevronUp, Edit2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const cartItems = [
  { id: 1, name: "Silk Midi Dress", color: "Dusty Rose", size: "M", price: 8999, quantity: 1, image: "/images/product-1.jpg" },
  { id: 2, name: "Cashmere Wrap Blouse", color: "Cream", size: "S", price: 6499, quantity: 2, image: "/images/product-2.jpg" }
]

const savedAddresses = [
  { id: 1, name: "Priya Sharma", phone: "+91 98765 43210", address: "42, Rose Garden Apartments, Bandra West", city: "Mumbai", state: "Maharashtra", pincode: "400050", isDefault: true },
  { id: 2, name: "Priya Sharma", phone: "+91 98765 43210", address: "15, Tech Park, Whitefield", city: "Bangalore", state: "Karnataka", pincode: "560066", isDefault: false },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0].id)
  const [showNewAddress, setShowNewAddress] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [newAddress, setNewAddress] = useState({
    name: "", phone: "", address: "", city: "", state: "", pincode: ""
  })

  const [cardDetails, setCardDetails] = useState({
    number: "", name: "", expiry: "", cvv: ""
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 2999 ? 0 : 99
  const discount = Math.round(subtotal * 0.1)
  const total = subtotal + shipping - discount

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    await new Promise(r => setTimeout(r, 2000))
    setIsProcessing(false)
    setOrderPlaced(true)
  }

  // Order Success Screen
  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-background">
        {/* Desktop Success */}
        <div className="hidden md:flex flex-col items-center justify-center min-h-screen bg-secondary px-6">
          <div className="bg-card p-12 text-center max-w-lg">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-light mb-3">Order Confirmed</h1>
            <p className="text-muted-foreground mb-2">Thank you for shopping with Reverie</p>
            <p className="text-sm text-muted-foreground mb-8">Order #REV-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>

            <div className="bg-secondary p-6 mb-8 text-left">
              <p className="text-sm font-medium mb-2">Delivery Address</p>
              <p className="text-sm text-muted-foreground">
                {savedAddresses.find(a => a.id === selectedAddress)?.address}, {savedAddresses.find(a => a.id === selectedAddress)?.city}
              </p>
              <p className="text-sm font-medium mt-4 mb-2">Estimated Delivery</p>
              <p className="text-sm text-muted-foreground">3-5 Business Days</p>
            </div>

            <div className="flex gap-4">
              <Button asChild variant="outline" className="flex-1 rounded-none bg-transparent">
                <Link href="/account">Track Order</Link>
              </Button>
              <Button asChild className="flex-1 rounded-none">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Success */}
        <div className="md:hidden flex flex-col items-center justify-center min-h-screen px-6 pb-24">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
            <Check className="h-12 w-12 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-medium mb-2 text-center">Order Confirmed</h1>
          <p className="text-muted-foreground text-center mb-1">Thank you for your order</p>
          <p className="text-sm text-muted-foreground mb-8">Order #REV-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>

          <div className="w-full bg-secondary rounded-2xl p-5 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Delivering to</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {savedAddresses.find(a => a.id === selectedAddress)?.address}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Estimated Delivery</p>
                <p className="text-xs text-muted-foreground mt-1">3-5 Business Days</p>
              </div>
            </div>
          </div>

          <div className="w-full space-y-3">
            <Link href="/account" className="w-full bg-secondary text-foreground py-4 rounded-2xl text-sm font-medium flex items-center justify-center active:scale-[0.98] transition-transform">
              Track Order
            </Link>
            <Link href="/shop" className="w-full bg-foreground text-background py-4 rounded-2xl text-sm font-medium flex items-center justify-center active:scale-[0.98] transition-transform">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Desktop Checkout */}
      <div className="hidden md:block">
        <Header />
        <div className="pt-32 lg:pt-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link href="/cart" className="hover:text-foreground">Cart</Link>
              <span>/</span>
              <span className="text-foreground">Checkout</span>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {["Shipping", "Payment", "Review"].map((label, i) => (
                <div key={label} className="flex items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    step > i + 1 ? "bg-primary text-primary-foreground" :
                      step === i + 1 ? "bg-foreground text-background" :
                        "bg-secondary text-muted-foreground"
                  )}>
                    {step > i + 1 ? <Check className="h-5 w-5" /> : i + 1}
                  </div>
                  <span className={cn(
                    "ml-3 text-sm font-medium",
                    step >= i + 1 ? "text-foreground" : "text-muted-foreground"
                  )}>{label}</span>
                  {i < 2 && <div className={cn(
                    "w-20 h-px mx-4",
                    step > i + 1 ? "bg-primary" : "bg-border"
                  )} />}
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Step 1: Shipping */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-light mb-6">Shipping Address</h2>

                    <div className="space-y-4 mb-6">
                      {savedAddresses.map((addr) => (
                        <label
                          key={addr.id}
                          className={cn(
                            "flex items-start gap-4 p-5 border cursor-pointer transition-colors",
                            selectedAddress === addr.id ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground"
                          )}
                        >
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddress === addr.id}
                            onChange={() => setSelectedAddress(addr.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{addr.name}</span>
                              {addr.isDefault && (
                                <span className="text-xs bg-secondary px-2 py-0.5">Default</span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{addr.phone}</p>
                            <p className="text-sm text-muted-foreground">{addr.address}</p>
                            <p className="text-sm text-muted-foreground">{addr.city}, {addr.state} - {addr.pincode}</p>
                          </div>
                        </label>
                      ))}
                    </div>

                    <button
                      onClick={() => setShowNewAddress(!showNewAddress)}
                      className="text-sm text-primary font-medium hover:underline"
                    >
                      + Add New Address
                    </button>

                    {showNewAddress && (
                      <div className="grid grid-cols-2 gap-4 mt-6 p-6 bg-secondary">
                        <div className="col-span-2">
                          <Label className="text-sm mb-2 block">Full Name</Label>
                          <Input value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} className="rounded-none" />
                        </div>
                        <div className="col-span-2">
                          <Label className="text-sm mb-2 block">Phone</Label>
                          <Input value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} className="rounded-none" />
                        </div>
                        <div className="col-span-2">
                          <Label className="text-sm mb-2 block">Address</Label>
                          <Input value={newAddress.address} onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} className="rounded-none" />
                        </div>
                        <div>
                          <Label className="text-sm mb-2 block">City</Label>
                          <Input value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} className="rounded-none" />
                        </div>
                        <div>
                          <Label className="text-sm mb-2 block">State</Label>
                          <Input value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} className="rounded-none" />
                        </div>
                        <div>
                          <Label className="text-sm mb-2 block">Pincode</Label>
                          <Input value={newAddress.pincode} onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} className="rounded-none" />
                        </div>
                      </div>
                    )}

                    <Button onClick={() => setStep(2)} className="w-full rounded-none h-14 mt-8">
                      Continue to Payment
                    </Button>
                  </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-light mb-6">Payment Method</h2>

                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <label className={cn(
                        "flex items-center gap-4 p-5 border cursor-pointer transition-colors",
                        paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"
                      )}>
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-5 w-5" />
                        <span className="font-medium">Credit/Debit Card</span>
                      </label>

                      <label className={cn(
                        "flex items-center gap-4 p-5 border cursor-pointer transition-colors",
                        paymentMethod === "upi" ? "border-primary bg-primary/5" : "border-border"
                      )}>
                        <RadioGroupItem value="upi" id="upi" />
                        <div className="w-5 h-5 bg-secondary rounded flex items-center justify-center text-xs font-bold">U</div>
                        <span className="font-medium">UPI</span>
                      </label>

                      <label className={cn(
                        "flex items-center gap-4 p-5 border cursor-pointer transition-colors",
                        paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border"
                      )}>
                        <RadioGroupItem value="cod" id="cod" />
                        <Package className="h-5 w-5" />
                        <span className="font-medium">Cash on Delivery</span>
                      </label>
                    </RadioGroup>

                    {paymentMethod === "card" && (
                      <div className="mt-6 p-6 bg-secondary space-y-4">
                        <div>
                          <Label className="text-sm mb-2 block">Card Number</Label>
                          <Input
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                            placeholder="1234 5678 9012 3456"
                            className="rounded-none"
                          />
                        </div>
                        <div>
                          <Label className="text-sm mb-2 block">Cardholder Name</Label>
                          <Input
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                            className="rounded-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm mb-2 block">Expiry Date</Label>
                            <Input
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                              placeholder="MM/YY"
                              className="rounded-none"
                            />
                          </div>
                          <div>
                            <Label className="text-sm mb-2 block">CVV</Label>
                            <Input
                              type="password"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                              placeholder="***"
                              className="rounded-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4 mt-8">
                      <Button onClick={() => setStep(1)} variant="outline" className="flex-1 rounded-none h-14 bg-transparent">
                        Back
                      </Button>
                      <Button onClick={() => setStep(3)} className="flex-1 rounded-none h-14">
                        Review Order
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-light mb-6">Review Order</h2>

                    {/* Shipping Address Summary */}
                    <div className="border border-border p-5 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Shipping Address</span>
                        <button onClick={() => setStep(1)} className="text-sm text-primary">Edit</button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {savedAddresses.find(a => a.id === selectedAddress)?.name}, {savedAddresses.find(a => a.id === selectedAddress)?.address}, {savedAddresses.find(a => a.id === selectedAddress)?.city}
                      </p>
                    </div>

                    {/* Payment Summary */}
                    <div className="border border-border p-5 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Payment Method</span>
                        <button onClick={() => setStep(2)} className="text-sm text-primary">Edit</button>
                      </div>
                      <p className="text-sm text-muted-foreground capitalize">{paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "upi" ? "UPI" : "Credit/Debit Card"}</p>
                    </div>

                    {/* Order Items */}
                    <h3 className="font-medium mb-4">Order Items ({cartItems.length})</h3>
                    <div className="space-y-4 mb-8">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative w-20 h-24 bg-secondary">
                            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.color} / {item.size}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <span className="font-medium">SAR {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button onClick={() => setStep(2)} variant="outline" className="flex-1 rounded-none h-14 bg-transparent">
                        Back
                      </Button>
                      <Button onClick={handlePlaceOrder} disabled={isProcessing} className="flex-1 rounded-none h-14">
                        {isProcessing ? "Processing..." : "Place Order"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-secondary p-6 sticky top-40">
                  <h2 className="text-lg font-medium mb-6">Order Summary</h2>

                  {/* Cart Items Preview */}
                  <div className="space-y-4 pb-4 border-b border-border mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-16 h-20 bg-card">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.color} / {item.size}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium">SAR {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pb-4 border-b border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>SAR {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shipping === 0 ? "text-emerald-600" : ""}>{shipping === 0 ? "FREE" : `SAR ${shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Discount (10%)</span>
                      <span className="text-emerald-600">-SAR {discount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg font-semibold py-4">
                    <span>Total</span>
                    <span>SAR {total.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                    <Lock className="h-4 w-4" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* Mobile Checkout */}
      <div className="md:hidden pb-32">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md safe-area-top">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => step > 1 ? setStep(step - 1) : router.back()}
              className="p-2 -ml-2 active:scale-95 transition-transform"
              aria-label="Go back"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-medium">
              {step === 1 ? "Shipping" : step === 2 ? "Payment" : "Review"}
            </h1>
            <div className="w-10" />
          </div>

          {/* Progress Bar */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className={cn(
                  "flex-1 h-1 rounded-full transition-colors",
                  step >= s ? "bg-primary" : "bg-secondary"
                )} />
              ))}
            </div>
          </div>
        </header>

        {/* Order Summary Toggle */}
        <section className="pt-24 px-5">
          <button
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className="w-full flex items-center justify-between bg-secondary rounded-2xl p-4 mb-4"
          >
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Order Summary ({cartItems.length} items)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">SAR {total.toLocaleString()}</span>
              {showOrderSummary ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </button>

          {showOrderSummary && (
            <div className="bg-secondary rounded-2xl p-4 mb-4 space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-14 h-18 rounded-xl overflow-hidden bg-card">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.color} / {item.size} x {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium">SAR {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>SAR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-emerald-600" : ""}>{shipping === 0 ? "FREE" : `SAR ${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-emerald-600">-SAR {discount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Step 1: Shipping */}
        {step === 1 && (
          <section className="px-5">
            <h2 className="text-lg font-medium mb-4">Select Delivery Address</h2>

            <div className="space-y-3">
              {savedAddresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => setSelectedAddress(addr.id)}
                  className={cn(
                    "w-full p-4 rounded-2xl text-left transition-colors",
                    selectedAddress === addr.id ? "bg-primary/10 border-2 border-primary" : "bg-secondary"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{addr.name}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{addr.phone}</p>
                  <p className="text-xs text-muted-foreground mt-1">{addr.address}, {addr.city}</p>
                  <p className="text-xs text-muted-foreground">{addr.state} - {addr.pincode}</p>
                </button>
              ))}

              <button
                onClick={() => setShowNewAddress(true)}
                className="w-full p-4 rounded-2xl bg-secondary text-sm font-medium text-primary text-center"
              >
                + Add New Address
              </button>
            </div>
          </section>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <section className="px-5">
            <h2 className="text-lg font-medium mb-4">Payment Method</h2>

            <div className="space-y-3">
              {[
                { value: "card", label: "Credit/Debit Card", icon: CreditCard },
                { value: "upi", label: "UPI", icon: null },
                { value: "cod", label: "Cash on Delivery", icon: Package },
              ].map((method) => (
                <button
                  key={method.value}
                  onClick={() => setPaymentMethod(method.value)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-2xl transition-colors",
                    paymentMethod === method.value ? "bg-primary/10 border-2 border-primary" : "bg-secondary"
                  )}
                >
                  {method.icon ? (
                    <method.icon className="h-5 w-5" />
                  ) : (
                    <div className="w-5 h-5 bg-card rounded flex items-center justify-center text-xs font-bold">U</div>
                  )}
                  <span className="font-medium text-sm">{method.label}</span>
                  {paymentMethod === method.value && (
                    <Check className="h-5 w-5 text-primary ml-auto" />
                  )}
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  className="w-full px-4 py-4 bg-secondary rounded-2xl text-sm"
                />
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  className="w-full px-4 py-4 bg-secondary rounded-2xl text-sm"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    className="w-full px-4 py-4 bg-secondary rounded-2xl text-sm"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    className="w-full px-4 py-4 bg-secondary rounded-2xl text-sm"
                  />
                </div>
              </div>
            )}
          </section>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <section className="px-5 space-y-4">
            {/* Address Card */}
            <div className="bg-secondary rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Delivery Address</span>
                <button onClick={() => setStep(1)} className="text-xs text-primary">Change</button>
              </div>
              <p className="text-xs text-muted-foreground">
                {savedAddresses.find(a => a.id === selectedAddress)?.name}, {savedAddresses.find(a => a.id === selectedAddress)?.phone}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {savedAddresses.find(a => a.id === selectedAddress)?.address}, {savedAddresses.find(a => a.id === selectedAddress)?.city}
              </p>
            </div>

            {/* Payment Card */}
            <div className="bg-secondary rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Payment Method</span>
                <button onClick={() => setStep(2)} className="text-xs text-primary">Change</button>
              </div>
              <p className="text-xs text-muted-foreground capitalize">
                {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "upi" ? "UPI" : "Credit/Debit Card"}
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-secondary rounded-2xl p-3">
                <Lock className="h-4 w-4 text-primary" />
                <span className="text-[10px]">Secure</span>
              </div>
              <div className="flex-1 flex items-center gap-2 bg-secondary rounded-2xl p-3">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-[10px]">Protected</span>
              </div>
              <div className="flex-1 flex items-center gap-2 bg-secondary rounded-2xl p-3">
                <Truck className="h-4 w-4 text-primary" />
                <span className="text-[10px]">Fast</span>
              </div>
            </div>
          </section>
        )}

        {/* Fixed Bottom Action */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/50 p-5 pb-8 safe-area-bottom z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-xl font-semibold">SAR {total.toLocaleString()}</span>
          </div>
          <button
            onClick={() => {
              if (step < 3) setStep(step + 1)
              else handlePlaceOrder()
            }}
            disabled={isProcessing}
            className="w-full bg-foreground text-background py-4 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : step === 3 ? "Place Order" : "Continue"}
            {!isProcessing && <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </main>
  )
}
