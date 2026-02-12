"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { MapsPinIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type TravelMode = "driving" | "walking" | "transit" | "bicycling"

export default function MapsGeneratorPage() {
  const [destination, setDestination] = useState("")
  const [travelMode, setTravelMode] = useState<TravelMode>("driving")

  const mapsUrl = destination
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=${travelMode}`
    : ""

  return (
    <GeneratorLayout
      title="Google Maps QR Code"
      description="Send people to your location instantly from posters and tables"
      color="#F97316"
      icon={<MapsPinIcon className="w-full h-full" />}
    >
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">Location Details</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-foreground">Destination</Label>
            <Input
              id="destination"
              type="text"
              placeholder="Times Square, New York"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="text-base"
            />
            <p className="text-sm text-muted-foreground">
              Enter an address, place name, or map coordinates
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mode" className="text-foreground">Travel Mode</Label>
            <select
              id="mode"
              value={travelMode}
              onChange={(e) => setTravelMode(e.target.value as TravelMode)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="driving">Driving</option>
              <option value="walking">Walking</option>
              <option value="transit">Transit</option>
              <option value="bicycling">Bicycling</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={mapsUrl} type="maps" />
      </div>
    </GeneratorLayout>
  )
}
