"use client"

import { useState } from "react"
import { GeneratorLayout } from "@/components/generator-layout"
import { QRGenerator } from "@/components/qr-generator"
import { MultiLinkIcon } from "@/components/icons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SITE_BASE_URL } from "@/lib/site-url"

export default function MultiLinkGeneratorPage() {
  const [title, setTitle] = useState("")
  const [label1, setLabel1] = useState("")
  const [url1, setUrl1] = useState("")
  const [label2, setLabel2] = useState("")
  const [url2, setUrl2] = useState("")
  const [label3, setLabel3] = useState("")
  const [url3, setUrl3] = useState("")
  const [label4, setLabel4] = useState("")
  const [url4, setUrl4] = useState("")

  const getMultiLinkUrl = () => {
    if (!url1 && !url2 && !url3 && !url4) return ""

    const params = new URLSearchParams()
    if (title) params.set("title", title)
    if (label1) params.set("t1", label1)
    if (url1) params.set("l1", url1)
    if (label2) params.set("t2", label2)
    if (url2) params.set("l2", url2)
    if (label3) params.set("t3", label3)
    if (url3) params.set("l3", url3)
    if (label4) params.set("t4", label4)
    if (url4) params.set("l4", url4)
    return `${SITE_BASE_URL}/multilink-view?${params.toString()}`
  }

  const multiLinkValue = getMultiLinkUrl()

  return (
    <GeneratorLayout
      title="Multi-Link QR Code"
      description="Build one QR code for your top links"
      color="#A855F7"
      icon={<MultiLinkIcon className="w-full h-full" />}
    >
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-6">Profile Links</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">Page Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Mushtaq Links"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Input placeholder="Link 1 label (e.g. Menu)" value={label1} onChange={(e) => setLabel1(e.target.value)} className="text-base" />
            <Input placeholder="https://..." value={url1} onChange={(e) => setUrl1(e.target.value)} className="text-base" />
            <Input placeholder="Link 2 label (optional)" value={label2} onChange={(e) => setLabel2(e.target.value)} className="text-base" />
            <Input placeholder="https://..." value={url2} onChange={(e) => setUrl2(e.target.value)} className="text-base" />
            <Input placeholder="Link 3 label (optional)" value={label3} onChange={(e) => setLabel3(e.target.value)} className="text-base" />
            <Input placeholder="https://..." value={url3} onChange={(e) => setUrl3(e.target.value)} className="text-base" />
            <Input placeholder="Link 4 label (optional)" value={label4} onChange={(e) => setLabel4(e.target.value)} className="text-base" />
            <Input placeholder="https://..." value={url4} onChange={(e) => setUrl4(e.target.value)} className="text-base" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start">
        <QRGenerator value={multiLinkValue} type="multilink" />
      </div>
    </GeneratorLayout>
  )
}
