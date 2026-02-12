"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SITE_BASE_URL } from "@/lib/site-url"
import { Users } from "lucide-react"

export default function TeamSharePage() {
  const [projectName, setProjectName] = useState("")
  const [destination, setDestination] = useState("")
  const [notes, setNotes] = useState("")

  const sharePayload = JSON.stringify({ projectName, destination, notes, createdAt: new Date().toISOString() })
  const shareLink = destination
    ? `${SITE_BASE_URL}/advanced/team-view?data=${encodeURIComponent(btoa(unescape(encodeURIComponent(sharePayload))))}`
    : ""

  return (
    <GeneratorLayout
      title="Team Share QR"
      description="Create setup links you can share with teammates or clients"
      color="#CA8A04"
      icon={<Users className="w-full h-full" />}
    >
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Team Link Data</h2>
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input id="projectName" placeholder="Cafe Summer Campaign" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destination">Destination URL</Label>
          <Input id="destination" placeholder="https://example.com/campaign-page" value={destination} onChange={(e) => setDestination(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" placeholder="Use this link for all table stickers." value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={shareLink} type="team" />
      </div>
    </GeneratorLayout>
  )
}
