"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { EventIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function EventGeneratorPage() {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [details, setDetails] = useState("")
  const [startDateTime, setStartDateTime] = useState("")
  const [endDateTime, setEndDateTime] = useState("")

  const toGoogleDate = (value: string) => {
    if (!value) return ""
    return new Date(value).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  const getEventUrl = () => {
    if (!title || !startDateTime || !endDateTime) return ""

    const params = new URLSearchParams()
    params.set("action", "TEMPLATE")
    params.set("text", title.trim())
    params.set("dates", `${toGoogleDate(startDateTime)}/${toGoogleDate(endDateTime)}`)
    if (location) params.set("location", location.trim())
    if (details) params.set("details", details.trim())

    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  const eventUrl = getEventUrl()

  return (
    <GeneratorLayout
      title="Event QR Code"
      description="Let users add events to calendar apps in one scan"
      color="#6366F1"
      icon={<EventIcon className="w-full h-full" />}
    >
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">Event Details</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">Event Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Weekend Live Music"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start" className="text-foreground">Start</Label>
              <Input
                id="start"
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end" className="text-foreground">End</Label>
              <Input
                id="end"
                type="datetime-local"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                className="text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-foreground">Location (Optional)</Label>
            <Input
              id="location"
              type="text"
              placeholder="Main Hall, Downtown"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details" className="text-foreground">Description (Optional)</Label>
            <Textarea
              id="details"
              placeholder="Entry free before 8 PM."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="text-base min-h-[90px] resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={eventUrl} type="event" />
      </div>
    </GeneratorLayout>
  )
}
