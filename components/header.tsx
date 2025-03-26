"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Users, Calendar, ClipboardCheck, BarChart, Dumbbell, MessageSquare, LineChart } from "lucide-react"

export default function Header() {
  const pathname = usePathname()

  const routes = [
    { name: "Home", path: "/", icon: <Home className="mr-2 h-4 w-4" /> },
    { name: "Players", path: "/players", icon: <Users className="mr-2 h-4 w-4" /> },
    { name: "Games", path: "/games", icon: <Calendar className="mr-2 h-4 w-4" /> },
    { name: "Attendance", path: "/attendance", icon: <ClipboardCheck className="mr-2 h-4 w-4" /> },
    { name: "Stats", path: "/stats", icon: <BarChart className="mr-2 h-4 w-4" /> },
    { name: "Practice", path: "/practice", icon: <Dumbbell className="mr-2 h-4 w-4" /> },
    { name: "Equipment", path: "/equipment", icon: <Dumbbell className="mr-2 h-4 w-4" /> },
    { name: "Communication", path: "/communication", icon: <MessageSquare className="mr-2 h-4 w-4" /> },
    { name: "Analysis", path: "/analysis", icon: <LineChart className="mr-2 h-4 w-4" /> },
  ]

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
            Sports Team Manager
          </Link>
          <nav className="flex flex-wrap justify-center gap-2">
            {routes.map((route) => (
              <Button key={route.path} variant={pathname === route.path ? "default" : "ghost"} size="sm" asChild>
                <Link href={route.path} className="flex items-center">
                  {route.icon}
                  {route.name}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

