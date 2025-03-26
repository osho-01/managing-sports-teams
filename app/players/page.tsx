"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TeamRoster from "@/components/team-roster"
import { SiteHeader } from "@/components/site-header"

export default function PlayersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-4 md:py-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Roster</CardTitle>
              <CardDescription>Manage your team's players and their information.</CardDescription>
            </CardHeader>
            <CardContent>
              <TeamRoster />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

