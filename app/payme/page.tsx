"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { PayMeIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type Provider = "upi" | "venmo" | "cashapp" | "paypal"

export default function PayMeGeneratorPage() {
  const [provider, setProvider] = useState<Provider>("upi")
  const [handle, setHandle] = useState("")
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")

  const getPaymentUrl = () => {
    if (!handle) return ""

    if (provider === "upi") {
      const params = new URLSearchParams()
      params.set("pa", handle.trim())
      if (name) params.set("pn", name.trim())
      if (note) params.set("tn", note.trim())
      if (amount) params.set("am", amount.trim())
      params.set("cu", "INR")
      return `upi://pay?${params.toString()}`
    }

    if (provider === "venmo") {
      const params = new URLSearchParams()
      params.set("txn", "pay")
      if (amount) params.set("amount", amount.trim())
      if (note) params.set("note", note.trim())
      return `https://venmo.com/${handle.trim()}?${params.toString()}`
    }

    if (provider === "cashapp") {
      const cashTag = handle.trim().startsWith("$")
        ? handle.trim()
        : `$${handle.trim()}`
      return `https://cash.app/${cashTag}`
    }

    return amount
      ? `https://paypal.me/${handle.trim()}/${amount.trim()}`
      : `https://paypal.me/${handle.trim()}`
  }

  const paymentValue = getPaymentUrl()

  return (
    <GeneratorLayout
      title="Pay Me QR Code"
      description="Create direct payment QR codes for daily transactions"
      color="#14B8A6"
      icon={<PayMeIcon className="w-full h-full" />}
    >
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">Payment Details</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider" className="text-foreground">Provider</Label>
            <select
              id="provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value as Provider)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="upi">UPI</option>
              <option value="venmo">Venmo</option>
              <option value="cashapp">Cash App</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="handle" className="text-foreground">
              {provider === "upi" ? "UPI ID" : "Username / Handle"}
            </Label>
            <Input
              id="handle"
              type="text"
              placeholder={
                provider === "upi"
                  ? "merchant@upi"
                  : provider === "cashapp"
                    ? "$yourcashtag"
                    : "yourusername"
              }
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Display Name (Optional)</Label>
            <Input
              id="name"
              type="text"
              placeholder="Mushtaq Cafe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-foreground">Amount (Optional)</Label>
            <Input
              id="amount"
              type="text"
              placeholder="150"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note" className="text-foreground">Note (Optional)</Label>
            <Input
              id="note"
              type="text"
              placeholder="Payment for order #12"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="text-base"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={paymentValue} type="payme" />
      </div>
    </GeneratorLayout>
  )
}
