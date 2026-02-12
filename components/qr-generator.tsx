"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import QRCode from "qrcode"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export type QRType = 
  | "url" 
  | "whatsapp" 
  | "email" 
  | "phone" 
  | "instagram" 
  | "facebook" 
  | "youtube" 
  | "spotify" 
  | "vcard" 
  | "payment"
  | "restaurant"
  | "cafe"
  | "wifi"
  | "payme"
  | "maps"
  | "event"
  | "sms"
  | "appstore"
  | "multilink"
  | "campaign"
  | "dynamic"
  | "analytics"
  | "password"
  | "expiry"
  | "abtest"
  | "bulk"
  | "print"
  | "brand"
  | "file"
  | "deeplink"
  | "team"
  | "utm"

interface QRGeneratorProps {
  value: string
  type: QRType
  size?: number
}

const logoSVGs: Record<QRType, string> = {
  url: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  spotify: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
  vcard: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2.75c1.24 0 2.25 1.01 2.25 2.25s-1.01 2.25-2.25 2.25S9.75 10.24 9.75 9 10.76 6.75 12 6.75zM17 17H7v-1.5c0-1.67 3.33-2.5 5-2.5s5 .83 5 2.5V17z"/></svg>`,
  payment: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>`,
  restaurant: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v7a4 4 0 0 0 4 4h1v7"/><path d="M7 3v7"/><path d="M11 3v7a4 4 0 0 1-4 4"/><path d="M15 3v18"/><path d="M15 3a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4"/></svg>`,
  cafe: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v7a4 4 0 0 0 4 4h1v7"/><path d="M7 3v7"/><path d="M11 3v7a4 4 0 0 1-4 4"/><path d="M15 3v18"/><path d="M15 3a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4"/></svg>`,
  wifi: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M12 20h.01"/></svg>`,
  payme: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M7 15h1"/></svg>`,
  maps: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z"/><circle cx="12" cy="11" r="2.5"/></svg>`,
  event: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>`,
  sms: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  appstore: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>`,
  multilink: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 1 1 7 7l-1 1"/><path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 1 1-7-7l1-1"/></svg>`,
  campaign: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>`,
  dynamic: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 1 1 7 7l-1 1"/><path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 1 1-7-7l1-1"/></svg>`,
  analytics: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>`,
  password: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V8a5 5 0 0 1 10 0v3"/></svg>`,
  expiry: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
  abtest: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h8"/><path d="M3 17h8"/><path d="M13 7h8"/><path d="M13 17h8"/><path d="M9 3l2 4-2 4"/><path d="M15 13l-2 4 2 4"/></svg>`,
  bulk: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="6" height="6"/><rect x="3" y="14" width="6" height="6"/><rect x="15" y="4" width="6" height="6"/><rect x="15" y="14" width="6" height="6"/></svg>`,
  print: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V4h12v5"/><rect x="6" y="14" width="12" height="6"/><rect x="3" y="9" width="18" height="7" rx="2"/></svg>`,
  brand: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 1 0-20"/><circle cx="12" cy="12" r="2"/><path d="M17 7h.01"/><path d="M7 17h.01"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9.5 14.5 12 12l2.5 2.5"/></svg>`,
  deeplink: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/><path d="M20 8l2 2-2 2"/><path d="M4 8l-2 2 2 2"/></svg>`,
  team: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M15 20c0-2 1-4 4-4 1 0 2 .3 3 1"/></svg>`,
  utm: `<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M5 7h14"/><path d="M5 12h8"/><path d="M5 17h11"/></svg>`,
}

