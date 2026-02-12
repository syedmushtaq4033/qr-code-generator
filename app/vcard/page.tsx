"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { VCardIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function VCardGeneratorPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [title, setTitle] = useState("")
  const [website, setWebsite] = useState("")
  const [address, setAddress] = useState("")

  const escapeVCardValue = (input: string) =>
    input
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")

  // Generate vCard string
  const getVCard = () => {
    if (!firstName && !lastName && !email && !phone) return ""
    
    let vcard = "BEGIN:VCARD\nVERSION:3.0\n"
    
    if (firstName || lastName) {
      vcard += `N:${escapeVCardValue(lastName)};${escapeVCardValue(firstName)};;;\n`
      vcard += `FN:${escapeVCardValue(`${firstName} ${lastName}`.trim())}\n`
    }
    
    if (company) vcard += `ORG:${escapeVCardValue(company)}\n`
    if (title) vcard += `TITLE:${escapeVCardValue(title)}\n`
    if (phone) vcard += `TEL:${escapeVCardValue(phone)}\n`
    if (email) vcard += `EMAIL:${escapeVCardValue(email)}\n`
    if (website) vcard += `URL:${escapeVCardValue(website)}\n`
    if (address) vcard += `ADR:;;${escapeVCardValue(address)};;;;\n`
    
    vcard += "END:VCARD"
    
    return vcard
  }

  const vcardData = getVCard()

  return (
    <GeneratorLayout
      title="Business Card (vCard) QR Code"
      description="Create a QR code that saves contact information directly to phones"
      color="#0EA5E9"
      icon={<VCardIcon className="w-full h-full" />}
    >
      {/* Input Form */}
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">Contact Information</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-foreground">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 234 567 8900"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-foreground">Company</Label>
              <Input
                id="company"
                type="text"
                placeholder="Acme Inc."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">Job Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Marketing Manager"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-foreground">Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://example.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-foreground">Address</Label>
            <Textarea
              id="address"
              placeholder="123 Main St, City, Country"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="text-base min-h-[80px] resize-none"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <h3 className="font-medium text-foreground mb-2">Tips for vCard QR Codes</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Scanning will prompt to save contact directly</li>
            <li>All fields are optional - add what you need</li>
            <li>Perfect for business cards and networking events</li>
          </ul>
        </div>
      </div>

      {/* QR Preview */}
      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={vcardData} type="vcard" />
        
        {vcardData && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Scanning will save contact:
            </p>
            <p className="text-sm font-medium text-foreground mt-1">
              {firstName} {lastName}
            </p>
            {company && (
              <p className="text-xs text-muted-foreground">
                {title ? `${title} at ` : ""}{company}
              </p>
            )}
          </div>
        )}
      </div>
    </GeneratorLayout>
  )
}
