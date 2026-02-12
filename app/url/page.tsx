"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { GlobeIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function URLGeneratorPage() {
  const [url, setUrl] = useState("")

  // Ensure URL has protocol
  const formattedUrl = url && !url.match(/^https?:\/\//) ? `https://${url}` : url

  return (
    <GeneratorLayout
      title="Website URL QR Code"
      description="Create a QR code that links to any website or webpage"
      color="#4F46E5"
      icon={<GlobeIcon className="w-full h-full" />}
    >
      {/* Input Form */}
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">Enter URL</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-foreground">Website URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="text-base"
            />
            <p className="text-sm text-muted-foreground">
              Enter the full URL including https://
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <h3 className="font-medium text-foreground mb-2">Tips for URL QR Codes</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Use short URLs when possible for better scanning</li>
            <li>Test your QR code before printing</li>
            <li>Make sure the URL is accessible on mobile devices</li>
          </ul>
        </div>
      </div>

      {/* QR Preview */}
      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={formattedUrl} type="url" />
        
        {formattedUrl && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Scanning this QR code will open:
            </p>
            <p className="text-sm font-medium text-foreground break-all mt-1">
              {formattedUrl}
            </p>
          </div>
        )}
      </div>
    </GeneratorLayout>
  )
}
