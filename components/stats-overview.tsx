"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line } from "recharts"

// Define types for TypeScript
interface PlayerStats {
  id: number
  name: string
  points: number
  rebounds: number
  assists: number
  steals: number
  blocks: number
  [key: string]: number | string // Index signature for dynamic access
}

interface TeamPerformance {
  game: string
  points: number
  opponentPoints: number
}

interface ShootingData {
  name: string
  team: number
  league: number
}

interface GameByGameData {
  game: string
  points: number
  rebounds: number
  assists: number
}

interface TooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

// Sample player stats data
const playerStats: PlayerStats[] = [
  { id: 1, name: "Michael Jordan", points: 28.5, rebounds: 6.2, assists: 5.9, steals: 2.4, blocks: 0.8 },
  { id: 2, name: "LeBron James", points: 25.7, rebounds: 7.8, assists: 7.6, steals: 1.5, blocks: 0.6 },
  { id: 3, name: "Stephen Curry", points: 24.3, rebounds: 4.5, assists: 6.3, steals: 1.7, blocks: 0.2 },
  { id: 4, name: "Kevin Durant", points: 27.1, rebounds: 7.1, assists: 4.2, steals: 1.1, blocks: 1.1 },
  { id: 5, name: "Giannis Antetokounmpo", points: 26.9, rebounds: 11.5, assists: 5.6, steals: 1.2, blocks: 1.4 },
]

// Sample team performance data
const teamPerformance: TeamPerformance[] = [
  { game: "Game 1", points: 105, opponentPoints: 98 },
  { game: "Game 2", points: 112, opponentPoints: 104 },
  { game: "Game 3", points: 95, opponentPoints: 101 },
  { game: "Game 4", points: 120, opponentPoints: 110 },
  { game: "Game 5", points: 108, opponentPoints: 115 },
]

// Sample shooting data for charts
const shootingData: ShootingData[] = [
  { name: "2PT", team: 48.2, league: 51.3 },
  { name: "3PT", team: 36.5, league: 35.2 },
  { name: "FT", team: 78.4, league: 76.9 },
]

// Sample game-by-game data
const gameByGameData: GameByGameData[] = [
  { game: "Game 1", points: 105, rebounds: 42, assists: 22 },
  { game: "Game 2", points: 112, rebounds: 38, assists: 25 },
  { game: "Game 3", points: 95, rebounds: 45, assists: 18 },
  { game: "Game 4", points: 120, rebounds: 40, assists: 28 },
  { game: "Game 5", points: 108, rebounds: 36, assists: 24 },
]

// Custom tooltip components to avoid null/undefined issues
const ShootingTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload || !payload.length) return null

  return (
    <ChartTooltipContent>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-xs">Team</span>
          <span className="font-bold">{payload[0]?.value || 0}%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs">League</span>
          <span className="font-bold">{payload[1]?.value || 0}%</span>
        </div>
      </div>
    </ChartTooltipContent>
  )
}

const GamePerformanceTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload || !payload.length) return null

  const data = payload[0]?.payload || {}

  return (
    <ChartTooltipContent>
      <div className="grid gap-2">
        <div className="font-bold">{data.game || ""}</div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col">
            <span className="text-xs">Points</span>
            <span className="font-bold">{payload[0]?.value || 0}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs">Rebounds</span>
            <span className="font-bold">{payload[1]?.value || 0}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs">Assists</span>
            <span className="font-bold">{payload[2]?.value || 0}</span>
          </div>
        </div>
      </div>
    </ChartTooltipContent>
  )
}

