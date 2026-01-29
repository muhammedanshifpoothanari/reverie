"use client"

import { Truck, RefreshCw, Shield, CreditCard, Headphones } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above SAR 2,999",
    mobileDesc: "Above SAR 2,999",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "7 days hassle-free returns",
    mobileDesc: "7 days",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout",
    mobileDesc: "100% safe",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: CreditCard,
    title: "COD Available",
    description: "Pay on delivery",
    mobileDesc: "Available",
    color: "bg-rose-50 text-rose-600",
  },
]

export function Features() {
  return (
    <>
      {/* Desktop Features */}
      <section className="hidden md:block py-8 border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${feature.color}`}>
                  <feature.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Features */}
      <section className="md:hidden py-6 px-5">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex-shrink-0 flex items-center gap-3 bg-secondary rounded-2xl px-4 py-3"
            >
              <div className={`p-2.5 rounded-xl ${feature.color}`}>
                <feature.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground">{feature.mobileDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
