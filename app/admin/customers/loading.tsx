import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-10 bg-secondary rounded-lg w-48 animate-pulse" />
        <div className="h-4 bg-secondary rounded-lg w-64 animate-pulse" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6 bg-card border-border/50">
            <div className="h-24 bg-secondary rounded-lg animate-pulse" />
          </Card>
        ))}
      </div>

      {/* Search skeleton */}
      <Card className="p-4 bg-card border-border/50">
        <div className="h-10 bg-secondary rounded-lg animate-pulse" />
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
