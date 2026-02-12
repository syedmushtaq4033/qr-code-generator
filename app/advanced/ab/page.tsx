"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SITE_BASE_URL } from "@/lib/site-url"
import { Shuffle } from "lucide-react"

export default function ABRoutingPage() {
  const [urlA, setUrlA] = useState("")
  const [urlB, setUrlB] = useState("")
  const [ratioA, setRatioA] = useState("50")

  const qrValue =
    urlA && urlB
      ? `${SITE_BASE_URL}/advanced/ab-go?a=${encodeURIComponent(urlA)}&b=${encodeURIComponent(urlB)}&r=${encodeURIComponent(ratioA)}`
      : ""

  return (
    <GeneratorLayout
      title="A/B Routing QR"
      description="Split traffic between two pages using a single QR code"
      color="#14B8A6"
      icon={<Shuffle className="w-full h-full" />}
    >
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-foreground">A/B Setup</h2>
        <div className="space-y-2">
          <Label htmlFor="urlA">URL A</Label>
          <Input id="urlA" placeholder="https://example.com/version-a" value={urlA} onChange={(e) => setUrlA(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="urlB">URL B</Label>
          <Input id="urlB" placeholder="https://example.com/version-b" value={urlB} onChange={(e) => setUrlB(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ratioA">Traffic to A (%)</Label>
          <Input id="ratioA" type="number" min="1" max="99" value={ratioA} onChange={(e) => setRatioA(e.target.value)} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={qrValue} type="abtest" />
      </div>
    </GeneratorLayout>
  )
}
