"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Define types for TypeScript
type PlayerStatus = "Active" | "Injured" | "Inactive"
type PlayerPosition = "Guard" | "Forward" | "Center"

interface Player {
  id: number
  name: string
  position: PlayerPosition
  number: number
  status: PlayerStatus
  image: string
}

interface FormData {
  name: string
  position: PlayerPosition
  number: string
  status: PlayerStatus
}

// Sample player data
const initialPlayers: Player[] = [
  {
    id: 1,
    name: "Michael Jordan",
    position: "Forward",
    number: 23,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "LeBron James",
    position: "Forward",
    number: 6,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Stephen Curry",
    position: "Guard",
    number: 30,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Kevin Durant",
    position: "Forward",
    number: 7,
    status: "Injured",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Giannis Antetokounmpo",
    position: "Forward",
    number: 34,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function TeamRoster() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers)
  const [open, setOpen] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    position: "Forward",
    number: "",
    status: "Active",
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
      [name]: value,
    }))
  }

  const handleAddPlayer = () => {
    setEditingPlayer(null)
    setFormData({
      name: "",
      position: "Forward",
      number: "",
      status: "Active",
    })
    setOpen(true)
  }

  const handleEditPlayer = (player: Player) => {
    if (!player) return

    setEditingPlayer(player)
    setFormData({
      name: player.name || "",
      position: player.position || "Forward",
      number: player.number?.toString() || "",
      status: player.status || "Active",
    })
    setOpen(true)
  }

  const handleDeletePlayer = (id: number) => {
    if (!players) return
    setPlayers(players.filter((player) => player.id !== id))

    toast({
      title: "Player Deleted",
      description: "The player has been removed from the roster.",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.number) {
      alert("Please fill in all required fields")
      return
    }

    if (editingPlayer) {
      // Update existing player
      setPlayers((prevPlayers) => {
        if (!prevPlayers) return []
        return prevPlayers.map((player) =>
          player.id === editingPlayer.id
            ? {
                ...player,
                name: formData.name,
                position: formData.position,
                number: Number.parseInt(formData.number),
                status: formData.status,
              }
            : player,
        )
      })
    } else {
      // Add new player
      const newPlayer: Player = {
        id: players && players.length > 0 ? Math.max(...players.map((p) => p.id)) + 1 : 1,
        name: formData.name,
        position: formData.position,
        number: Number.parseInt(formData.number),
        status: formData.status,
        image: "/placeholder.svg?height=40&width=40",
      }
      setPlayers((prevPlayers) => [...(prevPlayers || []), newPlayer])
    }

    setOpen(false)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h3 className="text-lg font-medium">Players ({players?.length || 0})</h3>
          <p className="text-sm text-muted-foreground">Manage your team roster</p>
        </div>
        <Button onClick={handleAddPlayer}>
          <Plus className="h-4 w-4 mr-2" />
          Add Player
        </Button>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Player</TableHead>
              <TableHead className="hidden sm:table-cell min-w-[100px]">Position</TableHead>
              <TableHead className="hidden sm:table-cell min-w-[100px]">Number</TableHead>
              <TableHead className="min-w-[100px]">Status</TableHead>
              <TableHead className="text-right min-w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players && players.length > 0 ? (
              players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="hidden sm:flex">
                        <AvatarImage src={player.image} alt={player.name} />
                        <AvatarFallback>
                          {player.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div>{player.name}</div>
                        <div className="sm:hidden text-xs text-muted-foreground">
                          {player.position} | #{player.number}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{player.position}</TableCell>
                  <TableCell className="hidden sm:table-cell">{player.number}</TableCell>
                  <TableCell>
                    <Badge variant={player.status === "Active" ? "default" : "destructive"}>{player.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditPlayer(player)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeletePlayer(player.id)}>
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
                  No players added yet. Click "Add Player" to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingPlayer ? "Edit Player" : "Add New Player"}</DialogTitle>
            <DialogDescription>
              {editingPlayer ? "Update player information" : "Add a new player to your team roster"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter player name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Select value={formData.position} onValueChange={(value) => handleSelectChange("position", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Guard">Guard</SelectItem>
                    <SelectItem value="Forward">Forward</SelectItem>
                    <SelectItem value="Center">Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="number">Jersey Number</Label>
                <Input
                  id="number"
                  name="number"
                  type="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  placeholder="Enter jersey number"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Injured">Injured</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingPlayer ? "Save Changes" : "Add Player"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

