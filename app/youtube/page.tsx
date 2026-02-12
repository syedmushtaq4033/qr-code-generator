"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { YouTubeIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function YouTubeGeneratorPage() {
  const [channelOrVideo, setChannelOrVideo] = useState("")
  const [linkType, setLinkType] = useState<"channel" | "video">("channel")

  // Format YouTube URL
  const getYouTubeUrl = () => {
    if (!channelOrVideo) return ""
    if (linkType === "channel") {
      // Handle various channel formats
      if (channelOrVideo.startsWith("@")) {
        return `https://youtube.com/${channelOrVideo}`
      }
      return `https://youtube.com/@${channelOrVideo}`
    } else {
      // Extract video ID if full URL provided
      const videoIdMatch = channelOrVideo.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&\s]+)/)
      const videoId = videoIdMatch ? videoIdMatch[1] : channelOrVideo
      return `https://youtube.com/watch?v=${videoId}`
    }
  }

  const youtubeUrl = getYouTubeUrl()

  return (
    <GeneratorLayout
      title="YouTube QR Code"
      description="Create a QR code that links to your YouTube channel or video"
      color="#FF0000"
      icon={<YouTubeIcon className="w-full h-full" />}
    >
      {/* Input Form */}
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">YouTube Link</h2>
        
        <div className="space-y-4">
          {/* Link Type Toggle */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg w-fit">
            <button
              type="button"
              onClick={() => setLinkType("channel")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                linkType === "channel"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Channel
            </button>
            <button
              type="button"
              onClick={() => setLinkType("video")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                linkType === "video"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Video
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input" className="text-foreground">
              {linkType === "channel" ? "Channel Handle" : "Video URL or ID"}
            </Label>
            <Input
              id="input"
              type="text"
              placeholder={linkType === "channel" ? "@yourchannel" : "dQw4w9WgXcQ or full URL"}
              value={channelOrVideo}
              onChange={(e) => setChannelOrVideo(e.target.value)}
              className="text-base"
            />
            <p className="text-sm text-muted-foreground">
              {linkType === "channel" 
                ? "Enter your YouTube channel handle (with or without @)"
                : "Paste the video URL or just the video ID"}
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <h3 className="font-medium text-foreground mb-2">Tips for YouTube QR Codes</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Channel links work best with the @ handle format</li>
            <li>For videos, you can paste the full URL or just the video ID</li>
            <li>Great for sharing content in print materials</li>
          </ul>
        </div>
      </div>

      {/* QR Preview */}
      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={youtubeUrl} type="youtube" />
        
        {youtubeUrl && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Scanning will open YouTube:
            </p>
            <p className="text-sm font-medium text-foreground mt-1 break-all">
              {youtubeUrl}
            </p>
          </div>
        )}
      </div>
    </GeneratorLayout>
  )
}
