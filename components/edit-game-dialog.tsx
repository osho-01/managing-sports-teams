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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const gameFormSchema = z.object({
  opponent: z.string().min(2, { message: "Opponent name must be at least 2 characters." }),
  date: z.date({ required_error: "Please select a date." }),
  location: z.string().min(1, { message: "Please select a location." }),
  result: z.string().min(1, { message: "Please select a result." }),
  score: z.string().min(1, { message: "Please enter the score." }),
})

type GameFormValues = z.infer<typeof gameFormSchema>

// Mock data - in a real app, you would fetch this from your API
const games = [
  { id: 1, opponent: "Tigers", date: "2023-10-15", location: "Home", result: "Win", score: "3-1" },
  { id: 2, opponent: "Lions", date: "2023-10-22", location: "Away", result: "Loss", score: "1-2" },
  { id: 3, opponent: "Eagles", date: "2023-10-29", location: "Home", result: "Win", score: "2-0" },
  { id: 4, opponent: "Bears", date: "2023-11-05", location: "Away", result: "Win", score: "4-2" },
  { id: 5, opponent: "Wolves", date: "2023-11-12", location: "Home", result: "Win", score: "2-1" },
]

export function EditGameDialog({
  gameId,
  open,
  onOpenChange,
}: {
  gameId: number
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  // Find the game data
  const gameData = games.find((game) => game.id === gameId) || {
    opponent: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
    result: "",
    score: "",
  }

  const form = useForm<GameFormValues>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: {
      opponent: gameData.opponent,
      date: gameData ? new Date(gameData.date) : new Date(),
      location: gameData.location,
      result: gameData.result,
      score: gameData.score,
    },
  })

  const onSubmit = (data: GameFormValues) => {
    // Here you would typically update the data in your backend
    console.log(data)
    toast.success("Game updated successfully", {
      description: `Game against ${data.opponent} has been updated.`,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Game</DialogTitle>
          <DialogDescription>Update the game information.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="opponent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opponent</FormLabel>
                  <FormControl>
                    <Input placeholder="Tigers" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Away">Away</SelectItem>
                      <SelectItem value="Neutral">Neutral</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="result"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Result</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a result" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Win">Win</SelectItem>
                      <SelectItem value="Loss">Loss</SelectItem>
                      <SelectItem value="Draw">Draw</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Score</FormLabel>
                  <FormControl>
                    <Input placeholder="3-1" {...field} />
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

