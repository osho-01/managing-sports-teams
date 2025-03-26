"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, ClipboardList, Users, MessageSquare, ShieldAlert, BarChart3, Package } from "lucide-react"
import TeamRoster from "@/components/team-roster"
import UpcomingGames from "@/components/upcoming-games"
import AttendanceOverview from "@/components/attendance-overview"
import StatsOverview from "@/components/stats-overview"
import { useToast } from "@/components/ui/use-toast"
import { SiteHeader } from "@/components/site-header"

export default function Dashboard() {
  const { toast } = useToast()

  const handleSchedulePractice = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Practice scheduling will be available in the next update.",
    })
  }

  const handleAddEquipment = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Equipment tracking will be available in the next update.",
    })
  }

  const handleNewMessage = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Team messaging will be available in the next update.",
    })
  }

  const handleViewReports = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Performance analytics will be available in the next update.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Players</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 from last season</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Games</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Next game in 2 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Injuries</CardTitle>
                <ShieldAlert className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">-1 from last week</p>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="roster" className="space-y-4">
            <div className="overflow-x-auto pb-2">
              <TabsList className="inline-flex w-auto min-w-full md:w-full">
                <TabsTrigger value="roster" className="flex-1">
                  Roster
                </TabsTrigger>
                <TabsTrigger value="games" className="flex-1">
                  Games
                </TabsTrigger>
                <TabsTrigger value="attendance" className="flex-1">
                  Attendance
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex-1">
                  Statistics
                </TabsTrigger>
                <TabsTrigger value="practices" className="flex-1">
                  Practices
                </TabsTrigger>
                <TabsTrigger value="equipment" className="flex-1">
                  Equipment
                </TabsTrigger>
                <TabsTrigger value="communication" className="flex-1">
                  Communication
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex-1">
                  Analytics
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="roster">
              <Card>
                <CardHeader>
                  <CardTitle>Team Roster</CardTitle>
                  <CardDescription>Manage your team's players and their information.</CardDescription>
                </CardHeader>
                <CardContent>
                  <TeamRoster />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="games">
              <Card>
                <CardHeader>
                  <CardTitle>Game Schedule</CardTitle>
                  <CardDescription>View and manage upcoming and past games.</CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingGames />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Tracking</CardTitle>
                  <CardDescription>Monitor player attendance for games and practices.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AttendanceOverview />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>Team Statistics</CardTitle>
                  <CardDescription>Track and analyze team and player performance.</CardDescription>
                </CardHeader>
                <CardContent>
                  <StatsOverview />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="practices">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Sessions</CardTitle>
                  <CardDescription>Manage practice schedules and drills.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 md:py-12">
                    <h3 className="text-lg font-medium">No upcoming practices</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Schedule a new practice session to get started.
                    </p>
                    <Button className="mt-4" onClick={handleSchedulePractice}>
                      Schedule Practice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="equipment">
              <Card>
                <CardHeader>
                  <CardTitle>Equipment Inventory</CardTitle>
                  <CardDescription>Track team equipment and assignments.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 md:py-12">
                    <Package className="h-10 w-10 md:h-12 md:w-12 mx-auto text-muted-foreground" />
                    <h3 className="text-lg font-medium mt-4">Equipment tracking</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add equipment items to start tracking inventory.
                    </p>
                    <Button className="mt-4" onClick={handleAddEquipment}>
                      Add Equipment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="communication">
              <Card>
                <CardHeader>
                  <CardTitle>Team Communication</CardTitle>
                  <CardDescription>Send messages and announcements to your team.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 md:py-12">
                    <MessageSquare className="h-10 w-10 md:h-12 md:w-12 mx-auto text-muted-foreground" />
                    <h3 className="text-lg font-medium mt-4">Team messaging</h3>
                    <p className="text-sm text-muted-foreground mt-1">Send announcements or messages to your team.</p>
                    <Button className="mt-4" onClick={handleNewMessage}>
                      New Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Analyze team and player performance metrics.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 md:py-12">
                    <BarChart3 className="h-10 w-10 md:h-12 md:w-12 mx-auto text-muted-foreground" />
                    <h3 className="text-lg font-medium mt-4">Performance data</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Track and analyze performance metrics over time.
                    </p>
                    <Button className="mt-4" onClick={handleViewReports}>
                      View Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

