"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/reverie/header"
import { Footer } from "@/components/reverie/footer"
import { BottomNav } from "@/components/reverie/bottom-nav"
import { Mail, Phone, MapPin, Clock, ChevronLeft, ChevronDown, Truck, RotateCcw, Send, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@reverie.in" },
  { icon: Phone, label: "Phone", value: "+91 1800 123 4567" },
  { icon: MapPin, label: "Address", value: "Bandra West, Mumbai" },
  { icon: Clock, label: "Hours", value: "Mon-Sat: 10AM - 7PM" },
]

const faqs = [
  { question: "How do I track my order?", answer: "Once your order is shipped, you'll receive an email with a tracking link. You can also track it from your account." },
  { question: "What is your return policy?", answer: "We offer easy returns within 7 days of delivery. Items must be unworn, unwashed, and with all tags attached." },
  { question: "How long does shipping take?", answer: "Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee." },
  { question: "Do you ship internationally?", answer: "Currently we ship within India only. International shipping is coming soon!" },
  { question: "How do I know my size?", answer: "Check our size guide on each product page. If you're between sizes, we recommend sizing up." },
]

const sizeGuide = [
  { size: "XS", bust: "32\"", waist: "24\"", hips: "34\"" },
  { size: "S", bust: "34\"", waist: "26\"", hips: "36\"" },
  { size: "M", bust: "36\"", waist: "28\"", hips: "38\"" },
  { size: "L", bust: "38\"", waist: "30\"", hips: "40\"" },
  { size: "XL", bust: "40\"", waist: "32\"", hips: "42\"" },
]

export default function ContactPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<string>("contact")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Desktop Contact */}
      <div className="hidden md:block">
        <Header />
        <div className="pt-32 lg:pt-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <a href="/" className="hover:text-foreground">Home</a>
              <span>/</span>
              <span className="text-foreground">Contact</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-16">
              {/* Contact Info */}
              <div>
                <h1 className="text-4xl font-light tracking-wide mb-6">Get in Touch</h1>
                <p className="text-muted-foreground mb-8">
                  Have a question or feedback? We'd love to hear from you. Our team is here to help.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2 bg-secondary p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-light mb-3">Thank You!</h3>
                    <p className="text-muted-foreground mb-6">We've received your message and will get back to you within 24 hours.</p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-none">Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-light mb-6">Send us a Message</h2>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Name</label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="rounded-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="rounded-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Subject</label>
                      <Input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="rounded-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Message</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="rounded-none min-h-[150px]"
                        required
                      />
                    </div>
                    <Button type="submit" className="rounded-none" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Shipping & Size Guide */}
            <div className="grid lg:grid-cols-2 gap-12 py-20">
              {/* Shipping */}
              <div id="shipping">
                <h2 className="text-2xl font-light mb-6">Shipping & Returns</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Truck className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Free Shipping</h3>
                      <p className="text-muted-foreground text-sm">Free standard shipping on orders above SAR 2,999. Standard delivery in 3-5 business days.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <RotateCcw className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Easy Returns</h3>
                      <p className="text-muted-foreground text-sm">7-day hassle-free returns. Items must be unworn, unwashed, and with tags attached.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Size Guide */}
              <div id="size-guide">
                <h2 className="text-2xl font-light mb-6">Size Guide</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-3 text-left font-medium">Size</th>
                        <th className="py-3 text-left font-medium">Bust</th>
                        <th className="py-3 text-left font-medium">Waist</th>
                        <th className="py-3 text-left font-medium">Hips</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuide.map((row) => (
                        <tr key={row.size} className="border-b border-border">
                          <td className="py-3 font-medium">{row.size}</td>
                          <td className="py-3 text-muted-foreground">{row.bust}</td>
                          <td className="py-3 text-muted-foreground">{row.waist}</td>
                          <td className="py-3 text-muted-foreground">{row.hips}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div id="faqs" className="py-16 border-t border-border">
              <h2 className="text-3xl font-light text-center mb-12">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible>
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* Mobile Contact */}
      <div className="md:hidden pb-24">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md safe-area-top">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => router.back()} className="p-2 -ml-2 active:scale-95 transition-transform" aria-label="Go back">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-medium">Help & Contact</h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Section tabs */}
        <div className="pt-16">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 py-4">
            {[
              { id: "contact", label: "Contact" },
              { id: "shipping", label: "Shipping" },
              { id: "size", label: "Size Guide" },
              { id: "faqs", label: "FAQs" },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-colors active:scale-95",
                  activeSection === section.id ? "bg-foreground text-background" : "bg-secondary text-foreground"
                )}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        {activeSection === "contact" && (
          <section className="px-5 py-4">
            <div className="grid grid-cols-2 gap-3 mb-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="bg-secondary rounded-2xl p-4">
                  <item.icon className="h-5 w-5 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            {isSubmitted ? (
              <div className="bg-secondary rounded-3xl p-6 text-center">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Thank You!</h3>
                <p className="text-sm text-muted-foreground mb-4">We'll get back to you within 24 hours.</p>
                <button onClick={() => setIsSubmitted(false)} className="text-sm text-primary font-medium">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-secondary rounded-3xl p-5 space-y-4">
                <h3 className="text-lg font-medium mb-2">Send a Message</h3>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-card rounded-xl text-sm border-0"
                  required
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-card rounded-xl text-sm border-0"
                  required
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-card rounded-xl text-sm border-0"
                  required
                />
                <textarea
                  placeholder="Your message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-card rounded-xl text-sm border-0 min-h-[120px] resize-none"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-foreground text-background py-4 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </section>
        )}

        {/* Shipping Section */}
        {activeSection === "shipping" && (
          <section className="px-5 py-4 space-y-4">
            <div className="bg-secondary rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Truck className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="font-medium">Free Shipping</h3>
              </div>
              <p className="text-sm text-muted-foreground">Free standard shipping on orders above SAR 2,999. Delivery in 3-5 business days.</p>
            </div>
            <div className="bg-secondary rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <RotateCcw className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-medium">Easy Returns</h3>
              </div>
              <p className="text-sm text-muted-foreground">7-day hassle-free returns. Items must be unworn with tags attached.</p>
            </div>
          </section>
        )}

        {/* Size Guide Section */}
        {activeSection === "size" && (
          <section className="px-5 py-4">
            <div className="bg-secondary rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 text-left font-medium">Size</th>
                    <th className="py-3 px-4 text-left font-medium">Bust</th>
                    <th className="py-3 px-4 text-left font-medium">Waist</th>
                    <th className="py-3 px-4 text-left font-medium">Hips</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeGuide.map((row) => (
                    <tr key={row.size} className="border-b border-border last:border-0">
                      <td className="py-3 px-4 font-medium">{row.size}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.bust}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.waist}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* FAQs Section */}
        {activeSection === "faqs" && (
          <section className="px-5 py-4 space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-secondary rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-sm font-medium pr-4">{faq.question}</span>
                  <ChevronDown className={cn("h-5 w-5 flex-shrink-0 transition-transform", openFaq === index && "rotate-180")} />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        <BottomNav />
      </div>
    </main>
  )
}
