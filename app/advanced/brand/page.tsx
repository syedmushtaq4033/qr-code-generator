"use client"

import { useEffect, useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Palette } from "lucide-react"

interface BrandPreset {
  name: string
  color: string
  logoUrl: string
}

export default function BrandKitPage() {
  const [name, setName] = useState("")
  const [color, setColor] = useState("#4F46E5")
  const [logoUrl, setLogoUrl] = useState("")
  const [targetUrl, setTargetUrl] = useState("")
  const [presets, setPresets] = useState<BrandPreset[]>([])

  useEffect(() => {
    const raw = localStorage.getItem("brand_presets")
    setPresets(raw ? JSON.parse(raw) : [])
  }, [])

  const savePreset = () => {
    if (!name) return
    const next = [...presets, { name, color, logoUrl }]
    setPresets(next)
    localStorage.setItem("brand_presets", JSON.stringify(next))
  }

  return (
    <GeneratorLayout
      title="Brand Kit Presets"
      description="Save reusable branding setup for faster daily QR creation"
      color="#A855F7"
      icon={<Palette className="w-full h-full" />}
    >
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Brand Preset</h2>
        <div className="space-y-2">
          <Label htmlFor="name">Preset Name</Label>
          <Input id="name" placeholder="Mushtaq Brand" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">Primary Color</Label>
          <Input id="color" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-12 p-2" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="logoUrl">Logo URL (Optional)</Label>
          <Input id="logoUrl" placeholder="https://example.com/logo.png" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="targetUrl">Preview URL</Label>
          <Input id="targetUrl" placeholder="https://example.com" value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)} />
        </div>
        <button type="button" onClick={savePreset} className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">
          Save Preset
        </button>
        <div className="space-y-1 text-xs text-muted-foreground">
          {presets.map((preset, idx) => (
            <p key={`${preset.name}-${idx}`}>{preset.name} - {preset.color}</p>
          ))}
          {presets.length === 0 && <p>No presets saved yet.</p>}
        </div>
      </div>

      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={targetUrl} type="brand" />
      </div>
    </GeneratorLayout>
  )
}
