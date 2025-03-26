"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayersList } from "@/components/players-list"
import { GamesList } from "@/components/games-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { AddPlayerDialog } from "@/components/add-player-dialog"
import { AddGameDialog } from "@/components/add-game-dialog"

export default function Home() {
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false)
  const [isAddGameOpen, setIsAddGameOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Games Played</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+4 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="players" className="space-y-4">
        <TabsList>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="games">Games</TabsTrigger>
        </TabsList>
        <TabsContent value="players" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Players</h2>
            <Button onClick={() => setIsAddPlayerOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Player
            </Button>
          </div>
          <PlayersList />
        </TabsContent>
        <TabsContent value="games" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Games</h2>
            <Button onClick={() => setIsAddGameOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Game
            </Button>
          </div>
          <GamesList />
        </TabsContent>
      </Tabs>

      <AddPlayerDialog open={isAddPlayerOpen} onOpenChange={setIsAddPlayerOpen} />
      <AddGameDialog open={isAddGameOpen} onOpenChange={setIsAddGameOpen} />
    </div>
  )
}

