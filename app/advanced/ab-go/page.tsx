"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function ABGoPage() {
  const [urlA, setUrlA] = useState("")
  const [urlB, setUrlB] = useState("")
  const [ratio, setRatio] = useState(50)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setUrlA(params.get("a") || "")
    setUrlB(params.get("b") || "")
    setRatio(Number(params.get("r") || "50"))
  }, [])

  useEffect(() => {
    if (!urlA || !urlB) return
    const randomValue = Math.random() * 100
    const destination = randomValue < ratio ? urlA : urlB
    window.location.replace(destination)
  }, [urlA, urlB, ratio])

  return (
    <main className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-2xl border border-border/50 bg-card p-6 text-center space-y-3">
        <h1 className="text-xl font-semibold text-foreground">Routing...</h1>
        <p className="text-sm text-muted-foreground">Missing A/B configuration for this QR code.</p>
        <Link href="/advanced/ab" className="text-sm underline text-muted-foreground">
          Configure A/B Routing
        </Link>
      </div>
    </main>
  )
}
