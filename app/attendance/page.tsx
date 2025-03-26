"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// Mock data
const players = [
  { id: 1, name: "John Doe", position: "Forward", attendance: "Present" },
  { id: 2, name: "Jane Smith", position: "Midfielder", attendance: "Absent" },
  { id: 3, name: "Mike Johnson", position: "Defender", attendance: "Late" },
  { id: 4, name: "Sarah Williams", position: "Goalkeeper", attendance: "Present" },
  { id: 5, name: "David Brown", position: "Forward", attendance: "Present" },
]

const events = [
  { id: 1, name: "Practice Session", date: "2023-11-15", type: "Practice" },
  { id: 2, name: "Game vs Tigers", date: "2023-11-18", type: "Game" },
  { id: 3, name: "Team Meeting", date: "2023-11-20", type: "Meeting" },
]

export default function AttendancePage() {
  const [selectedEvent, setSelectedEvent] = useState("1")
  const [attendanceData, setAttendanceData] = useState(players)

  const handleAttendanceChange = (playerId: number, status: string) => {
    const updatedData = attendanceData.map((player) =>
      player.id === playerId ? { ...player, attendance: status } : player,
    )
    setAttendanceData(updatedData)

    const player = players.find((p) => p.id === playerId)
    toast.success("Attendance updated", {
      description: `${player?.name}'s attendance marked as ${status}.`,
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const event = events.find((e) => e.id.toString() === selectedEvent)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance Tracking</h1>
          <p className="text-muted-foreground">Track player attendance for games, practices, and team events.</p>
        </div>
        <div className="w-full md:w-[200px]">
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger>
              <SelectValue placeholder="Select event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id.toString()}>
                  {event.name} ({formatDate(event.date)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {event && (
        <Card>
          <CardHeader>
            <CardTitle>{event.name}</CardTitle>
            <CardDescription>
              {event.type} on {formatDate(event.date)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell className="font-medium">{player.name}</TableCell>
                      <TableCell>{player.position}</TableCell>
                      <TableCell>
                        <Select
                          value={player.attendance}
                          onValueChange={(value) => handleAttendanceChange(player.id, value)}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Present">Present</SelectItem>
                            <SelectItem value="Absent">Absent</SelectItem>
                            <SelectItem value="Late">Late</SelectItem>
                            <SelectItem value="Excused">Excused</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast.success("Notification sent", {
                              description: `Reminder sent to ${player.name}.`,
                            })
                          }}
                        >
                          Send Reminder
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

