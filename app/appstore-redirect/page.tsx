"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function AppStoreRedirectPage() {
  const [ios, setIos] = useState("")
  const [android, setAndroid] = useState("")
  const [fallback, setFallback] = useState("")

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setIos(searchParams.get("ios") || "")
    setAndroid(searchParams.get("android") || "")
    setFallback(searchParams.get("fallback") || "")
  }, [])

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(ua)
    const isAndroid = /android/.test(ua)

    let target = fallback
    if (isIOS && ios) target = ios
    if (isAndroid && android) target = android
    if (!target && ios) target = ios
    if (!target && android) target = android

    if (target) {
      window.location.replace(target)
    }
  }, [ios, android, fallback])

  return (
    <main className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-card border border-border/50 rounded-2xl p-6 text-center space-y-4">
        <h1 className="text-xl font-semibold text-foreground">Redirecting to app store...</h1>
        <p className="text-sm text-muted-foreground">
          If automatic redirection does not happen, choose your platform below.
        </p>
        <div className="flex flex-col gap-2">
          {ios && (
            <a href={ios} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
              Open iOS App Store
            </a>
          )}
          {android && (
            <a href={android} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
              Open Google Play Store
            </a>
          )}
          {fallback && (
            <a href={fallback} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm">
              Open Fallback Link
            </a>
          )}
          <Link href="/" className="text-sm text-muted-foreground underline">
            Back to QR Generator
          </Link>
        </div>
      </div>
    </main>
  )
}
