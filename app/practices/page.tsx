"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { useToast } from "@/components/ui/use-toast"
import { SchedulePracticeDialog, type Practice } from "@/components/schedule-practice-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { CalendarIcon, Clock, MapPin, Pencil, Trash2 } from "lucide-react"

export default function PracticesPage() {
  const { toast } = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [practices, setPractices] = useState<Practice[]>([])

  const handleSchedulePractice = () => {
    setDialogOpen(true)
  }

  const handlePracticeScheduled = (practice: Practice) => {
    setPractices([...practices, practice])
  }

  const handleDeletePractice = (id: string) => {
    setPractices(practices.filter((practice) => practice.id !== id))
    toast({
      title: "Practice Deleted",
      description: "The practice has been removed from the schedule.",
      duration: 3000,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-4 md:py-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <CardTitle>Practice Sessions</CardTitle>
                <CardDescription>Manage practice schedules and drills.</CardDescription>
              </div>
              <Button onClick={handleSchedulePractice}>Schedule Practice</Button>
            </CardHeader>
            <CardContent>
              {practices.length > 0 ? (
                <div className="overflow-x-auto border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[150px]">Date</TableHead>
                        <TableHead className="min-w-[150px]">Time</TableHead>
                        <TableHead className="min-w-[150px]">Location</TableHead>
                        <TableHead className="min-w-[100px]">Type</TableHead>
                        <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {practices.map((practice) => (
                        <TableRow key={practice.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                              {format(practice.date, "MMM d, yyyy")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {practice.startTime} - {practice.endTime}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              {practice.location}
                            </div>
                          </TableCell>
                          <TableCell>{practice.type}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeletePractice(practice.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 md:py-12">
                  <h3 className="text-lg font-medium">No upcoming practices</h3>
                  <p className="text-sm text-muted-foreground mt-1">Schedule a new practice session to get started.</p>
                  <Button className="mt-4" onClick={handleSchedulePractice} size="lg">
                    Schedule Practice
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <SchedulePracticeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onPracticeScheduled={handlePracticeScheduled}
      />
    </div>
  )
}

