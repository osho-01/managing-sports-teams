"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"
import { Download, Printer } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Sample data for reports
const monthlyPerformance = [
  { month: "Jan", points: 102, assists: 21, rebounds: 38 },
  { month: "Feb", points: 108, assists: 24, rebounds: 42 },
  { month: "Mar", points: 112, assists: 26, rebounds: 45 },
  { month: "Apr", points: 105, assists: 23, rebounds: 40 },
  { month: "May", points: 118, assists: 28, rebounds: 47 },
]

const playerContribution = [
  { name: "Michael", value: 28 },
  { name: "LeBron", value: 25 },
  { name: "Stephen", value: 22 },
  { name: "Kevin", value: 18 },
  { name: "Giannis", value: 7 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

interface PerformanceReportsProps {
  onClose: () => void
}

export function PerformanceReports({ onClose }: PerformanceReportsProps) {
  const [reportType, setReportType] = useState("monthly")
  const [timeframe, setTimeframe] = useState("season")
  const [isDownloading, setIsDownloading] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const handleDownload = () => {
    setIsDownloading(true)

    // Simulate download process
    setTimeout(() => {
      const reportTitle = `${reportType}_performance_report_${timeframe}_${new Date().toISOString().split("T")[0]}.pdf`

      // Create a fake download link
      const link = document.createElement("a")
      link.download = reportTitle
      link.href = "#"
      link.click()

      setIsDownloading(false)

      toast({
        title: "Report Downloaded",
        description: `Performance report "${reportTitle}" has been downloaded`,
        duration: 3000,
      })
    }, 1500)
  }

  const handlePrint = () => {
    setIsPrinting(true)

    // Simulate print process
    setTimeout(() => {
      if (reportRef.current) {
        // In a real app, you would use a library like react-to-print
        // For this demo, we'll just simulate printing
        window.print()
      }

      setIsPrinting(false)

      toast({
        title: "Report Printed",
        description: "Performance report has been sent to printer",
        duration: 3000,
      })
    }, 1500)
  }

  return (
    <div className="space-y-4" ref={reportRef}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Performance Reports</h2>
          <p className="text-muted-foreground">Analyze team and player performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} disabled={isPrinting}>
            <Printer className="h-4 w-4 mr-2" />
            {isPrinting ? "Printing..." : "Print"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} disabled={isDownloading}>
            <Download className="h-4 w-4 mr-2" />
            {isDownloading ? "Downloading..." : "Download"}
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-48">
          <Label htmlFor="reportType">Report Type</Label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger id="reportType">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly Performance</SelectItem>
              <SelectItem value="player">Player Contribution</SelectItem>
              <SelectItem value="comparison">Team Comparison</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-48">
          <Label htmlFor="timeframe">Timeframe</Label>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger id="timeframe">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="season">Current Season</SelectItem>
              <SelectItem value="year">Last 12 Months</SelectItem>
              <SelectItem value="quarter">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="charts" className="w-full">
        <TabsList>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {reportType === "monthly"
                  ? "Monthly Performance Metrics"
                  : reportType === "player"
                    ? "Player Scoring Contribution"
                    : "Team Comparison"}
              </CardTitle>
              <CardDescription>
                {timeframe === "season" ? "Current Season" : timeframe === "year" ? "Last 12 Months" : "Last 3 Months"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    {reportType === "monthly" ? (
                      <LineChart data={monthlyPerformance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="points" stroke="#8884d8" name="Points" />
                        <Line type="monotone" dataKey="assists" stroke="#82ca9d" name="Assists" />
                        <Line type="monotone" dataKey="rebounds" stroke="#ffc658" name="Rebounds" />
                      </LineChart>
                    ) : reportType === "player" ? (
                      <PieChart>
                        <Pie
                          data={playerContribution}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {playerContribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    ) : (
                      <BarChart
                        data={[
                          { name: "Points", us: 108, opponent: 102 },
                          { name: "Rebounds", us: 42, opponent: 38 },
                          { name: "Assists", us: 24, opponent: 20 },
                          { name: "Steals", us: 8, opponent: 6 },
                          { name: "Blocks", us: 5, opponent: 3 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="us" fill="#8884d8" name="Our Team" />
                        <Bar dataKey="opponent" fill="#82ca9d" name="Opponents" />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">108.2</div>
                <p className="text-xs text-muted-foreground">+3.5% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">+5% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Efficiency Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">112.4</div>
                <p className="text-xs text-muted-foreground">+2.1% from previous period</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="summary" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">Performance Summary</h3>
              <p className="mb-4">
                The team has shown consistent improvement over the{" "}
                {timeframe === "season" ? "current season" : timeframe === "year" ? "past 12 months" : "past 3 months"},
                with notable increases in scoring efficiency and defensive metrics. Key highlights include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Average points per game increased by 3.5% to 108.2</li>
                <li>Defensive rebounds improved by 7.2%</li>
                <li>Assist-to-turnover ratio increased to 2.1 (from 1.8)</li>
                <li>Three-point shooting percentage up to 36.5% (from 34.2%)</li>
                <li>Win rate improved to 68% (from 63%)</li>
              </ul>
              <p>
                Player development has been strong, with 5 players showing significant statistical improvements. The
                team's offensive efficiency rating of 112.4 ranks in the top quartile of the league.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Detailed Performance Metrics</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Metric</th>
                      <th className="text-right py-2 px-4">Current</th>
                      <th className="text-right py-2 px-4">Previous</th>
                      <th className="text-right py-2 px-4">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4">Points Per Game</td>
                      <td className="text-right py-2 px-4">108.2</td>
                      <td className="text-right py-2 px-4">104.5</td>
                      <td className="text-right py-2 px-4 text-green-600">+3.5%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Field Goal %</td>
                      <td className="text-right py-2 px-4">46.8%</td>
                      <td className="text-right py-2 px-4">45.2%</td>
                      <td className="text-right py-2 px-4 text-green-600">+1.6%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">3-Point %</td>
                      <td className="text-right py-2 px-4">36.5%</td>
                      <td className="text-right py-2 px-4">34.2%</td>
                      <td className="text-right py-2 px-4 text-green-600">+2.3%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Free Throw %</td>
                      <td className="text-right py-2 px-4">78.4%</td>
                      <td className="text-right py-2 px-4">76.9%</td>
                      <td className="text-right py-2 px-4 text-green-600">+1.5%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Rebounds</td>
                      <td className="text-right py-2 px-4">42.3</td>
                      <td className="text-right py-2 px-4">39.8</td>
                      <td className="text-right py-2 px-4 text-green-600">+6.3%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Assists</td>
                      <td className="text-right py-2 px-4">24.6</td>
                      <td className="text-right py-2 px-4">22.8</td>
                      <td className="text-right py-2 px-4 text-green-600">+7.9%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Steals</td>
                      <td className="text-right py-2 px-4">8.2</td>
                      <td className="text-right py-2 px-4">7.5</td>
                      <td className="text-right py-2 px-4 text-green-600">+9.3%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Blocks</td>
                      <td className="text-right py-2 px-4">5.4</td>
                      <td className="text-right py-2 px-4">4.9</td>
                      <td className="text-right py-2 px-4 text-green-600">+10.2%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Turnovers</td>
                      <td className="text-right py-2 px-4">11.7</td>
                      <td className="text-right py-2 px-4">12.6</td>
                      <td className="text-right py-2 px-4 text-green-600">-7.1%</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">Win Rate</td>
                      <td className="text-right py-2 px-4">68%</td>
                      <td className="text-right py-2 px-4">63%</td>
                      <td className="text-right py-2 px-4 text-green-600">+5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium mb-1 block">
      {children}
    </label>
  )
}

