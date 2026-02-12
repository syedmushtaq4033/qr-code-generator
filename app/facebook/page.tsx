"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { FacebookIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function FacebookGeneratorPage() {
  const [username, setUsername] = useState("")

  // Format Facebook URL
  const getFacebookUrl = () => {
    if (!username) return ""
    return `https://facebook.com/${username}`
  }

  const facebookUrl = getFacebookUrl()

  return (
    <GeneratorLayout
      title="Facebook QR Code"
      description="Create a QR code that links to your Facebook page or profile"
      color="#1877F2"
      icon={<FacebookIcon className="w-full h-full" />}
    >
      {/* Input Form */}
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">Facebook Profile</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-foreground">Username or Page Name</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">facebook.com/</span>
              <Input
                id="username"
                type="text"
                placeholder="yourpage"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-base pl-[105px]"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Enter your Facebook username or page name
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <h3 className="font-medium text-foreground mb-2">Tips for Facebook QR Codes</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Use your page username, not the full URL</li>
            <li>Works for both personal profiles and business pages</li>
            <li>The QR code will open in the Facebook app or browser</li>
          </ul>
        </div>
      </div>

      {/* QR Preview */}
      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={facebookUrl} type="facebook" />
        
        {facebookUrl && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Scanning will open Facebook:
            </p>
            <p className="text-sm font-medium text-foreground mt-1">
              facebook.com/{username}
            </p>
          </div>
        )}
      </div>
    </GeneratorLayout>
  )
}
