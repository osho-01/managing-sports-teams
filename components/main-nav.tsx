"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
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
    <nav className={`hidden md:flex gap-6 ${className}`}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            pathname === route.href ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

