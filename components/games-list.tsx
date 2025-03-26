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
import { EditGameDialog } from "@/components/edit-game-dialog"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

// Mock data
const games = [
  { id: 1, opponent: "Tigers", date: "2023-10-15", location: "Home", result: "Win", score: "3-1" },
  { id: 2, opponent: "Lions", date: "2023-10-22", location: "Away", result: "Loss", score: "1-2" },
  { id: 3, opponent: "Eagles", date: "2023-10-29", location: "Home", result: "Win", score: "2-0" },
  { id: 4, opponent: "Bears", date: "2023-11-05", location: "Away", result: "Win", score: "4-2" },
  { id: 5, opponent: "Wolves", date: "2023-11-12", location: "Home", result: "Win", score: "2-1" },
]

export function GamesList() {
  const [gamesList, setGamesList] = useState(games)
  const [gameToDelete, setGameToDelete] = useState<number | null>(null)
  const [gameToEdit, setGameToEdit] = useState<number | null>(null)

  const handleDelete = () => {
    if (gameToDelete !== null) {
      const deletedGame = gamesList.find((game) => game.id === gameToDelete)
      const newList = gamesList.filter((game) => game.id !== gameToDelete)
      setGamesList(newList)
      setGameToDelete(null)

      toast("Game deleted", {
        description: "The game has been removed from the schedule.",
        action: {
          label: "Undo",
          onClick: () => setGamesList(gamesList),
        },
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Opponent</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gamesList.map((game) => (
                <TableRow key={game.id}>
                  <TableCell className="font-medium">{game.opponent}</TableCell>
                  <TableCell>{formatDate(game.date)}</TableCell>
                  <TableCell>{game.location}</TableCell>
                  <TableCell>
                    <Badge variant={game.result === "Win" ? "default" : "destructive"}>{game.result}</Badge>
                  </TableCell>
                  <TableCell>{game.score}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setGameToEdit(game.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setGameToDelete(game.id)}>
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

      <AlertDialog open={gameToDelete !== null} onOpenChange={(open) => !open && setGameToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the game from the schedule.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {gameToEdit !== null && (
        <EditGameDialog
          gameId={gameToEdit}
          open={gameToEdit !== null}
          onOpenChange={(open) => !open && setGameToEdit(null)}
        />
      )}
    </>
  )
}

