"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { InstagramIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function InstagramGeneratorPage() {
  const [username, setUsername] = useState("")

  // Format Instagram URL
  const getInstagramUrl = () => {
    if (!username) return ""
    // Remove @ if present
    const cleanUsername = username.replace(/^@/, "")
    return `https://instagram.com/${cleanUsername}`
  }

  const instagramUrl = getInstagramUrl()

  return (
    <GeneratorLayout
      title="Instagram QR Code"
      description="Create a QR code that links to your Instagram profile"
      color="#E4405F"
      icon={<InstagramIcon className="w-full h-full" />}
    >
      {/* Input Form */}
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">Instagram Profile</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-foreground">Username</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
              <Input
                id="username"
                type="text"
                placeholder="yourusername"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/^@/, ""))}
                className="text-base pl-8"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Enter your Instagram username without the @ symbol
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <h3 className="font-medium text-foreground mb-2">Tips for Instagram QR Codes</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Make sure your profile is public for maximum visibility</li>
            <li>The QR code will open your profile in the Instagram app or web</li>
            <li>Great for business cards, flyers, and promotional materials</li>
          </ul>
        </div>
      </div>

      {/* QR Preview */}
      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={instagramUrl} type="instagram" />
        
        {instagramUrl && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Scanning will open Instagram profile:
            </p>
            <p className="text-sm font-medium text-foreground mt-1">
              @{username.replace(/^@/, "")}
            </p>
          </div>
        )}
      </div>
    </GeneratorLayout>
  )
}
