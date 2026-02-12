"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { PaymentIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function PaymentGeneratorPage() {
  const [paymentUrl, setPaymentUrl] = useState("")

  // Ensure URL has protocol
  const formattedUrl = paymentUrl && !paymentUrl.match(/^https?:\/\//) ? `https://${paymentUrl}` : paymentUrl

  return (
    <GeneratorLayout
      title="Payment Link QR Code"
      description="Create a QR code that directs customers to your payment page"
      color="#F59E0B"
      icon={<PaymentIcon className="w-full h-full" />}
    >
      {/* Input Form */}
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">Payment Link</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payment" className="text-foreground">Payment URL</Label>
            <Input
              id="payment"
              type="url"
              placeholder="https://paypal.me/yourusername"
              value={paymentUrl}
              onChange={(e) => setPaymentUrl(e.target.value)}
              className="text-base"
            />
            <p className="text-sm text-muted-foreground">
              Paste your payment link from PayPal, Venmo, Square, or any payment service
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <h3 className="font-medium text-foreground mb-2">Supported Payment Services</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>PayPal (paypal.me links)</li>
            <li>Venmo (venmo.com links)</li>
            <li>Cash App, Square, Stripe payment links</li>
            <li>Any URL-based payment service</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> This generates a simple URL QR code that links to your payment page. 
            It does not process payments directly.
          </p>
        </div>
      </div>

      {/* QR Preview */}
      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={formattedUrl} type="payment" />
        
        {formattedUrl && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Scanning will open payment page:
            </p>
            <p className="text-sm font-medium text-foreground mt-1 break-all max-w-xs">
              {formattedUrl}
            </p>
          </div>
        )}
      </div>
    </GeneratorLayout>
  )
}
