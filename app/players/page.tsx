"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { PlayersList } from "@/components/players-list"
import { AddPlayerDialog } from "@/components/add-player-dialog"

export default function PlayersPage() {
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Players</h1>
          <p className="text-muted-foreground">Manage your team roster and player information.</p>
        </div>
        <Button onClick={() => setIsAddPlayerOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Player
        </Button>
      </div>

      <PlayersList />

      <AddPlayerDialog open={isAddPlayerOpen} onOpenChange={setIsAddPlayerOpen} />
    </div>
  )
}

