"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface LinkItem {
  label: string
  url: string
}

export default function MultiLinkViewPage() {
  const [title, setTitle] = useState("My Links")
  const [links, setLinks] = useState<LinkItem[]>([])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setTitle(searchParams.get("title") || "My Links")
    const parsedLinks: LinkItem[] = [1, 2, 3, 4]
      .map((index) => ({
        label: searchParams.get(`t${index}`) || `Link ${index}`,
        url: searchParams.get(`l${index}`) || "",
      }))
      .filter((item) => item.url)
    setLinks(parsedLinks)
  }, [])

  return (
    <main className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-card border border-border/50 rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground text-center">
          Choose a link below
        </p>

        <div className="flex flex-col gap-3">
          {links.map((item, idx) => (
            <a
              key={`${item.label}-${idx}`}
              href={item.url}
              className="px-4 py-3 rounded-xl bg-primary text-primary-foreground text-center font-medium"
            >
              {item.label}
            </a>
          ))}
          {links.length === 0 && (
            <p className="text-sm text-muted-foreground text-center">
              No links found in this QR code.
            </p>
          )}
        </div>

        <div className="text-center pt-2">
          <Link href="/" className="text-sm text-muted-foreground underline">
            Create your own QR code
          </Link>
        </div>
      </div>
    </main>
  )
}
