"use client"

import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import { MainNav } from "@/components/main-nav"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link href="/" className="text-xl font-bold">
            Team Manager
          </Link>
        </div>
        <MainNav />
      </div>
    </header>
  )
}

