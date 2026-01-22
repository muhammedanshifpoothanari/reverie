"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/reverie/header"
import { Footer } from "@/components/reverie/footer"
import { BottomNav } from "@/components/reverie/bottom-nav"
import { ChevronLeft, Leaf, Heart, Sparkles, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const values = [
  { icon: Leaf, title: "Sustainable", description: "Eco-friendly materials & practices", fullDesc: "We are committed to sustainable fashion, using organic fabrics, eco-friendly dyes, and ethical manufacturing practices.", color: "bg-emerald-50 text-emerald-600" },
  { icon: Heart, title: "Craftsmanship", description: "Skilled artisan handwork", fullDesc: "Each piece is crafted with attention to detail by skilled artisans, preserving traditional techniques.", color: "bg-rose-50 text-rose-600" },
  { icon: Sparkles, title: "Timeless", description: "Designs beyond trends", fullDesc: "We create pieces that transcend seasonal trends, designed to be treasured for years to come.", color: "bg-amber-50 text-amber-600" },
  { icon: Users, title: "Empowerment", description: "Women-led partnerships", fullDesc: "Supporting women-led initiatives and artisan communities across India.", color: "bg-blue-50 text-blue-600" },
]

const timeline = [
  { year: "2022", title: "The Dream Begins", desc: "Reverie was founded with a vision to redefine Indian fashion." },
  { year: "2023", title: "First Collection", desc: "Launched our debut collection to overwhelming response." },
  { year: "2024", title: "Sustainable Commitment", desc: "100% transition to sustainable materials and practices." },
  { year: "2025", title: "Growing Together", desc: "Expanded to 25 cities across India." },
]

const stats = [
  { value: "200+", label: "Team Members" },
  { value: "50+", label: "Artisans" },
  { value: "25", label: "Cities" },
  { value: "10", label: "States" },
]

export default function AboutPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background">
      {/* Desktop About */}
      <div className="hidden md:block">
        <Header />
        <div className="pt-32 lg:pt-36">
          {/* Hero */}
          <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
            <Image src="/images/story-alia.jpg" alt="Reverie Story" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className="max-w-xl">
                  <p className="text-xs tracking-[0.5em] text-card mb-4">EST. 2022</p>
                  <h1 className="text-5xl lg:text-6xl font-light text-card mb-6 leading-tight">
                    Crafting Dreams Into
                    <br />
                    <span className="italic">Timeless Fashion</span>
                  </h1>
                </div>
              </div>
            </div>
          </section>

          {/* Founder Story */}
          <section className="py-20 bg-secondary">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <p className="text-xs tracking-[0.5em] text-muted-foreground mb-4">OUR STORY</p>
                  <h2 className="text-4xl font-light mb-8 leading-tight">
                    Born from a dream,
                    <br />
                    <span className="italic">crafted with love</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {`Reverie was born from a simple dream — to create fashion that speaks to the modern Indian woman's soul. A woman who embraces her roots while reaching for the stars.`}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    Every piece we create is infused with intention, designed to make you feel confident, beautiful, and unapologetically yourself.
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image src="/images/story-alia.jpg" alt="Alia Bhatt" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-xl italic font-light">Alia Bhatt</p>
                      <p className="text-sm text-muted-foreground tracking-wider">FOUNDER & CREATIVE DIRECTOR</p>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src="/images/story-alia.jpg" alt="Founder" fill className="object-cover" />
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <p className="text-xs tracking-[0.5em] text-muted-foreground mb-4">WHAT WE BELIEVE</p>
                <h2 className="text-4xl font-light">Our Values</h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value) => (
                  <div key={value.title} className="text-center">
                    <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <value.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.fullDesc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-4 gap-8 text-center">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-5xl font-light mb-2">{stat.value}</p>
                    <p className="text-sm opacity-80 tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <p className="text-xs tracking-[0.5em] text-muted-foreground mb-4">OUR JOURNEY</p>
                <h2 className="text-4xl font-light">Timeline</h2>
              </div>
              <div className="grid grid-cols-4 gap-8">
                {timeline.map((item, index) => (
                  <div key={item.year} className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                        {item.year.slice(-2)}
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="flex-1 h-px bg-border" />
                      )}
                    </div>
                    <p className="text-lg font-medium mb-2">{item.year}</p>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-secondary">
            <div className="max-w-2xl mx-auto text-center px-6">
              <h2 className="text-4xl font-light mb-6">Join the Reverie Family</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Discover fashion that celebrates who you are. Explore our latest collection.
              </p>
              <Button asChild size="lg" className="rounded-none">
                <Link href="/shop">
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </section>

          <Footer />
        </div>
      </div>

      {/* Mobile About */}
      <div className="md:hidden pb-24">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md safe-area-top">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform" aria-label="Go back">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-medium">Our Story</h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Hero */}
        <section className="pt-16">
          <div className="relative h-72 bg-secondary">
            <Image src="/images/story-alia.jpg" alt="Alia Bhatt - Founder" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-card">
              <p className="text-xs tracking-[0.3em] mb-2 opacity-80">EST. 2022</p>
              <h2 className="text-2xl font-light tracking-wide leading-tight">
                Crafting Dreams Into
                <br />
                <span className="italic">Timeless Fashion</span>
              </h2>
            </div>
          </div>
        </section>

        {/* Founder Letter */}
        <section className="px-5 py-8">
          <div className="bg-secondary rounded-3xl p-6">
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {`"Reverie was born from a simple dream — to create fashion that speaks to the modern Indian woman's soul. A woman who embraces her roots while reaching for the stars."`}
            </p>
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image src="/images/story-alia.jpg" alt="Alia Bhatt" fill className="object-cover" />
              </div>
              <div>
                <p className="font-medium italic">Alia Bhatt</p>
                <p className="text-xs text-muted-foreground">Founder & Creative Director</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-5 py-6">
          <h3 className="text-lg font-medium mb-4">Our Values</h3>
          <div className="grid grid-cols-2 gap-3">
            {values.map((value) => (
              <div key={value.title} className="bg-secondary rounded-2xl p-4">
                <div className={`w-10 h-10 ${value.color} rounded-xl flex items-center justify-center mb-3`}>
                  <value.icon className="h-5 w-5" />
                </div>
                <h4 className="font-medium text-sm mb-1">{value.title}</h4>
                <p className="text-xs text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="px-5 py-6">
          <div className="bg-primary rounded-3xl p-6 text-primary-foreground">
            <div className="grid grid-cols-4 gap-2 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-[10px] opacity-80 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="px-5 py-6">
          <h3 className="text-lg font-medium mb-4">Our Journey</h3>
          <div className="space-y-4">
            {timeline.map((item) => (
              <div key={item.year} className="flex gap-4 items-start bg-secondary rounded-2xl p-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium flex-shrink-0">
                  {item.year.slice(-2)}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 py-8">
          <Link href="/shop" className="flex items-center justify-between bg-foreground text-background rounded-2xl p-5 active:scale-[0.98] transition-transform">
            <div>
              <h3 className="font-medium mb-1">Explore Collection</h3>
              <p className="text-sm opacity-80">Find your perfect piece</p>
            </div>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </section>

        <BottomNav />
      </div>
    </main>
  )
}
