"use client"

import { useState } from "react"
import { Search, Mail, Phone, MapPin, TrendingUp, Award } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

// Mock customers data
const customers = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43210",
    city: "Mumbai",
    orders: 12,
    spent: "SAR 45,299",
    joinDate: "Jan 15, 2024",
    status: "VIP",
  },
  {
    id: 2,
    name: "Aisha Khan",
    email: "aisha@example.com",
    phone: "+91 98765 43211",
    city: "Delhi",
    orders: 8,
    spent: "SAR 28,599",
    joinDate: "Feb 20, 2024",
    status: "Regular",
  },
  {
    id: 3,
    name: "Deepika Patel",
    email: "deepika@example.com",
    phone: "+91 98765 43212",
    city: "Bangalore",
    orders: 15,
    spent: "SAR 62,199",
    joinDate: "Dec 10, 2023",
    status: "VIP",
  },
  {
    id: 4,
    name: "Zara Lopez",
    email: "zara@example.com",
    phone: "+91 98765 43213",
    city: "Pune",
    orders: 5,
    spent: "SAR 18,899",
    joinDate: "May 08, 2024",
    status: "Regular",
  },
  {
    id: 5,
    name: "Emma Wilson",
    email: "emma@example.com",
    phone: "+91 98765 43214",
    city: "Hyderabad",
    orders: 20,
    spent: "SAR 89,799",
    joinDate: "Oct 02, 2023",
    status: "VIP",
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const searchParams = useSearchParams()

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalCustomers = customers.length
  const totalSpent = "SAR 2,44,795"
  const avgOrderValue = "SAR 12,240"
  const vipCustomers = customers.filter((c) => c.status === "VIP").length

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-medium text-foreground mb-2">Customers</h1>
          <p className="text-muted-foreground">Manage your customer base and loyalty</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Customers</p>
                <p className="text-2xl font-semibold text-foreground">{totalCustomers}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">VIP Members</p>
                <p className="text-2xl font-semibold text-foreground">{vipCustomers}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border/50">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Spent</p>
              <p className="text-2xl font-semibold text-foreground">{totalSpent}</p>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border/50">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Avg Order Value</p>
              <p className="text-2xl font-semibold text-foreground">{avgOrderValue}</p>
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-4 bg-card border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-secondary border-border/50"
            />
          </div>
        </Card>

        {/* Customers Table */}
        <Card className="bg-card border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Orders</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Total Spent</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Member Since</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-foreground">{customer.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-foreground">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-foreground">
                        <MapPin className="h-3 w-3" />
                        {customer.city}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{customer.orders}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">{customer.spent}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${customer.status === "VIP" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"
                        }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{customer.joinDate}</td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredCustomers.length} of {customers.length} customers
          </p>
          <div className="flex gap-2">
            <Button variant="outline">← Previous</Button>
            <Button variant="outline">Next →</Button>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
