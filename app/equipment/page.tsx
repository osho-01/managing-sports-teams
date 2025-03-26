"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

// Mock data
const equipment = [
  { id: 1, name: "Training Balls", quantity: 20, status: "Good", lastChecked: "2023-11-01" },
  { id: 2, name: "Cones", quantity: 30, status: "Good", lastChecked: "2023-11-01" },
  { id: 3, name: "Bibs", quantity: 24, status: "Needs Washing", lastChecked: "2023-11-05" },
  { id: 4, name: "First Aid Kit", quantity: 2, status: "Needs Restocking", lastChecked: "2023-10-28" },
  { id: 5, name: "Water Bottles", quantity: 25, status: "Good", lastChecked: "2023-11-01" },
  { id: 6, name: "Training Goals", quantity: 4, status: "Good", lastChecked: "2023-10-25" },
]

export default function EquipmentPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good":
        return "default"
      case "Needs Washing":
        return "warning"
      case "Needs Restocking":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Equipment Management</h1>
          <p className="text-muted-foreground">Track and manage team equipment inventory.</p>
        </div>
        <Button
          onClick={() =>
            toast.success("New equipment added", {
              description: "The equipment has been added to the inventory.",
            })
          }
        >
          Add Equipment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipment.reduce((sum, item) => sum + item.quantity, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Needing Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipment.filter((item) => item.status !== "Good").length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Equipment Inventory</CardTitle>
          <CardDescription>Current status of all team equipment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Checked</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipment.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(item.status) as any}>{item.status}</Badge>
                    </TableCell>
                    <TableCell>{formatDate(item.lastChecked)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            toast.success("Status updated", {
                              description: `${item.name} status has been updated.`,
                            })
                          }
                        >
                          Update Status
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            toast.success("Equipment updated", {
                              description: `${item.name} details have been updated.`,
                            })
                          }
                        >
                          Edit
                        </Button>
                      </div>
                    </TableCell>
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

