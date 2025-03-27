"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { Package, Pencil, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { AddEquipmentDialog, type Equipment } from "@/components/add-equipment-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export default function EquipmentPage() {
  const { toast } = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [equipment, setEquipment] = useState<Equipment[]>([])

  const handleAddEquipment = () => {
    setDialogOpen(true)
  }

  const handleEquipmentAdded = (newEquipment: Equipment) => {
    setEquipment([...equipment, newEquipment])
  }

  const handleDeleteEquipment = (id: string) => {
    setEquipment(equipment.filter((item) => item.id !== id))
    toast({
      title: "Equipment Removed",
      description: "The equipment has been removed from inventory.",
      duration: 3000,
    })
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
        <div className="container py-4 md:py-6">
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
                        <TableHead className="hidden md:table-cell min-w-[150px]">Date Added</TableHead>
                        <TableHead className="text-right min-w-[100px]">Actions</TableHead>
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
                          <TableCell className="hidden md:table-cell">
                            {format(item.addedDate, "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteEquipment(item.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
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
                  <p className="text-sm text-muted-foreground mt-1">Add equipment items to start tracking inventory.</p>
                  <Button className="mt-4" onClick={handleAddEquipment} size="lg">
                    Add Equipment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <AddEquipmentDialog open={dialogOpen} onOpenChange={setDialogOpen} onEquipmentAdded={handleEquipmentAdded} />
    </div>
  )
}

