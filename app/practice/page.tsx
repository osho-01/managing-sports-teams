"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Dumbbell, Users } from "lucide-react"
import { toast } from "sonner"

// Mock data
const practices = [
  {
    id: 1,
    title: "Team Training",
    date: "2023-11-20",
    time: "18:00 - 20:00",
    location: "Main Field",
    focus: "Passing and Movement",
    attendees: 18,
  },
  {
    id: 2,
    title: "Tactical Session",
    date: "2023-11-22",
    time: "18:00 - 19:30",
    location: "Training Ground",
    focus: "Set Pieces",
    attendees: 22,
  },
  {
    id: 3,
    title: "Recovery Session",
    date: "2023-11-24",
    time: "10:00 - 11:30",
    location: "Gym",
    focus: "Stretching and Light Exercise",
    attendees: 20,
  },
]

export default function PracticePage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Practice Sessions</h1>
          <p className="text-muted-foreground">Manage and schedule team practice sessions.</p>
        </div>
        <Button
          onClick={() =>
            toast.success("New practice session created", {
              description: "The practice session has been added to the schedule.",
            })
          }
        >
          Schedule New Practice
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {practices.map((practice) => (
          <Card key={practice.id}>
            <CardHeader>
              <CardTitle>{practice.title}</CardTitle>
              <CardDescription>{formatDate(practice.date)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{practice.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{practice.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
                <span>Focus: {practice.focus}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{practice.attendees} players attending</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() =>
                  toast.success("Practice details sent", {
                    description: "Details have been sent to all team members.",
                  })
                }
              >
                Send Details
              </Button>
              <Button
                onClick={() =>
                  toast.success("Practice session updated", {
                    description: "The practice session has been updated.",
                  })
                }
              >
                Edit Session
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

