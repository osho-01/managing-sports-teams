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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Edit, MapPin, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

// Define types for TypeScript
type GameType = "League" | "Tournament" | "Friendly" | "Playoff"

interface Game {
  id: number
  opponent: string
  location: string
  date: Date
  time: string
  type: GameType
}

interface FormData {
  opponent: string
  location: string
  date: Date
  time: string
  type: GameType
}

// Sample game data
const initialGames: Game[] = [
  {
    id: 1,
    opponent: "Wildcats",
    location: "Home Court",
    date: new Date(2025, 3, 15),
    time: "19:00",
    type: "League",
  },
  {
    id: 2,
    opponent: "Tigers",
    location: "Away Field",
    date: new Date(2025, 3, 22),
    time: "15:30",
    type: "Tournament",
  },
  {
    id: 3,
    opponent: "Eagles",
    location: "City Stadium",
    date: new Date(2025, 3, 29),
    time: "18:00",
    type: "League",
  },
]

export default function UpcomingGames() {
  const [games, setGames] = useState<Game[]>(initialGames)
  const [open, setOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [editingGame, setEditingGame] = useState<Game | null>(null)
  const [formData, setFormData] = useState<FormData>({
    opponent: "",
    location: "",
    date: new Date(),
    time: "",
    type: "League",
  })

  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value as GameType,
    }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return

    setFormData((prev) => ({
      ...prev,
      date,
    }))
    setCalendarOpen(false)
  }

  const handleAddGame = () => {
    setEditingGame(null)
    setFormData({
      opponent: "",
      location: "",
      date: new Date(),
      time: "",
      type: "League",
    })
    setOpen(true)
  }

  const handleEditGame = (game: Game) => {
    if (!game) return

    setEditingGame(game)
    setFormData({
      opponent: game.opponent || "",
      location: game.location || "",
      date: game.date ? new Date(game.date) : new Date(),
      time: game.time || "",
      type: game.type || "League",
    })
    setOpen(true)
  }

  const handleDeleteGame = (id: number) => {
    if (!games) return
    setGames(games.filter((game) => game.id !== id))

    toast({
      title: "Game Deleted",
      description: "The game has been removed from the schedule.",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.opponent || !formData.location || !formData.time) {
      alert("Please fill in all required fields")
      return
    }

    if (editingGame) {
      // Update existing game
      setGames((prevGames) => {
        if (!prevGames) return []
        return prevGames.map((game) =>
          game.id === editingGame.id
            ? {
                ...game,
                opponent: formData.opponent,
                location: formData.location,
                date: formData.date,
                time: formData.time,
                type: formData.type,
              }
            : game,
        )
      })
    } else {
      // Add new game
      const newGame: Game = {
        id: games && games.length > 0 ? Math.max(...games.map((g) => g.id)) + 1 : 1,
        opponent: formData.opponent,
        location: formData.location,
        date: formData.date,
        time: formData.time,
        type: formData.type,
      }
      setGames((prevGames) => [...(prevGames || []), newGame])
    }

    setOpen(false)
  }

  // Sort games by date
  const sortedGames = games ? [...games].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) : []

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h3 className="text-lg font-medium">Game Schedule</h3>
          <p className="text-sm text-muted-foreground">Manage upcoming games</p>
        </div>
        <Button onClick={handleAddGame}>
          <Plus className="h-4 w-4 mr-2" />
          Add Game
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Opponent</TableHead>
              <TableHead className="hidden md:table-cell">Date & Time</TableHead>
              <TableHead className="hidden sm:table-cell">Location</TableHead>
              <TableHead className="hidden lg:table-cell">Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedGames && sortedGames.length > 0 ? (
              sortedGames.map((game) => (
                <TableRow key={game.id}>
                  <TableCell className="font-medium">
                    <div>
                      {game.opponent}
                      <div className="md:hidden text-xs text-muted-foreground">
                        {format(new Date(game.date), "MMM d")} at {game.time}
                      </div>
                      <div className="sm:hidden text-xs text-muted-foreground">{game.location}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(new Date(game.date), "MMM d, yyyy")} at {game.time}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      {game.location}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{game.type}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditGame(game)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteGame(game.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No games scheduled yet. Click "Add Game" to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingGame ? "Edit Game" : "Add New Game"}</DialogTitle>
            <DialogDescription>
              {editingGame ? "Update game information" : "Schedule a new game for your team"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="opponent">Opponent</Label>
                <Input
                  id="opponent"
                  name="opponent"
                  value={formData.opponent}
                  onChange={handleInputChange}
                  placeholder="Enter opponent name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter game location"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={formData.date} onSelect={handleDateChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Game Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select game type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="League">League</SelectItem>
                    <SelectItem value="Tournament">Tournament</SelectItem>
                    <SelectItem value="Friendly">Friendly</SelectItem>
                    <SelectItem value="Playoff">Playoff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingGame ? "Save Changes" : "Add Game"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

