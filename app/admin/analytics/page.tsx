"use client"

import { BarChart3, LineChart, PieChart, TrendingUp, Calendar, Download } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">View your business performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-card border-border/50">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Revenue</p>
              <p className="text-2xl font-semibold text-foreground">SAR 2,34,567</p>
              <p className="text-xs text-green-600 mt-2">+12.5% vs last period</p>
            </div>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border/50">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Conversion Rate</p>
            <p className="text-2xl font-semibold text-foreground">3.24%</p>
            <p className="text-xs text-green-600 mt-2">+0.8% vs last period</p>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border/50">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Avg. Order Value</p>
            <p className="text-2xl font-semibold text-foreground">SAR 5,016</p>
            <p className="text-xs text-red-600 mt-2">-2.1% vs last period</p>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border/50">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Return Rate</p>
            <p className="text-2xl font-semibold text-foreground">2.8%</p>
            <p className="text-xs text-green-600 mt-2">-0.3% vs last period</p>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card className="p-6 bg-card border-border/50">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-foreground">Sales Trend</h3>
            <p className="text-sm text-muted-foreground">Last 30 days</p>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <LineChart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Chart visualization</p>
            </div>
          </div>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 bg-card border-border/50">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-foreground">Sales by Category</h3>
            <p className="text-sm text-muted-foreground">Product category breakdown</p>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <PieChart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Chart visualization</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Categories */}
        <Card className="p-6 bg-card border-border/50">
          <h3 className="text-lg font-medium text-foreground mb-6">Top Selling Categories</h3>
          <div className="space-y-4">
            {[
              { category: "Sarees", sales: 234, revenue: "SAR 9,36,000", percent: 42 },
              { category: "Lehengas", sales: 189, revenue: "SAR 7,56,000", percent: 34 },
              { category: "Kurtis", sales: 156, revenue: "SAR 4,68,000", percent: 21 },
              { category: "Dresses", sales: 142, revenue: "SAR 6,37,800", percent: 28 },
            ].map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.category}</p>
                    <p className="text-xs text-muted-foreground">{item.sales} sales</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{item.revenue}</p>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Traffic Sources */}
        <Card className="p-6 bg-card border-border/50">
          <h3 className="text-lg font-medium text-foreground mb-6">Traffic Sources</h3>
          <div className="space-y-4">
            {[
              { source: "Direct", visitors: "12,450", percent: 38 },
              { source: "Instagram", visitors: "9,820", percent: 30 },
              { source: "Search Engine", visitors: "7,650", percent: 23 },
              { source: "Referral", visitors: "2,410", percent: 7 },
            ].map((item) => (
              <div key={item.source}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.source}</p>
                    <p className="text-xs text-muted-foreground">{item.visitors} visitors</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{item.percent}%</p>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Performance Indicators */}
      <Card className="p-6 bg-card border-border/50">
        <h3 className="text-lg font-medium text-foreground mb-6">Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Bounce Rate</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-semibold text-foreground">32.4%</p>
              <span className="text-xs text-green-600">↓ 2.1%</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Avg. Session Duration</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-semibold text-foreground">4m 32s</p>
              <span className="text-xs text-green-600">↑ 45s</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Cart Abandonment</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-semibold text-foreground">18.7%</p>
              <span className="text-xs text-green-600">↓ 3.2%</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
