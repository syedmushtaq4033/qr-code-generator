"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { AppStoreIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SITE_BASE_URL } from "@/lib/site-url"

export default function AppStoreGeneratorPage() {
  const [iosUrl, setIosUrl] = useState("")
  const [androidUrl, setAndroidUrl] = useState("")
  const [fallbackUrl, setFallbackUrl] = useState("")

  const getAppStoreUrl = () => {
    if (!iosUrl && !androidUrl && !fallbackUrl) return ""

    if (iosUrl && !androidUrl && !fallbackUrl) return iosUrl
    if (!iosUrl && androidUrl && !fallbackUrl) return androidUrl
    if (!iosUrl && !androidUrl && fallbackUrl) return fallbackUrl

    const params = new URLSearchParams()
    if (iosUrl) params.set("ios", iosUrl)
    if (androidUrl) params.set("android", androidUrl)
    if (fallbackUrl) params.set("fallback", fallbackUrl)
    return `${SITE_BASE_URL}/appstore-redirect?${params.toString()}`
  }

  const appStoreValue = getAppStoreUrl()

  return (
    <GeneratorLayout
      title="App Download QR Code"
      description="Share one QR that routes users to the right app link"
      color="#334155"
      icon={<AppStoreIcon className="w-full h-full" />}
    >
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">App Links</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="iosUrl" className="text-foreground">iOS App Store URL (Optional)</Label>
            <Input
              id="iosUrl"
              type="url"
              placeholder="https://apps.apple.com/app/..."
              value={iosUrl}
              onChange={(e) => setIosUrl(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="androidUrl" className="text-foreground">Android Play Store URL (Optional)</Label>
            <Input
              id="androidUrl"
              type="url"
              placeholder="https://play.google.com/store/apps/details?id=..."
              value={androidUrl}
              onChange={(e) => setAndroidUrl(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fallbackUrl" className="text-foreground">Fallback URL (Optional)</Label>
            <Input
              id="fallbackUrl"
              type="url"
              placeholder="https://yourwebsite.com/download"
              value={fallbackUrl}
              onChange={(e) => setFallbackUrl(e.target.value)}
              className="text-base"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={appStoreValue} type="appstore" />
      </div>
    </GeneratorLayout>
  )
}
