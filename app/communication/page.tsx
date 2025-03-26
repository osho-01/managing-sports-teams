"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"

// Mock data
const messages = [
  {
    id: 1,
    sender: "Coach Smith",
    avatar: "CS",
    content: "Team meeting tomorrow at 6 PM to discuss strategy for the upcoming game.",
    timestamp: "2023-11-15T18:30:00",
  },
  {
    id: 2,
    sender: "Team Captain",
    avatar: "TC",
    content: "Everyone please remember to bring your training gear for tomorrow's session.",
    timestamp: "2023-11-15T19:45:00",
  },
  {
    id: 3,
    sender: "Equipment Manager",
    avatar: "EM",
    content: "New training kits have arrived. Please collect yours before practice on Thursday.",
    timestamp: "2023-11-16T09:15:00",
  },
]

const announcements = [
  {
    id: 1,
    title: "Season Schedule Released",
    content: "The full season schedule has been released. Please check your emails for details.",
    date: "2023-11-10",
  },
  {
    id: 2,
    title: "Team Fundraiser",
    content: "We will be holding a fundraiser on December 5th. All players are expected to participate.",
    date: "2023-11-12",
  },
  {
    id: 3,
    title: "Holiday Break",
    content: "There will be no training sessions from December 24th to January 2nd due to the holiday break.",
    date: "2023-11-14",
  },
]

export default function CommunicationPage() {
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString)
    return dateObj.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const formatTime = (dateString: string) => {
    const dateObj = new Date(dateString)
    return dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Communication</h1>
          <p className="text-muted-foreground">Communicate with your team through messages and announcements.</p>
        </div>
      </div>

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Messages</CardTitle>
              <CardDescription>Recent messages from coaches and team members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-4 p-4 border rounded-lg">
                  <Avatar>
                    <AvatarFallback>{message.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.timestamp)} on {formatDate(message.timestamp)}
                      </span>
                    </div>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Textarea placeholder="Type your message here..." className="min-h-[100px]" />
              <div className="flex justify-end w-full">
                <Button
                  onClick={() =>
                    toast.success("Message sent", {
                      description: "Your message has been sent to the team.",
                    })
                  }
                >
                  Send Message
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Announcements</CardTitle>
              <CardDescription>Important announcements for all team members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{announcement.title}</h3>
                    <span className="text-xs text-muted-foreground">{formatDate(announcement.date)}</span>
                  </div>
                  <p>{announcement.content}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="space-y-4 w-full">
                <Input placeholder="Announcement Title" />
                <Textarea placeholder="Announcement content..." className="min-h-[100px]" />
              </div>
              <div className="flex justify-end w-full">
                <Button
                  onClick={() =>
                    toast.success("Announcement posted", {
                      description: "Your announcement has been posted to the team.",
                    })
                  }
                >
                  Post Announcement
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