const typeColors: Record<QRType, string> = {
  url: "#4F46E5",
  whatsapp: "#25D366",
  email: "#EA4335",
  phone: "#8B5CF6",
  instagram: "#E4405F",
  facebook: "#1877F2",
  youtube: "#FF0000",
  spotify: "#1DB954",
  vcard: "#0EA5E9",
  payment: "#F59E0B",
  restaurant: "#10B981",
  cafe: "#10B981",
  wifi: "#0EA5E9",
  payme: "#14B8A6",
  maps: "#F97316",
  event: "#6366F1",
  sms: "#22C55E",
  appstore: "#334155",
  multilink: "#A855F7",
  campaign: "#EF4444",
  dynamic: "#4F46E5",
  analytics: "#0EA5E9",
  password: "#F59E0B",
  expiry: "#EF4444",
  abtest: "#14B8A6",
  bulk: "#8B5CF6",
  print: "#16A34A",
  brand: "#A855F7",
  file: "#334155",
  deeplink: "#1D4ED8",
  team: "#CA8A04",
  utm: "#DC2626",
}

export function QRGenerator({ value, type, size = 280 }: QRGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isGenerated, setIsGenerated] = useState(false)
  const [darkColor, setDarkColor] = useState("#1A1A2E")
  const [lightColor, setLightColor] = useState("#FFFFFF")
  const [showCenterLogo, setShowCenterLogo] = useState(true)
  const [showFrame, setShowFrame] = useState(false)
  const [frameText, setFrameText] = useState("")

  const generateQR = useCallback(async () => {
    if (!canvasRef.current || !value) {
      setIsGenerated(false)
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const framePadding = showFrame ? 18 : 0
    const labelHeight = frameText.trim() ? 44 : 0
    const canvasWidth = size + framePadding * 2
    const canvasHeight = size + framePadding * 2 + labelHeight
    const qrX = framePadding
    const qrY = framePadding

    // Set canvas size
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    // Clear canvas
    ctx.fillStyle = lightColor
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    try {
      // Generate QR code with high error correction for logo overlay
      const qrDataUrl = await QRCode.toDataURL(value, {
        width: size,
        margin: 2,
        errorCorrectionLevel: "H",
        color: {
          dark: darkColor,
          light: lightColor,
        },
      })

      if (showFrame) {
        ctx.strokeStyle = typeColors[type]
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.roundRect(2, 2, canvasWidth - 4, canvasHeight - 4, 18)
        ctx.stroke()
      }

      // Draw QR code
      const qrImage = new Image()
      qrImage.crossOrigin = "anonymous"
      
      await new Promise<void>((resolve, reject) => {
        qrImage.onload = () => {
          ctx.drawImage(qrImage, qrX, qrY, size, size)
          resolve()
        }
        qrImage.onerror = reject
        qrImage.src = qrDataUrl
      })

      if (showCenterLogo) {
        // Draw logo in center
        const logoSize = size * 0.22
        const logoX = qrX + (size - logoSize) / 2
        const logoY = qrY + (size - logoSize) / 2
        const padding = 8
        const borderRadius = logoSize * 0.2

        // White background with rounded corners
        ctx.fillStyle = "#FFFFFF"
        ctx.beginPath()
        ctx.roundRect(
          logoX - padding,
          logoY - padding,
          logoSize + padding * 2,
          logoSize + padding * 2,
          borderRadius
        )
        ctx.fill()

        // Draw colored circle background
        const circleRadius = logoSize * 0.5 + 2
        ctx.fillStyle = typeColors[type]
        ctx.beginPath()
        ctx.arc(qrX + size / 2, qrY + size / 2, circleRadius, 0, Math.PI * 2)
        ctx.fill()

        // Draw logo SVG
        const svgBlob = new Blob(
        [
          logoSVGs[type].replace(
            "<svg",
            `<svg xmlns="http://www.w3.org/2000/svg"
             width="${logoSize * 0.6}"
             height="${logoSize * 0.6}"`
          ),
        ],
         { type: "image/svg+xml" }
         )

        const svgUrl = URL.createObjectURL(svgBlob)
        const logoImage = new Image()
        logoImage.crossOrigin = "anonymous"

        await new Promise<void>((resolve) => {
          logoImage.onload = () => {
            const logoDrawSize = logoSize * 0.6
            ctx.drawImage(
              logoImage,
              qrX + (size - logoDrawSize) / 2,
              qrY + (size - logoDrawSize) / 2,
              logoDrawSize,
              logoDrawSize
            )
            URL.revokeObjectURL(svgUrl)
            resolve()
          }
          logoImage.onerror = () => {
            URL.revokeObjectURL(svgUrl)
            resolve()
          }
          logoImage.src = svgUrl
        })
      }

      if (frameText.trim()) {
        ctx.fillStyle = lightColor
        ctx.fillRect(0, canvasHeight - labelHeight, canvasWidth, labelHeight)
        ctx.fillStyle = typeColors[type]
        ctx.font = "bold 16px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(frameText.trim(), canvasWidth / 2, canvasHeight - labelHeight / 2)
      }

      setIsGenerated(true)
    } catch (error) {
      console.error("Error generating QR code:", error)
      setIsGenerated(false)
    }
  }, [value, type, size, darkColor, lightColor, showCenterLogo, showFrame, frameText])

  useEffect(() => {
    if (value) {
      generateQR()
    } else {
      setIsGenerated(false)
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d")
        if (ctx) {
          ctx.fillStyle = "#F8FAFC"
          ctx.fillRect(0, 0, size, size)
        }
      }
    }
  }, [value, generateQR, size])

  const downloadQR = () => {
    if (!canvasRef.current || !isGenerated) return

    const canvas = canvasRef.current
    const link = document.createElement("a")
    link.download = `qr-code-${type}.png`
    link.href = canvas.toDataURL("image/png", 1.0)
    link.click()
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative bg-card rounded-2xl p-6 shadow-lg border border-border/50">
        <canvas
          ref={canvasRef}
          width={size + (showFrame ? 36 : 0)}
          height={size + (showFrame ? 36 : 0) + (frameText.trim() ? 44 : 0)}
          className="rounded-xl"
          style={{
            width: size + (showFrame ? 36 : 0),
            height: size + (showFrame ? 36 : 0) + (frameText.trim() ? 44 : 0),
          }}
        />
        {!value && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-2xl m-6">
            <p className="text-muted-foreground text-center px-4">
              Enter your data to generate QR code
            </p>
          </div>
        )}
      </div>

      {isGenerated && (
        <div className="flex gap-3">
          <Button
            onClick={downloadQR}
            className="gap-2 cursor-pointer"
            style={{ backgroundColor: typeColors[type] }}
          >
            <Download className="w-4 h-4" />
            Download PNG
          </Button>
        </div>
      )}

      <div className="w-full max-w-sm bg-card border border-border/50 rounded-xl p-4 space-y-3">
        <p className="text-sm font-medium text-foreground">Customize QR</p>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-muted-foreground space-y-1">
            Foreground
            <input
              type="color"
              value={darkColor}
              onChange={(e) => setDarkColor(e.target.value)}
              className="w-full h-9 rounded border border-input p-1"
            />
          </label>
          <label className="text-xs text-muted-foreground space-y-1">
            Background
            <input
              type="color"
              value={lightColor}
              onChange={(e) => setLightColor(e.target.value)}
              className="w-full h-9 rounded border border-input p-1"
            />
          </label>
        </div>
        <div className="flex items-center justify-between text-sm text-foreground">
          <span>Center logo</span>
          <input type="checkbox" checked={showCenterLogo} onChange={(e) => setShowCenterLogo(e.target.checked)} />
        </div>
        <div className="flex items-center justify-between text-sm text-foreground">
          <span>Border frame</span>
          <input type="checkbox" checked={showFrame} onChange={(e) => setShowFrame(e.target.checked)} />
        </div>
        <div className="space-y-1">
          <label htmlFor={`frame-text-${type}`} className="text-xs text-muted-foreground">Frame Text (Optional)</label>
          <input
            id={`frame-text-${type}`}
            type="text"
            placeholder="Scan Me"
            value={frameText}
            onChange={(e) => setFrameText(e.target.value)}
            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
          />
        </div>
      </div>
    </div>
  )
}
