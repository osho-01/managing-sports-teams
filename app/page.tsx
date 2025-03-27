"use client"

import { useState } from "react"
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
import { SchedulePracticeDialog, type Practice } from "@/components/schedule-practice-dialog"
import { AddEquipmentDialog, type Equipment } from "@/components/add-equipment-dialog"
import { NewMessageDialog } from "@/components/new-message-dialog"
import { PerformanceReports } from "@/components/performance-reports"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { CalendarIcon, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const { toast } = useToast()
  const [practiceDialogOpen, setPracticeDialogOpen] = useState(false)
  const [equipmentDialogOpen, setEquipmentDialogOpen] = useState(false)
  const [messageDialogOpen, setMessageDialogOpen] = useState(false)
  const [showReports, setShowReports] = useState(false)
  const [practices, setPractices] = useState<Practice[]>([])
  const [equipment, setEquipment] = useState<Equipment[]>([])

  const handleSchedulePractice = () => {
    setPracticeDialogOpen(true)
  }

  const handlePracticeScheduled = (practice: Practice) => {
    setPractices([...practices, practice])
  }

  const handleAddEquipment = () => {
    setEquipmentDialogOpen(true)
  }

  const handleEquipmentAdded = (newEquipment: Equipment) => {
    setEquipment([...equipment, newEquipment])
  }

  const handleNewMessage = () => {
    setMessageDialogOpen(true)
  }

  const handleViewReports = () => {
    setShowReports(true)
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "New":
        return "bg-green-100 text-green-800"
      case "Good":
        return "bg-blue-100 text-blue-800"
      case "Fair":
        return "bg-yellow-100 text-yellow-800"
      case "Poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
                <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <CardTitle>Practice Sessions</CardTitle>
                    <CardDescription>Manage practice schedules and drills.</CardDescription>
                  </div>
                  <Button onClick={handleSchedulePractice}>Schedule Practice</Button>
                </CardHeader>
                <CardContent>
                  {practices.length > 0 ? (
                    <div className="overflow-x-auto border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="min-w-[150px]">Date</TableHead>
                            <TableHead className="min-w-[150px]">Time</TableHead>
                            <TableHead className="min-w-[150px]">Location</TableHead>
                            <TableHead className="min-w-[100px]">Type</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {practices.map((practice) => (
                            <TableRow key={practice.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                  {format(practice.date, "MMM d, yyyy")}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  {practice.startTime} - {practice.endTime}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  {practice.location}
                                </div>
                              </TableCell>
                              <TableCell>{practice.type}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8 md:py-12">
                      <h3 className="text-lg font-medium">No upcoming practices</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Schedule a new practice session to get started.
                      </p>
                      <Button className="mt-4" onClick={handleSchedulePractice} size="lg">
                        Schedule Practice
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="equipment">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <CardTitle>Equipment Inventory</CardTitle>
                    <CardDescription>Track team equipment and assignments.</CardDescription>
                  </div>
                  <Button onClick={handleAddEquipment}>Add Equipment</Button>
                </CardHeader>
                <CardContent>
                  {equipment.length > 0 ? (
                    <div className="overflow-x-auto border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="min-w-[200px]">Equipment</TableHead>
                            <TableHead className="min-w-[100px]">Category</TableHead>
                            <TableHead className="min-w-[100px]">Quantity</TableHead>
                            <TableHead className="min-w-[100px]">Condition</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {equipment.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell>{item.category}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>
                                <Badge className={getConditionColor(item.condition)}>{item.condition}</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8 md:py-12">
                      <Package className="h-10 w-10 md:h-12 md:w-12 mx-auto text-muted-foreground" />
                      <h3 className="text-lg font-medium mt-4">Equipment tracking</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Add equipment items to start tracking inventory.
                      </p>
                      <Button className="mt-4" onClick={handleAddEquipment} size="lg">
                        Add Equipment
                      </Button>
                    </div>
                  )}
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
                    <Button className="mt-4" onClick={handleNewMessage} size="lg">
                      New Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics">
              {!showReports ? (
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
                      <Button className="mt-4" onClick={handleViewReports} size="lg">
                        View Reports
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <PerformanceReports onClose={() => setShowReports(false)} />
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SchedulePracticeDialog
        open={practiceDialogOpen}
        onOpenChange={setPracticeDialogOpen}
        onPracticeScheduled={handlePracticeScheduled}
      />

      <AddEquipmentDialog
        open={equipmentDialogOpen}
        onOpenChange={setEquipmentDialogOpen}
        onEquipmentAdded={handleEquipmentAdded}
      />

      <NewMessageDialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen} />
    </div>
  )
}

