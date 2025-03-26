"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

export default function AnalysisPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Performance Analysis</h1>
          <p className="text-muted-foreground">Analyze team and player performance metrics.</p>
        </div>
        <Button
          onClick={() =>
            toast.success("Report generated", {
              description: "The analysis report has been generated successfully.",
            })
          }
        >
          Generate Report
        </Button>
      </div>

      <Tabs defaultValue="team" className="space-y-4">
        <TabsList>
          <TabsTrigger value="team">Team Analysis</TabsTrigger>
          <TabsTrigger value="players">Player Analysis</TabsTrigger>
          <TabsTrigger value="opponents">Opponent Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Possession</CardTitle>
                <CardDescription>Average possession percentage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Average</span>
                  <span className="font-medium">58%</span>
                </div>
                <Progress value={58} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Passing Accuracy</CardTitle>
                <CardDescription>Team passing completion rate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Average</span>
                  <span className="font-medium">82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shots on Target</CardTitle>
                <CardDescription>Percentage of shots on target</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Average</span>
                  <span className="font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Defensive Success</CardTitle>
                <CardDescription>Tackles and interceptions success rate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Average</span>
                  <span className="font-medium">67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="players" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Player Performance Metrics</CardTitle>
              <CardDescription>Individual player analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">John Doe - Forward</h3>
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <span>Goals per Game</span>
                    <span>0.8</span>
                  </div>
                  <Progress value={80} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Shot Accuracy</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Pass Completion</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Jane Smith - Midfielder</h3>
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <span>Assists per Game</span>
                    <span>1.1</span>
                  </div>
                  <Progress value={85} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Pass Completion</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Distance Covered</span>
                    <span>11.2 km</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opponents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Opponent: Tigers</CardTitle>
              <CardDescription>Analysis of next opponent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-medium">Formation</h3>
                  <p>4-3-3 with high pressing</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Key Player</h3>
                  <p>Michael Roberts (Midfielder)</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Strengths</h3>
                  <p>Counter-attacks, set pieces</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Weaknesses</h3>
                  <p>Defensive transitions, aerial duels</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Recent Form</h3>
                <div className="flex gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    W
                  </span>
                  <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    W
                  </span>
                  <span className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">L</span>
                  <span className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                    D
                  </span>
                  <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    W
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

