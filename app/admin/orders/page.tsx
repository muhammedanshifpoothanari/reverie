"use client"

import { useState } from "react"
import { Search, Filter, Download, Eye, MoreHorizontal } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Loading from "./loading"

// Mock orders data
const orders = [
  {
    id: "#ORD001",
    customer: "Priya Sharma",
    email: "priya@example.com",
    total: "SAR 4,299",
    items: 2,
    status: "Delivered",
    date: "Dec 20, 2024",
  },
  {
    id: "#ORD002",
    customer: "Aisha Khan",
    email: "aisha@example.com",
    total: "SAR 2,899",
    items: 1,
    status: "Processing",
    date: "Dec 22, 2024",
  },
  {
    id: "#ORD003",
    customer: "Deepika Patel",
    email: "deepika@example.com",
    total: "SAR 6,499",
    items: 3,
    status: "Shipped",
    date: "Dec 23, 2024",
  },
  {
    id: "#ORD004",
    customer: "Zara Lopez",
    email: "zara@example.com",
    total: "SAR 3,299",
    items: 1,
    status: "Pending",
    date: "Dec 24, 2024",
  },
  {
    id: "#ORD005",
    customer: "Emma Wilson",
    email: "emma@example.com",
    total: "SAR 5,199",
    items: 4,
    status: "Delivered",
    date: "Dec 25, 2024",
  },
  {
    id: "#ORD006",
    customer: "Sophia Brown",
    email: "sophia@example.com",
    total: "SAR 7,899",
    items: 5,
    status: "Cancelled",
    date: "Dec 26, 2024",
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const searchParams = useSearchParams()

  const statuses = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700"
      case "Shipped":
        return "bg-blue-100 text-blue-700"
      case "Processing":
        return "bg-yellow-100 text-yellow-700"
      case "Pending":
        return "bg-gray-100 text-gray-700"
      case "Cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-medium text-foreground mb-2">Orders</h1>
            <p className="text-muted-foreground">Manage all customer orders</p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-5 w-5" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4 bg-card border-border/50">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID, customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary border-border/50"
              />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Date Range
            </Button>
          </div>

          {/* Status Filters */}
          <div className="flex gap-2 flex-wrap">
            {statuses.map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="rounded-full"
              >
                {status}
              </Button>
            ))}
          </div>
        </Card>

        {/* Orders Table */}
        <Card className="bg-card border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-primary">{order.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{order.items} items</td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-4 bg-card border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Total Orders</p>
            <p className="text-2xl font-semibold text-foreground">{orders.length}</p>
          </Card>
          <Card className="p-4 bg-card border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Total Revenue</p>
            <p className="text-2xl font-semibold text-foreground">SAR 30,093</p>
          </Card>
          <Card className="p-4 bg-card border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Average Order</p>
            <p className="text-2xl font-semibold text-foreground">SAR 5,016</p>
          </Card>
          <Card className="p-4 bg-card border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Pending Orders</p>
            <p className="text-2xl font-semibold text-foreground text-yellow-600">1</p>
          </Card>
        </div>
      </div>
    </Suspense>
  )
}
