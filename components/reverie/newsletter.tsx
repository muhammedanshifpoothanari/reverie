"use client"

import React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Gift, Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <>
      {/* Desktop Newsletter */}
      <section className="hidden md:block py-16 lg:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            {isSubscribed ? (
              <div className="py-8">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-light text-foreground mb-3">
                  Welcome to the Reverie Family!
                </h3>
                <p className="text-muted-foreground">
                  Check your inbox for your exclusive 10% discount code
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs tracking-[0.5em] text-muted-foreground mb-3">STAY CONNECTED</p>
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-foreground mb-4">
                  Join the Reverie Family
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                  Be the first to know about new arrivals, exclusive offers, and get 10% off your first order.
                </p>

                <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-14 rounded-none text-base"
                    required
                  />
                  <Button type="submit" size="lg" className="rounded-none px-8 h-14">
                    Subscribe
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground mt-4">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from Reverie.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Newsletter */}
      <section className="md:hidden py-8 px-5">
        <div className="bg-secondary rounded-3xl p-6">
          {isSubscribed ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">
                Welcome to Reverie!
              </h3>
              <p className="text-sm text-muted-foreground">
                Check your inbox for your 10% discount code
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    Get 10% Off
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Join our exclusive list
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                Be the first to know about new arrivals, exclusive offers, and private sales.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-card border-0 h-14 rounded-2xl text-base px-5"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-foreground text-background py-4 rounded-2xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                By subscribing, you agree to our Privacy Policy
              </p>
            </>
          )}
        </div>
      </section>
    </>
  )
}
