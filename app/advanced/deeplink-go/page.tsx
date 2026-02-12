"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function DeepLinkGoPage() {
  const [app, setApp] = useState("")
  const [ios, setIos] = useState("")
  const [android, setAndroid] = useState("")
  const [web, setWeb] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setApp(params.get("app") || "")
    setIos(params.get("ios") || "")
    setAndroid(params.get("android") || "")
    setWeb(params.get("web") || "")
  }, [])

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(ua)
    const isAndroid = /android/.test(ua)

    if (app) {
      window.location.href = app
    }

    const timer = setTimeout(() => {
      if (isIOS && ios) {
        window.location.replace(ios)
        return
      }
      if (isAndroid && android) {
        window.location.replace(android)
        return
      }
      if (web) {
        window.location.replace(web)
      }
    }, 900)

    return () => clearTimeout(timer)
  }, [app, ios, android, web])

  return (
    <main className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-2xl border border-border/50 bg-card p-6 text-center space-y-3">
        <h1 className="text-xl font-semibold text-foreground">Opening app...</h1>
        <p className="text-sm text-muted-foreground">If the app is not installed, fallback link will open automatically.</p>
        <Link href="/advanced/deeplink" className="text-sm underline text-muted-foreground">
          Configure Smart Deep Link
        </Link>
      </div>
    </main>
  )
}
