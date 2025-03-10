import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <Link
      href={siteConfig.page.main.href}
      className="flex items-center space-x-2"
    >
      <span className="inline-block font-bold">{siteConfig.name}</span>
    </Link>
  )
}
