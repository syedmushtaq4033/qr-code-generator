"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Utensils } from "lucide-react"

export default function MenuQRGeneratorPage() {
  const [menuUrl, setMenuUrl] = useState("")

  // Ensure URL has protocol
  const formattedUrl =
    menuUrl && !menuUrl.match(/^https?:\/\//)
      ? `https://${menuUrl}`
      : menuUrl

  return (
    <GeneratorLayout
      title="Restaurant Menu QR Code"
      description="Create a QR code that opens your cafe or restaurant menu instantly"
      color="#10B981"
      icon={<Utensils className="w-full h-full" />}
    >
      {/* Input Form */}
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Menu Link
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="menu" className="text-foreground">
              Menu URL
            </Label>
            <Input
              id="menu"
              type="cafe"
              placeholder="https://yourrestaurant.com/menu"
              value={menuUrl}
              onChange={(e) => setMenuUrl(e.target.value)}
              className="text-base"
            />
            <p className="text-sm text-muted-foreground">
              Paste your online menu link (website, Google Drive PDF, Zomato,
              Swiggy, or any menu page)
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <h3 className="font-medium text-foreground mb-2">
            Popular Menu Sources
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Restaurant website menu page</li>
            <li>Google Drive / PDF menu links</li>
            <li>Zomato, Swiggy, Uber Eats menu pages</li>
            <li>Notion, Canva, or any public menu URL</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <p className="text-sm text-emerald-800">
            <strong>Tip:</strong> Place this QR code on tables, takeaway bags,
            or posters so customers can view your menu instantly without
            installing apps.
          </p>
        </div>
      </div>

      {/* QR Preview */}
      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={formattedUrl} type="cafe" />

        {formattedUrl && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Scanning will open menu:
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
