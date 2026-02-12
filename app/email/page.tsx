"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { EmailIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function EmailGeneratorPage() {
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")

  // Format mailto URL
  const getMailtoUrl = () => {
    if (!email) return ""
    let url = `mailto:${email}`
    const params: string[] = []
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`)
    if (body) params.push(`body=${encodeURIComponent(body)}`)
    if (params.length > 0) {
      url += `?${params.join("&")}`
    }
    return url
  }

  const mailtoUrl = getMailtoUrl()

  return (
    <GeneratorLayout
      title="Email QR Code"
      description="Create a QR code to compose an email with pre-filled content"
      color="#EA4335"
      icon={<EmailIcon className="w-full h-full" />}
    >
      {/* Input Form */}
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">Email Details</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-foreground">Subject (Optional)</Label>
            <Input
              id="subject"
              type="text"
              placeholder="Inquiry from QR Code"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body" className="text-foreground">Message Body (Optional)</Label>
            <Textarea
              id="body"
              placeholder="Hello, I'd like to..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="text-base min-h-[100px] resize-none"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <h3 className="font-medium text-foreground mb-2">Tips for Email QR Codes</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>The QR code will open the default email app</li>
            <li>Subject and body will be pre-filled if provided</li>
            <li>Users can edit the content before sending</li>
          </ul>
        </div>
      </div>

      {/* QR Preview */}
      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={mailtoUrl} type="email" />
        
        {mailtoUrl && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Scanning will compose an email to:
            </p>
            <p className="text-sm font-medium text-foreground mt-1">
              {email}
            </p>
            {subject && (
              <p className="text-xs text-muted-foreground mt-2">
                Subject: {subject}
              </p>
            )}
          </div>
        )}
      </div>
    </GeneratorLayout>
  )
}
