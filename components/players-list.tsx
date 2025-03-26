"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { EditPlayerDialog } from "@/components/edit-player-dialog"
import { toast } from "sonner"

// Mock data
const players = [
  { id: 1, name: "John Doe", position: "Forward", age: 24, jerseyNumber: 10 },
  { id: 2, name: "Jane Smith", position: "Midfielder", age: 22, jerseyNumber: 8 },
  { id: 3, name: "Mike Johnson", position: "Defender", age: 26, jerseyNumber: 4 },
  { id: 4, name: "Sarah Williams", position: "Goalkeeper", age: 25, jerseyNumber: 1 },
  { id: 5, name: "David Brown", position: "Forward", age: 23, jerseyNumber: 9 },
]

export function PlayersList() {
  const [playersList, setPlayersList] = useState(players)
  const [playerToDelete, setPlayerToDelete] = useState<number | null>(null)
  const [playerToEdit, setPlayerToEdit] = useState<number | null>(null)

  const handleDelete = () => {
    if (playerToDelete !== null) {
      const deletedPlayer = playersList.find((player) => player.id === playerToDelete)
      const newList = playersList.filter((player) => player.id !== playerToDelete)
      setPlayersList(newList)
      setPlayerToDelete(null)

      toast("Player deleted", {
        description: "The player has been removed from the team.",
        action: {
          label: "Undo",
          onClick: () => setPlayersList(playersList),
        },
      })
    }
  }

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Jersey Number</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {playersList.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell>{player.age}</TableCell>
                  <TableCell>{player.jerseyNumber}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setPlayerToEdit(player.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setPlayerToDelete(player.id)}>
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
      </div>

      <AlertDialog open={playerToDelete !== null} onOpenChange={(open) => !open && setPlayerToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the player from the team roster.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {playerToEdit !== null && (
        <EditPlayerDialog
          playerId={playerToEdit}
          open={playerToEdit !== null}
          onOpenChange={(open) => !open && setPlayerToEdit(null)}
        />
      )}
    </>
  )
}

