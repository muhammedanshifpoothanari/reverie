"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter, ChevronRight, Youtube, Linkedin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const footerLinks = {
  shop: [
    { name: "New Arrivals", href: "/shop?category=new" },
    { name: "Dresses", href: "/shop?category=dresses" },
    { name: "Tops", href: "/shop?category=tops" },
    { name: "Bottoms", href: "/shop?category=bottoms" },
    { name: "Outerwear", href: "/shop?category=outerwear" },
    { name: "All Products", href: "/shop" },
  ],
  about: [
    { name: "Our Story", href: "/about" },
    { name: "Sustainability", href: "/about#sustainability" },
    { name: "Careers", href: "/about#careers" },
    { name: "Press", href: "/about#press" },
  ],
  help: [
    { name: "Contact Us", href: "/contact" },
    { name: "Shipping & Returns", href: "/contact#shipping" },
    { name: "Size Guide", href: "/contact#size-guide" },
    { name: "FAQs", href: "/contact#faqs" },
    { name: "Track Order", href: "/account" },
  ],
}

const quickLinks = [
  { name: "Shop All", href: "/shop" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Size Guide", href: "/contact#size-guide" },
  { name: "FAQs", href: "/contact#faqs" },
]

export function Footer() {
  return (
    <>
      {/* Desktop Footer */}
      <footer className="hidden md:block bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <h2 className="text-3xl font-light tracking-[0.3em]">rêverie</h2>

              </Link>
              <p className="text-sm opacity-80 leading-relaxed mb-6 max-w-sm">
                Timeless elegance meets modern grace. Discover fashion that speaks to your soul.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-background/30 rounded-full flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-background/30 rounded-full flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-background/30 rounded-full flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-background/30 rounded-full flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="text-sm font-medium tracking-wider mb-6">SHOP</h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Links */}
            <div>
              <h3 className="text-sm font-medium tracking-wider mb-6">ABOUT</h3>
              <ul className="space-y-3">
                {footerLinks.about.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h3 className="text-sm font-medium tracking-wider mb-6">HELP</h3>
              <ul className="space-y-3">
                {footerLinks.help.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-background/20 pt-8 flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-60">
              © 2026 Reverie. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm opacity-60">
              <Link href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
              <Link href="#" className="hover:opacity-100 transition-opacity">Terms of Service</Link>
              <Link href="#" className="hover:opacity-100 transition-opacity">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Footer */}
      <footer className="md:hidden bg-foreground text-background pt-8 pb-32">
        <div className="px-5">
          {/* Brand */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-light tracking-[0.25em] mb-1">rêverie</h2>

          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4 mb-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-background/30 rounded-full flex items-center justify-center active:bg-background active:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-background/30 rounded-full flex items-center justify-center active:bg-background active:text-foreground transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-background/30 rounded-full flex items-center justify-center active:bg-background active:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>

          {/* Quick links */}
          <div className="space-y-1 mb-8">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center justify-between py-4 border-b border-background/10 active:opacity-70 transition-opacity"
              >
                <span className="text-sm">{link.name}</span>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div className="flex flex-wrap justify-center gap-4 text-xs opacity-50 mb-6">
            <Link href="#" className="active:opacity-70">Privacy Policy</Link>
            <Link href="#" className="active:opacity-70">Terms of Service</Link>
            <Link href="#" className="active:opacity-70">Cookie Policy</Link>
          </div>

          {/* Copyright */}
          <p className="text-center text-xs opacity-40">
            © 2026 Reverie. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
