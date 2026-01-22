"use client"

import { BarChart3, ShoppingBag, Users, TrendingUp, Eye, Heart, DollarSign, Package } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data
const dashboardStats = [
  { label: "Total Sales", value: "₹2,34,567", change: "+12.5%", icon: DollarSign, trend: "up" },
  { label: "Total Orders", value: "1,234", change: "+8.2%", icon: ShoppingBag, trend: "up" },
  { label: "Total Customers", value: "5,678", change: "+15.3%", icon: Users, trend: "up" },
  { label: "Total Products", value: "342", change: "+4.1%", icon: Package, trend: "up" },
]

const recentOrders = [
  { id: "#ORD001", customer: "Priya Sharma", total: "₹4,299", status: "Delivered", date: "Today" },
  { id: "#ORD002", customer: "Aisha Khan", total: "₹2,899", status: "Processing", date: "Yesterday" },
  { id: "#ORD003", customer: "Deepika Patel", total: "₹6,499", status: "Shipped", date: "2 days ago" },
  { id: "#ORD004", customer: "Zara Lopez", total: "₹3,299", status: "Pending", date: "3 days ago" },
  { id: "#ORD005", customer: "Emma Wilson", total: "₹5,199", status: "Delivered", date: "1 week ago" },
]

const topProducts = [
  { id: 1, name: "Silk Saree - Midnight Blue", sales: 234, revenue: "₹9,36,000" },
  { id: 2, name: "Embroidered Lehenga", sales: 189, revenue: "₹7,56,000" },
  { id: 3, name: "Cotton Kurtis Collection", sales: 156, revenue: "₹4,68,000" },
  { id: 4, name: "Designer Anarkali", sales: 142, revenue: "₹6,37,800" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-medium text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with Reverie today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6 bg-card border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className={`text-xs mt-2 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 p-6 bg-card border-border/50">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-foreground">Sales Overview</h3>
            <p className="text-sm text-muted-foreground">Last 7 days performance</p>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Chart visualization coming soon</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-card border-border/50">
          <h3 className="text-lg font-medium text-foreground mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/admin/products">
              <Button variant="outline" className="w-full justify-start text-left bg-transparent" size="sm">
                <Package className="h-4 w-4 mr-2" />
                Manage Products
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button variant="outline" className="w-full justify-start text-left bg-transparent" size="sm">
                <ShoppingBag className="h-4 w-4 mr-2" />
                View Orders
              </Button>
            </Link>
            <Link href="/admin/customers">
              <Button variant="outline" className="w-full justify-start text-left bg-transparent" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Customers
              </Button>
            </Link>
            <Link href="/admin/analytics">
              <Button variant="outline" className="w-full justify-start text-left bg-transparent" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="p-6 bg-card border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-foreground">Recent Orders</h3>
              <p className="text-sm text-muted-foreground">Latest transactions</p>
            </div>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.id} • {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{order.total}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "Delivered" ? "bg-green-100 text-green-700" :
                    order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                    order.status === "Processing" ? "bg-yellow-100 text-yellow-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Products */}
        <Card className="p-6 bg-card border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-foreground">Top Products</h3>
              <p className="text-sm text-muted-foreground">Best sellers this month</p>
            </div>
            <Link href="/admin/products">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} sold</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground">{product.revenue}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
