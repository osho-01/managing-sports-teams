"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

export interface Practice {
  id: string
  date: Date
  startTime: string
  endTime: string
  location: string
  type: string
  notes: string
}

interface SchedulePracticeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPracticeScheduled: (practice: Practice) => void
}

export function SchedulePracticeDialog({ open, onOpenChange, onPracticeScheduled }: SchedulePracticeDialogProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [startTime, setStartTime] = useState("16:00")
  const [endTime, setEndTime] = useState("18:00")
  const [location, setLocation] = useState("")
  const [type, setType] = useState("Regular")
  const [notes, setNotes] = useState("")

  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create a new practice object
    const newPractice: Practice = {
      id: Date.now().toString(),
      date,
      startTime,
      endTime,
      location,
      type,
      notes,
    }

    // Pass the new practice to the parent component
    onPracticeScheduled(newPractice)

    toast({
      title: "Practice Scheduled",
      description: `Practice scheduled for ${format(date, "MMMM d, yyyy")} from ${startTime} to ${endTime}`,
      duration: 3000,
    })

    // Reset form fields
    setLocation("")
    setNotes("")

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Practice</DialogTitle>
          <DialogDescription>Create a new practice session for your team.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button id="date" variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      if (date) {
                        setDate(date)
                        setCalendarOpen(false)
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter practice location"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Practice Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select practice type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Regular">Regular</SelectItem>
                  <SelectItem value="Conditioning">Conditioning</SelectItem>
                  <SelectItem value="Scrimmage">Scrimmage</SelectItem>
                  <SelectItem value="Shooting">Shooting</SelectItem>
                  <SelectItem value="Tactical">Tactical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes or instructions"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Practice</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

