"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"

// Define types for TypeScript
type AttendanceStatus = "present" | "absent"

interface Player {
  id: number
  name: string
  status: AttendanceStatus
}

interface Event {
  id: number
  type: string
  opponent: string | null
  date: Date
}

interface AttendanceData {
  event: Event
  players: Player[]
}

// Sample attendance data
const initialAttendance: AttendanceData = {
  event: {
    id: 1,
    type: "Game",
    opponent: "Wildcats",
    date: new Date(2025, 3, 15),
  },
  players: [
    { id: 1, name: "Michael Jordan", status: "present" },
    { id: 2, name: "LeBron James", status: "present" },
    { id: 3, name: "Stephen Curry", status: "present" },
    { id: 4, name: "Kevin Durant", status: "absent" },
    { id: 5, name: "Giannis Antetokounmpo", status: "present" },
  ],
}

// Sample events for dropdown
const events: Event[] = [
  { id: 1, type: "Game", opponent: "Wildcats", date: new Date(2025, 3, 15) },
  { id: 2, type: "Practice", opponent: null, date: new Date(2025, 3, 12) },
  { id: 3, type: "Game", opponent: "Tigers", date: new Date(2025, 3, 22) },
]

export default function AttendanceOverview() {
  const [attendance, setAttendance] = useState<AttendanceData>(initialAttendance)
  const [selectedEvent, setSelectedEvent] = useState("1")

  // Update the handleEventChange function to properly update attendance data
  const handleEventChange = (value: string) => {
    setSelectedEvent(value)
    const event = events.find((e) => e.id.toString() === value)

    if (event) {
      // Create sample attendance data for the selected event
      const sampleAttendance = {
        event,
        players: [
          { id: 1, name: "Michael Jordan", status: event.id === 3 ? "absent" : "present" },
          { id: 2, name: "LeBron James", status: "present" },
          { id: 3, name: "Stephen Curry", status: event.id === 2 ? "absent" : "present" },
          { id: 4, name: "Kevin Durant", status: event.id === 1 ? "absent" : "present" },
          { id: 5, name: "Giannis Antetokounmpo", status: "present" },
        ],
      }

      setAttendance(sampleAttendance)
    }
  }

  const handleAttendanceChange = (playerId: number, status: AttendanceStatus) => {
    if (!attendance || !attendance.players) return

    setAttendance({
      ...attendance,
      players: attendance.players.map((player) => (player.id === playerId ? { ...player, status } : player)),
    })
  }

  const getAttendanceRate = () => {
    if (!attendance?.players?.length) return 0
    const present = attendance.players.filter((p) => p.status === "present").length
    return Math.round((present / attendance.players.length) * 100)
  }

  // Update the table container to ensure proper horizontal scrolling
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h3 className="text-lg font-medium">Attendance Tracking</h3>
          <p className="text-sm text-muted-foreground">Track player attendance for games and practices</p>
        </div>
        <div className="w-full md:w-64">
          <Select value={selectedEvent} onValueChange={handleEventChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id.toString()}>
                  {event.type}: {event.type === "Game" ? event.opponent : format(event.date, "MMM d")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {attendance && attendance.event && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Event</h4>
                <p className="font-medium">{attendance.event.type}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Date</h4>
                <p className="font-medium">{format(attendance.event.date, "MMMM d, yyyy")}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Attendance Rate</h4>
                <p className="font-medium">{getAttendanceRate()}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="overflow-x-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">Player</TableHead>
              <TableHead className="min-w-[100px]">Status</TableHead>
              <TableHead className="text-right min-w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance && attendance.players && attendance.players.length > 0 ? (
              attendance.players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        player.status === "present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {player.status === "present" ? "Present" : "Absent"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`present-${player.id}`}
                          checked={player.status === "present"}
                          onCheckedChange={(checked) =>
                            handleAttendanceChange(player.id, checked ? "present" : "absent")
                          }
                        />
                        <label
                          htmlFor={`present-${player.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Mark Present
                        </label>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6">
                  No attendance data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

