"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { CampaignIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function CampaignGeneratorPage() {
  const [baseUrl, setBaseUrl] = useState("")
  const [source, setSource] = useState("")
  const [medium, setMedium] = useState("")
  const [campaign, setCampaign] = useState("")
  const [term, setTerm] = useState("")
  const [content, setContent] = useState("")

  const getCampaignUrl = () => {
    if (!baseUrl) return ""
    try {
      const parsedUrl = new URL(
        baseUrl.match(/^https?:\/\//) ? baseUrl : `https://${baseUrl}`
      )
      if (source) parsedUrl.searchParams.set("utm_source", source)
      if (medium) parsedUrl.searchParams.set("utm_medium", medium)
      if (campaign) parsedUrl.searchParams.set("utm_campaign", campaign)
      if (term) parsedUrl.searchParams.set("utm_term", term)
      if (content) parsedUrl.searchParams.set("utm_content", content)
      return parsedUrl.toString()
    } catch {
      return ""
    }
  }

  const campaignUrl = getCampaignUrl()

  return (
    <GeneratorLayout
      title="UTM Campaign QR Code"
      description="Create trackable QR campaigns for daily marketing performance"
      color="#EF4444"
      icon={<CampaignIcon className="w-full h-full" />}
    >
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">Campaign Link Details</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="baseUrl" className="text-foreground">Base URL</Label>
            <Input
              id="baseUrl"
              type="url"
              placeholder="https://yourwebsite.com/offer"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source" className="text-foreground">utm_source</Label>
              <Input id="source" type="text" placeholder="poster" value={source} onChange={(e) => setSource(e.target.value)} className="text-base" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medium" className="text-foreground">utm_medium</Label>
              <Input id="medium" type="text" placeholder="offline" value={medium} onChange={(e) => setMedium(e.target.value)} className="text-base" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign" className="text-foreground">utm_campaign</Label>
              <Input id="campaign" type="text" placeholder="weekend_offer" value={campaign} onChange={(e) => setCampaign(e.target.value)} className="text-base" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term" className="text-foreground">utm_term (Optional)</Label>
              <Input id="term" type="text" placeholder="summer" value={term} onChange={(e) => setTerm(e.target.value)} className="text-base" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-foreground">utm_content (Optional)</Label>
            <Input
              id="content"
              type="text"
              placeholder="table_sticker_qr"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="text-base"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={campaignUrl} type="campaign" />
      </div>
    </GeneratorLayout>
  )
}
