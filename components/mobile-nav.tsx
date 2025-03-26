"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    { href: "/", label: "Dashboard" },
    { href: "/players", label: "Players" },
    { href: "/games", label: "Games" },
    { href: "/stats", label: "Statistics" },
    { href: "/practices", label: "Practices" },
    { href: "/equipment", label: "Equipment" },
    { href: "/communication", label: "Communication" },
    { href: "/analytics", label: "Analytics" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="mb-6">
          <SheetTitle>Team Manager</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-base font-medium transition-colors hover:text-primary ${
                pathname === route.href ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setOpen(false)}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

