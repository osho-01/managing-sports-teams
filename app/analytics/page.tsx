"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { BarChart3 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function AnalyticsPage() {
  const { toast } = useToast()

  const handleViewReports = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Performance analytics will be available in the next update.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-4 md:py-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Analyze team and player performance metrics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 md:py-12">
                <BarChart3 className="h-10 w-10 md:h-12 md:w-12 mx-auto text-muted-foreground" />
                <h3 className="text-lg font-medium mt-4">Performance data</h3>
                <p className="text-sm text-muted-foreground mt-1">Track and analyze performance metrics over time.</p>
                <Button className="mt-4" onClick={handleViewReports}>
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

