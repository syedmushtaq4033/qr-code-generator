"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { PhoneIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function PhoneGeneratorPage() {
  const [phoneNumber, setPhoneNumber] = useState("")

  // Format tel URL
  const getTelUrl = () => {
    if (!phoneNumber) return ""
    const digits = phoneNumber.replace(/\D/g, "")
    if (!digits) return ""
    const cleanNumber = phoneNumber.trim().startsWith("+") ? `+${digits}` : digits
    return `tel:${cleanNumber}`
  }

  const telUrl = getTelUrl()

  return (
    <GeneratorLayout
      title="Phone Call QR Code"
      description="Create a QR code that initiates a phone call"
      color="#8B5CF6"
      icon={<PhoneIcon className="w-full h-full" />}
    >
      {/* Input Form */}
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">Phone Number</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 234 567 8900"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="text-base"
            />
            <p className="text-sm text-muted-foreground">
              Include country code for international calls
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <h3 className="font-medium text-foreground mb-2">Tips for Phone QR Codes</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Scanning will open the phone dialer with the number pre-filled</li>
            <li>Include country code (+1, +44, etc.) for international numbers</li>
            <li>Users will need to confirm before the call is placed</li>
          </ul>
        </div>
      </div>

      {/* QR Preview */}
      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={telUrl} type="phone" />
        
        {telUrl && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Scanning will dial:
            </p>
            <p className="text-sm font-medium text-foreground mt-1">
              {phoneNumber}
            </p>
          </div>
        )}
      </div>
    </GeneratorLayout>
  )
}
