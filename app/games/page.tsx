"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { GamesList } from "@/components/games-list"
import { AddGameDialog } from "@/components/add-game-dialog"

export default function GamesPage() {
  const [isAddGameOpen, setIsAddGameOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Games</h1>
          <p className="text-muted-foreground">Manage your team's game schedule and results.</p>
        </div>
        <Button onClick={() => setIsAddGameOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Game
        </Button>
      </div>

      <GamesList />

      <AddGameDialog open={isAddGameOpen} onOpenChange={setIsAddGameOpen} />
    </div>
  )
}

