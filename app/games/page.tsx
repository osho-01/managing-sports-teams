"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UpcomingGames from "@/components/upcoming-games"
import { SiteHeader } from "@/components/site-header"

export default function GamesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-4 md:py-6">
          <Card>
            <CardHeader>
              <CardTitle>Game Schedule</CardTitle>
              <CardDescription>View and manage upcoming and past games.</CardDescription>
            </CardHeader>
            <CardContent>
              <UpcomingGames />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

