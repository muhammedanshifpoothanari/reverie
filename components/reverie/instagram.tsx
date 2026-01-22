"use client"

import Image from "next/image"
import { Instagram } from "lucide-react"

const instagramPosts = [
  { id: 1, image: "/images/insta-1.jpg", likes: "2.4k" },
  { id: 2, image: "/images/insta-2.jpg", likes: "1.8k" },
  { id: 3, image: "/images/insta-3.jpg", likes: "3.2k" },
  { id: 4, image: "/images/insta-4.jpg", likes: "2.1k" },
  { id: 5, image: "/images/insta-5.jpg", likes: "1.9k" },
  { id: 6, image: "/images/insta-6.jpg", likes: "2.7k" },
]

export function InstagramFeed() {
  return (
    <>
      {/* Desktop Instagram */}
      <section className="hidden md:block py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.5em] text-muted-foreground mb-3">FOLLOW US</p>
            <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-foreground mb-2">
              @reveriebyalia
            </h2>
            <p className="text-muted-foreground">
              Share your look with <span className="text-primary font-medium">#ReverieWoman</span>
            </p>
          </div>

          <div className="grid grid-cols-6 gap-4">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden bg-secondary group"
              >
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt="Instagram post"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="h-8 w-8 text-card" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Instagram */}
      <section className="md:hidden py-8 px-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 rounded-xl">
              <Instagram className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">
                @reveriebyalia
              </h2>
              <p className="text-xs text-muted-foreground">Follow us</p>
            </div>
          </div>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary font-medium"
          >
            View Profile
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {instagramPosts.slice(0, 4).map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-2xl overflow-hidden bg-secondary active:scale-[0.98] transition-transform"
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt="Instagram post"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 active:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Share your look with <span className="text-primary font-medium">#ReverieWoman</span>
        </p>
      </section>
    </>
  )
}
