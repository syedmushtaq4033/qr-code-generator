"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SITE_BASE_URL } from "@/lib/site-url"
import { Smartphone } from "lucide-react"

export default function DeepLinkPage() {
  const [appScheme, setAppScheme] = useState("")
  const [iosStore, setIosStore] = useState("")
  const [androidStore, setAndroidStore] = useState("")
  const [webFallback, setWebFallback] = useState("")

  const qrValue =
    appScheme || iosStore || androidStore || webFallback
      ? `${SITE_BASE_URL}/advanced/deeplink-go?app=${encodeURIComponent(appScheme)}&ios=${encodeURIComponent(iosStore)}&android=${encodeURIComponent(androidStore)}&web=${encodeURIComponent(webFallback)}`
      : ""

  return (
    <GeneratorLayout
      title="Smart Deep Link QR"
      description="Try app link first, then fallback to store or web"
      color="#1D4ED8"
      icon={<Smartphone className="w-full h-full" />}
    >
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Deep Link Setup</h2>
        <div className="space-y-2">
          <Label htmlFor="appScheme">App Scheme URL</Label>
          <Input id="appScheme" placeholder="myapp://open/home" value={appScheme} onChange={(e) => setAppScheme(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="iosStore">iOS Store URL</Label>
          <Input id="iosStore" placeholder="https://apps.apple.com/app/..." value={iosStore} onChange={(e) => setIosStore(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="androidStore">Android Store URL</Label>
          <Input id="androidStore" placeholder="https://play.google.com/store/apps/..." value={androidStore} onChange={(e) => setAndroidStore(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="webFallback">Web Fallback URL</Label>
          <Input id="webFallback" placeholder="https://example.com/download" value={webFallback} onChange={(e) => setWebFallback(e.target.value)} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={qrValue} type="deeplink" />
      </div>
    </GeneratorLayout>
  )
}
