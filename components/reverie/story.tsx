"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Story() {
  return (
    <>
      {/* Desktop Story */}
      <section className="hidden md:block py-16 lg:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/story-alia.jpg"
                alt="Alia Bhatt - Founder of Reverie"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="text-primary-foreground">
              <p className="text-xs tracking-[0.5em] mb-4 opacity-80">OUR STORY</p>
              <h2 className="text-4xl lg:text-5xl font-light mb-6 leading-tight">
                Born from dreams,
                <br />
                <span className="italic">crafted with love</span>
              </h2>
              
              <p className="text-lg opacity-90 leading-relaxed mb-6 max-w-lg">
                {`Reverie was born from a simple dream — to create fashion that speaks to the modern Indian woman's soul. Every piece is designed with intention, crafted with care, and made to inspire confidence.`}
              </p>

              <blockquote className="border-l-2 border-primary-foreground/30 pl-6 mb-8">
                <p className="text-xl italic font-light leading-relaxed opacity-90 mb-4">
                  {`"Fashion should be a celebration of who you are. At Reverie, we create pieces that make you feel like the best version of yourself."`}
                </p>
                <footer className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="/images/story-alia.jpg"
                      alt="Alia Bhatt"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <cite className="text-lg not-italic font-medium">Alia Bhatt</cite>
                    <p className="text-xs tracking-wider opacity-70">FOUNDER & CREATIVE DIRECTOR</p>
                  </div>
                </footer>
              </blockquote>
              
              <Button asChild variant="outline" size="lg" className="rounded-none border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent">
                <Link href="/about">
                  Read Our Full Story
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Story - Premium Alia section */}
      <section className="md:hidden py-6 px-4">
        <div className="relative rounded-3xl overflow-hidden bg-primary">
          <div className="p-5 text-primary-foreground">
            <p className="text-[10px] tracking-[0.3em] mb-2 opacity-70">OUR STORY</p>
            <h2 className="text-xl font-light tracking-wide mb-3 leading-tight">
              Born from dreams,
              <br />
              <span className="italic">crafted with love</span>
            </h2>
            
            <p className="text-sm opacity-80 leading-relaxed mb-5">
              Reverie was born from a simple dream — to create fashion that speaks to the modern Indian woman.
            </p>
            
            <div className="flex items-center gap-3 bg-card/10 backdrop-blur rounded-xl p-3 mb-5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/story-alia.jpg"
                  alt="Alia Bhatt"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Alia Bhatt</p>
                <p className="text-[10px] tracking-wider opacity-60">FOUNDER & CREATIVE DIRECTOR</p>
              </div>
            </div>
            
            <Link 
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium tracking-wide active:opacity-80 transition-opacity"
            >
              Read Full Story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
