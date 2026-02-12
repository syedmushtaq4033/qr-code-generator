"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { WifiIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type Encryption = "WPA" | "WEP" | "nopass"

export default function WifiGeneratorPage() {
  const [ssid, setSsid] = useState("")
  const [password, setPassword] = useState("")
  const [encryption, setEncryption] = useState<Encryption>("WPA")
  const [hidden, setHidden] = useState(false)

  const escapeWifiValue = (value: string) =>
    value.replace(/([\\;,:"])/g, "\\$1")

  const getWifiString = () => {
    if (!ssid) return ""
    const cleanSsid = escapeWifiValue(ssid)
    const cleanPassword = escapeWifiValue(password)
    const passwordPart = encryption === "nopass" ? "" : `P:${cleanPassword};`
    return `WIFI:T:${encryption};S:${cleanSsid};${passwordPart}H:${hidden ? "true" : "false"};;`
  }

  const wifiQrValue = getWifiString()

  return (
    <GeneratorLayout
      title="Wi-Fi QR Code"
      description="Let customers and guests connect to Wi-Fi in one scan"
      color="#0EA5E9"
      icon={<WifiIcon className="w-full h-full" />}
    >
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">Wi-Fi Details</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ssid" className="text-foreground">Network Name (SSID)</Label>
            <Input
              id="ssid"
              type="text"
              placeholder="Cafe_Guest_WiFi"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="security" className="text-foreground">Security Type</Label>
            <select
              id="security"
              value={encryption}
              onChange={(e) => setEncryption(e.target.value as Encryption)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Open Network (No Password)</option>
            </select>
          </div>

          {encryption !== "nopass" && (
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input
                id="password"
                type="text"
                placeholder="Enter Wi-Fi password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-base"
              />
            </div>
          )}

          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={hidden}
              onChange={(e) => setHidden(e.target.checked)}
              className="h-4 w-4"
            />
            Hidden network
          </label>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={wifiQrValue} type="wifi" />
      </div>
    </GeneratorLayout>
  )
}