export default function StatsOverview() {
  const [statView, setStatView] = useState("individual")
  const [selectedStat, setSelectedStat] = useState("points")

  const statOptions = [
    { value: "points", label: "Points" },
    { value: "rebounds", label: "Rebounds" },
    { value: "assists", label: "Assists" },
    { value: "steals", label: "Steals" },
    { value: "blocks", label: "Blocks" },
  ]

  // Sort players by selected stat
  const sortedPlayers = playerStats
    ? [...playerStats].sort((a, b) => {
        // Ensure we're comparing numbers
        const aValue = typeof a[selectedStat] === "number" ? (a[selectedStat] as number) : 0
        const bValue = typeof b[selectedStat] === "number" ? (b[selectedStat] as number) : 0
        return bValue - aValue
      })
    : []

  return (
    <div>
      <Tabs defaultValue="players" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex w-auto min-w-full md:w-full">
            <TabsTrigger value="players" className="flex-1">
              Player Stats
            </TabsTrigger>
            <TabsTrigger value="team" className="flex-1">
              Team Stats
            </TabsTrigger>
            <TabsTrigger value="charts" className="flex-1">
              Charts
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="players" className="mt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h3 className="text-lg font-medium">Player Statistics</h3>
            <Select value={selectedStat} onValueChange={setSelectedStat}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select stat" />
              </SelectTrigger>
              <SelectContent>
                {statOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead className="hidden sm:table-cell">Rebounds</TableHead>
                  <TableHead className="hidden sm:table-cell">Assists</TableHead>
                  <TableHead className="hidden md:table-cell">Steals</TableHead>
                  <TableHead className="hidden md:table-cell">Blocks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPlayers && sortedPlayers.length > 0 ? (
                  sortedPlayers.map((player, index) => (
                    <TableRow key={player.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{player.name}</TableCell>
                      <TableCell className={selectedStat === "points" ? "font-bold" : ""}>
                        {player.points.toFixed(1)}
                      </TableCell>
                      <TableCell className={`hidden sm:table-cell ${selectedStat === "rebounds" ? "font-bold" : ""}`}>
                        {player.rebounds.toFixed(1)}
                      </TableCell>
                      <TableCell className={`hidden sm:table-cell ${selectedStat === "assists" ? "font-bold" : ""}`}>
                        {player.assists.toFixed(1)}
                      </TableCell>
                      <TableCell className={`hidden md:table-cell ${selectedStat === "steals" ? "font-bold" : ""}`}>
                        {player.steals.toFixed(1)}
                      </TableCell>
                      <TableCell className={`hidden md:table-cell ${selectedStat === "blocks" ? "font-bold" : ""}`}>
                        {player.blocks.toFixed(1)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No player statistics available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Last 5 games results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Game</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>Opponent</TableHead>
                        <TableHead>Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamPerformance && teamPerformance.length > 0 ? (
                        teamPerformance.map((game, index) => (
                          <TableRow key={index}>
                            <TableCell>{game.game}</TableCell>
                            <TableCell>{game.points}</TableCell>
                            <TableCell>{game.opponentPoints}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  game.points > game.opponentPoints
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {game.points > game.opponentPoints ? "W" : "L"}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6">
                            No team performance data available.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Averages</CardTitle>
                <CardDescription>Season statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Points Per Game</p>
                      <p className="text-2xl font-bold">108.0</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Rebounds Per Game</p>
                      <p className="text-2xl font-bold">40.2</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Assists Per Game</p>
                      <p className="text-2xl font-bold">23.4</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Steals Per Game</p>
                      <p className="text-2xl font-bold">7.8</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Win-Loss Record</h4>
                    <div className="flex items-center">
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">12-8</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="charts" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Shooting Percentages</CardTitle>
                <CardDescription>Team vs. League Average</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 sm:h-80">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={shootingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={(props) => <ShootingTooltip {...props} />} />
                        <Legend />
                        <Bar dataKey="team" name="Team" fill="#3b82f6" />
                        <Bar dataKey="league" name="League Avg" fill="#9ca3af" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Game-by-Game Performance</CardTitle>
                <CardDescription>Last 5 games</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 sm:h-80">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={gameByGameData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="game" />
                        <YAxis />
                        <ChartTooltip content={(props) => <GamePerformanceTooltip {...props} />} />
                        <Legend />
                        <Line type="monotone" dataKey="points" name="Points" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="rebounds" name="Rebounds" stroke="#10b981" strokeWidth={2} />
                        <Line type="monotone" dataKey="assists" name="Assists" stroke="#f59e0b" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

