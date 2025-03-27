"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import StatsOverview from "@/components/stats-overview"
import { SiteHeader } from "@/components/site-header"

export default function StatsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-4 md:py-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Statistics</CardTitle>
              <CardDescription>Track and analyze team and player performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <StatsOverview />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

