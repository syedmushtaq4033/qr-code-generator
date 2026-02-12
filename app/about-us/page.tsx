import { BackButton } from "@/components/back-button"
import { QrCode } from "lucide-react"
export default function AboutPage() {
  return (
    <main className="min-h-[70vh] bg-muted/30 py-16">
      <div className="max-w-3xl mx-auto px-4">

        <div className="mb-6">
        <BackButton />
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            About qrcodegenerator.codes
          </h1>
          <p className="text-muted-foreground text-lg">
            A fast, free, and privacy-focused QR code generator.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
          <p className="text-muted-foreground leading-relaxed mb-4">
            qrcodegenerator.codes is a free online QR code generator designed to
            make QR code creation simple, fast, and accessible for everyone.
            Whether you need a QR code for a website, social media profile,
            business card, email, phone number, or payment link, our tool helps
            you generate high-quality QR codes instantly.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-4">
            We believe QR code generation should be easy and transparent. That’s
            why our platform offers unlimited QR code creation with no account
            registration, no subscriptions, and no hidden fees. All QR codes are
            generated in real time directly in your browser.
          </p>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <QrCode className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Trusted by individuals, businesses, and creators to generate free,
              reliable QR codes for marketing, communication, and everyday use.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
