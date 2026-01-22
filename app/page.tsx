import { Header } from "@/components/reverie/header"
import { BottomNav } from "@/components/reverie/bottom-nav"
import { Hero } from "@/components/reverie/hero"
import { Categories } from "@/components/reverie/categories"
import { FeaturedProducts } from "@/components/reverie/featured-products"
import { Story } from "@/components/reverie/story"
import { Bestsellers } from "@/components/reverie/bestsellers"
import { Features } from "@/components/reverie/features"
import { Newsletter } from "@/components/reverie/newsletter"
import { InstagramFeed } from "@/components/reverie/instagram"
import { Footer } from "@/components/reverie/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background pb-24 md:pb-0">
      <Header />
      <Hero />
      <Features />
      <Categories />
      <FeaturedProducts />
      <Story />
      <Bestsellers />
      <Newsletter />
      <InstagramFeed />
      <Footer />
      <BottomNav />
    </main>
  )
}
