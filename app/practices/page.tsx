"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { useToast } from "@/components/ui/use-toast"

export default function PracticesPage() {
  const { toast } = useToast()

  const handleSchedulePractice = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Practice scheduling will be available in the next update.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-4 md:py-6">
          <Card>
            <CardHeader>
              <CardTitle>Practice Sessions</CardTitle>
              <CardDescription>Manage practice schedules and drills.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 md:py-12">
                <h3 className="text-lg font-medium">No upcoming practices</h3>
                <p className="text-sm text-muted-foreground mt-1">Schedule a new practice session to get started.</p>
                <Button className="mt-4" onClick={handleSchedulePractice}>
                  Schedule Practice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

