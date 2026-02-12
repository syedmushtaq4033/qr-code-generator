"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface TeamData {
  projectName: string
  destination: string
  notes: string
  createdAt: string
}

export default function TeamViewPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setData(params.get("data") || "")
  }, [])

  let parsed: TeamData | null = null
  try {
    if (data) {
      parsed = JSON.parse(decodeURIComponent(escape(atob(data))))
    }
  } catch {
    parsed = null
  }

  return (
    <main className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-2xl border border-border/50 bg-card p-6 space-y-4">
        {!parsed && <p className="text-sm text-muted-foreground">Invalid or missing team share data.</p>}
        {parsed && (
          <>
            <h1 className="text-xl font-semibold text-foreground">{parsed.projectName || "Shared Project"}</h1>
            <p className="text-sm text-muted-foreground break-all">{parsed.destination}</p>
            {parsed.notes && <p className="text-sm text-foreground">{parsed.notes}</p>}
            <a href={parsed.destination} className="block text-center h-10 leading-10 rounded-md bg-primary text-primary-foreground text-sm font-medium">
              Open Destination
            </a>
          </>
        )}
        <Link href="/advanced/team" className="text-sm underline text-muted-foreground">
          Create Team Share Link
        </Link>
      </div>
    </main>
  )
}
