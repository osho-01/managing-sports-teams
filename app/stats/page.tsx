"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

// Mock data
const players = [
  { id: 1, name: "John Doe", position: "Forward", goals: 12, assists: 8, gamesPlayed: 15 },
  { id: 2, name: "Jane Smith", position: "Midfielder", goals: 5, assists: 15, gamesPlayed: 14 },
  { id: 3, name: "Mike Johnson", position: "Defender", goals: 2, assists: 3, gamesPlayed: 15 },
  { id: 4, name: "Sarah Williams", position: "Goalkeeper", goals: 0, assists: 1, gamesPlayed: 15 },
  { id: 5, name: "David Brown", position: "Forward", goals: 10, assists: 6, gamesPlayed: 13 },
]

const teamStats = {
  wins: 9,
  losses: 3,
  draws: 3,
  goalsScored: 29,
  goalsConceded: 15,
}

export default function StatsPage() {
  const [sortBy, setSortBy] = useState("goals")

  const sortedPlayers = [...players].sort((a, b) => {
    if (sortBy === "goals") return b.goals - a.goals
    if (sortBy === "assists") return b.assists - a.assists
    if (sortBy === "gamesPlayed") return b.gamesPlayed - a.gamesPlayed
    return 0
  })

  const winPercentage = (teamStats.wins / (teamStats.wins + teamStats.losses + teamStats.draws)) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Team Statistics</h1>
        <p className="text-muted-foreground">View and analyze team and player performance statistics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.wins}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Losses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.losses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draws</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.draws}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Difference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.goalsScored - teamStats.goalsConceded}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Win/Loss Record</CardTitle>
          <CardDescription>Team performance over the season</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={winPercentage} className="h-2" />
            <div className="text-sm text-muted-foreground">
              Win rate: {winPercentage.toFixed(1)}% ({teamStats.wins}-{teamStats.losses}-{teamStats.draws})
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Player Statistics</CardTitle>
            <CardDescription>Individual player performance</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="goals">Goals</SelectItem>
                <SelectItem value="assists">Assists</SelectItem>
                <SelectItem value="gamesPlayed">Games Played</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead className="text-right">Goals</TableHead>
                  <TableHead className="text-right">Assists</TableHead>
                  <TableHead className="text-right">Games</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell className="text-right">{player.goals}</TableCell>
                    <TableCell className="text-right">{player.assists}</TableCell>
                    <TableCell className="text-right">{player.gamesPlayed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

