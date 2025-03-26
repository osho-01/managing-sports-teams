"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const playerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  position: z.string().min(1, { message: "Please select a position." }),
  age: z.coerce
    .number()
    .int()
    .min(16, { message: "Player must be at least 16 years old." })
    .max(50, { message: "Player must be under 50 years old." }),
  jerseyNumber: z.coerce
    .number()
    .int()
    .min(1, { message: "Jersey number must be at least 1." })
    .max(99, { message: "Jersey number must be under 100." }),
})

type PlayerFormValues = z.infer<typeof playerFormSchema>

// Mock data - in a real app, you would fetch this from your API
const players = [
  { id: 1, name: "John Doe", position: "Forward", age: 24, jerseyNumber: 10 },
  { id: 2, name: "Jane Smith", position: "Midfielder", age: 22, jerseyNumber: 8 },
  { id: 3, name: "Mike Johnson", position: "Defender", age: 26, jerseyNumber: 4 },
  { id: 4, name: "Sarah Williams", position: "Goalkeeper", age: 25, jerseyNumber: 1 },
  { id: 5, name: "David Brown", position: "Forward", age: 23, jerseyNumber: 9 },
]

export function EditPlayerDialog({
  playerId,
  open,
  onOpenChange,
}: {
  playerId: number
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  // Find the player data
  const playerData = players.find((player) => player.id === playerId) || {
    name: "",
    position: "",
    age: 0,
    jerseyNumber: 0,
  }

  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: {
      name: playerData.name,
      position: playerData.position,
      age: playerData.age,
      jerseyNumber: playerData.jerseyNumber,
    },
  })

  const onSubmit = (data: PlayerFormValues) => {
    // Here you would typically update the data in your backend
    console.log(data)
    toast.success("Player updated successfully", {
      description: `${data.name}'s information has been updated.`,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Player</DialogTitle>
          <DialogDescription>Update the player's information.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a position" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Forward">Forward</SelectItem>
                      <SelectItem value="Midfielder">Midfielder</SelectItem>
                      <SelectItem value="Defender">Defender</SelectItem>
                      <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="25"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value === "" ? "0" : e.target.value
                        field.onChange(value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jerseyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jersey Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="10"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value === "" ? "0" : e.target.value
                        field.onChange(value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

