import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-10 bg-secondary rounded-lg w-48 animate-pulse" />
        <div className="h-4 bg-secondary rounded-lg w-64 animate-pulse" />
      </div>

      {/* Filters skeleton */}
      <Card className="p-4 bg-card border-border/50">
        <div className="flex gap-4">
          <div className="flex-1 h-10 bg-secondary rounded-lg animate-pulse" />
          <div className="h-10 w-24 bg-secondary rounded-lg animate-pulse" />
          <div className="h-10 w-24 bg-secondary rounded-lg animate-pulse" />
        </div>
      </Card>

      {/* Table skeleton */}
      <Card className="bg-card border-border/50">
        <div className="space-y-4 p-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-secondary rounded-lg animate-pulse" />
          ))}
        </div>
      </Card>
    </div>
  )
}
