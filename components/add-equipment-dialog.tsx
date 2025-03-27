"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export interface Equipment {
  id: string
  name: string
  category: string
  quantity: number
  condition: string
  addedDate: Date
}

interface AddEquipmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onEquipmentAdded: (equipment: Equipment) => void
}

export function AddEquipmentDialog({ open, onOpenChange, onEquipmentAdded }: AddEquipmentDialogProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("Balls")
  const [quantity, setQuantity] = useState("1")
  const [condition, setCondition] = useState("New")

  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create a new equipment object
    const newEquipment: Equipment = {
      id: Date.now().toString(),
      name,
      category,
      quantity: Number.parseInt(quantity),
      condition,
      addedDate: new Date(),
    }

    // Pass the new equipment to the parent component
    onEquipmentAdded(newEquipment)

    toast({
      title: "Equipment Added",
      description: `Added ${quantity} ${name} to inventory`,
      duration: 3000,
    })

    // Reset form fields
    setName("")
    setQuantity("1")

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Equipment</DialogTitle>
          <DialogDescription>Add new equipment to your team's inventory.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Equipment Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter equipment name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Balls">Balls</SelectItem>
                  <SelectItem value="Uniforms">Uniforms</SelectItem>
                  <SelectItem value="Training">Training Equipment</SelectItem>
                  <SelectItem value="Medical">Medical Supplies</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="condition">Condition</Label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger id="condition">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Equipment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

