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

export function AddPlayerDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: {
      name: "",
      position: "",
      age: 0,
      jerseyNumber: 0,
    },
  })

  const onSubmit = (data: PlayerFormValues) => {
    // Here you would typically save the data to your backend
    console.log(data)
    toast.success("Player added successfully", {
      description: `${data.name} has been added to the team.`,
    })
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Player</DialogTitle>
          <DialogDescription>Enter the details of the new player to add them to the team.</DialogDescription>
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
              <Button type="submit">Add Player</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

