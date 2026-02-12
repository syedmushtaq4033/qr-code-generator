"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { WhatsAppIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function WhatsAppGeneratorPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")

  // Format WhatsApp URL - use wa.me format for proper app opening
  const getWhatsAppUrl = () => {
    if (!phoneNumber) return ""
    // wa.me expects digits only (country code included, no plus sign).
    const cleanNumber = phoneNumber.replace(/\D/g, "")
    if (!cleanNumber) return ""
    let url = `https://wa.me/${cleanNumber}`
    if (message) {
      url += `?text=${encodeURIComponent(message)}`
    }
    return url
  }

  const whatsappUrl = getWhatsAppUrl()

  return (
    <GeneratorLayout
      title="WhatsApp QR Code"
      description="Create a QR code to start a WhatsApp conversation"
      color="#25D366"
      icon={<WhatsAppIcon className="w-full h-full" />}
    >
      {/* Input Form */}
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">WhatsApp Details</h2>
        
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
              Include country code (e.g., +1 for USA, +44 for UK)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground">Pre-filled Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Hello! I scanned your QR code..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="text-base min-h-[100px] resize-none"
            />
            <p className="text-sm text-muted-foreground">
              This message will be pre-filled when the chat opens
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <h3 className="font-medium text-foreground mb-2">Tips for WhatsApp QR Codes</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Always include the country code without spaces</li>
            <li>The QR code will open WhatsApp directly on mobile</li>
            <li>On desktop, it will open WhatsApp Web</li>
          </ul>
        </div>
      </div>

      {/* QR Preview */}
      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={whatsappUrl} type="whatsapp" />
        
        {whatsappUrl && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Scanning will start a WhatsApp chat with:
            </p>
            <p className="text-sm font-medium text-foreground mt-1">
              {phoneNumber}
            </p>
            {message && (
              <p className="text-xs text-muted-foreground mt-2 italic">
                &ldquo;{message}&rdquo;
              </p>
            )}
          </div>
        )}
      </div>
    </GeneratorLayout>
  )
}
