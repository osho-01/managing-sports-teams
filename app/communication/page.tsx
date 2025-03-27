"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { MessageSquare } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { NewMessageDialog } from "@/components/new-message-dialog"

export default function CommunicationPage() {
  const { toast } = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleNewMessage = () => {
    setDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-4 md:py-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Communication</CardTitle>
              <CardDescription>Send messages and announcements to your team.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 md:py-12">
                <MessageSquare className="h-10 w-10 md:h-12 md:w-12 mx-auto text-muted-foreground" />
                <h3 className="text-lg font-medium mt-4">Team messaging</h3>
                <p className="text-sm text-muted-foreground mt-1">Send announcements or messages to your team.</p>
                <Button className="mt-4" onClick={handleNewMessage} size="lg">
                  New Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <NewMessageDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}

