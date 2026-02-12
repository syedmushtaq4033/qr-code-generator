"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { SMSIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function SMSGeneratorPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")

  const getSmsUrl = () => {
    if (!phoneNumber) return ""
    const digits = phoneNumber.replace(/\D/g, "")
    if (!digits) return ""
    const cleanNumber = phoneNumber.trim().startsWith("+") ? `+${digits}` : digits
    return message
      ? `sms:${cleanNumber}?body=${encodeURIComponent(message)}`
      : `sms:${cleanNumber}`
  }

  const smsUrl = getSmsUrl()

  return (
    <GeneratorLayout
      title="SMS QR Code"
      description="Start text messages with pre-filled text in one scan"
      color="#22C55E"
      icon={<SMSIcon className="w-full h-full" />}
    >
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">SMS Details</h2>

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
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground">Pre-filled Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Hi! I want to place an order."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="text-base min-h-[100px] resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={smsUrl} type="sms" />
      </div>
    </GeneratorLayout>
  )
}
