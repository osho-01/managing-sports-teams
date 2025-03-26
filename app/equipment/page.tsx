"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { Package } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function EquipmentPage() {
  const { toast } = useToast()

  const handleAddEquipment = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Equipment tracking will be available in the next update.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-4 md:py-6">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Inventory</CardTitle>
              <CardDescription>Track team equipment and assignments.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 md:py-12">
                <Package className="h-10 w-10 md:h-12 md:w-12 mx-auto text-muted-foreground" />
                <h3 className="text-lg font-medium mt-4">Equipment tracking</h3>
                <p className="text-sm text-muted-foreground mt-1">Add equipment items to start tracking inventory.</p>
                <Button className="mt-4" onClick={handleAddEquipment}>
                  Add Equipment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

