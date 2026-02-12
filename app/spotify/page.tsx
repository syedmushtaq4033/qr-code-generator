"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { SpotifyIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function SpotifyGeneratorPage() {
  const [spotifyUrl, setSpotifyUrl] = useState("")

  // Validate and format Spotify URL
  const getSpotifyUrl = () => {
    if (!spotifyUrl) return ""
    // If it's already a valid Spotify URL, return it
    if (spotifyUrl.includes("spotify.com") || spotifyUrl.includes("open.spotify")) {
      return spotifyUrl
    }
    // Otherwise assume it's a profile/playlist name and create a search-like URL
    return `https://open.spotify.com/search/${encodeURIComponent(spotifyUrl)}`
  }

  const formattedUrl = getSpotifyUrl()

  return (
    <GeneratorLayout
      title="Spotify QR Code"
      description="Create a QR code that links to Spotify playlists, albums, or artists"
      color="#1DB954"
      icon={<SpotifyIcon className="w-full h-full" />}
    >
      {/* Input Form */}
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">Spotify Link</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="spotify" className="text-foreground">Spotify URL</Label>
            <Input
              id="spotify"
              type="url"
              placeholder="https://open.spotify.com/playlist/..."
              value={spotifyUrl}
              onChange={(e) => setSpotifyUrl(e.target.value)}
              className="text-base"
            />
            <p className="text-sm text-muted-foreground">
              Paste a Spotify link for a playlist, album, artist, or track
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <h3 className="font-medium text-foreground mb-2">How to Get Spotify Links</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>1. Open Spotify and find what you want to share</li>
            <li>2. Click the three dots (...) menu</li>
            <li>3. Select &ldquo;Share&rdquo; then &ldquo;Copy link&rdquo;</li>
            <li>4. Paste the link here</li>
          </ul>
        </div>
      </div>

      {/* QR Preview */}
      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={formattedUrl} type="spotify" />
        
        {formattedUrl && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Scanning will open Spotify:
            </p>
            <p className="text-sm font-medium text-foreground mt-1 break-all max-w-xs">
              {spotifyUrl || formattedUrl}
            </p>
          </div>
        )}
      </div>
    </GeneratorLayout>
  )
}
