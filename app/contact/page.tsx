import { BackButton } from "@/components/back-button"

import { Mail } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-[70vh] bg-muted/30 py-16">
      <div className="max-w-3xl mx-auto px-4">

        <div className="mb-6">
        <BackButton />
        </div>
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Contact qrcodegenerator.codes
          </h1>
          <p className="text-muted-foreground text-lg">
            We’re here to help with any questions or feedback.
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you have questions about our free QR code generator, need support,
            want to report an issue, or have suggestions to improve the platform,
            feel free to reach out.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-6">
            qrcodegenerator.codes lets you generate unlimited high-quality QR
            codes for websites, WhatsApp, email, phone numbers, social media,
            vCards, and more — with no login and no hidden limits.
          </p>

          {/* Email Box */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email us at</p>
              <a
                href="mailto:qrcodegenerator.codes@gmail.com"
                className="font-medium text-foreground hover:underline"
              >
                qrcodegenerator.codes@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
