import { BackButton } from "@/components/back-button"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-[70vh] bg-muted/30 py-16">
      <div className="max-w-3xl mx-auto px-4">

        <div className="mb-6">
        <BackButton />
        </div>
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg">
            Your privacy matters. Learn how qrcodegenerator.codes protects your data.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
          <p className="text-muted-foreground leading-relaxed">
            This Privacy Policy explains how <strong>qrcodegenerator.codes</strong> handles
            user information when you use our free online QR code generator. We are committed
            to providing a secure, private, and transparent experience for all users.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Information We Do Not Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We do <strong>not</strong> collect personal information such as names, email
              addresses, phone numbers, payment details, or account credentials. Our service
              does not require registration, subscriptions, or identity verification.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              QR Code Data Processing
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All QR codes are generated in real time directly within your browser. The data
              you enter is never uploaded, stored, logged, or processed on our servers. Once
              you close the page, your data is gone.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Cookies & Analytics
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may use privacy-friendly analytics tools to understand general website usage,
              such as page visits and performance metrics. These tools do not track individual
              users, collect personal data, or use invasive tracking methods.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Third-Party Services
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not share, sell, or transfer user data to third parties. Any external
              services used (such as hosting or analytics) comply with strict privacy and
              security standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Policy Updates
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy may be updated occasionally to reflect improvements or legal
              requirements. Any changes will be published on this page with immediate effect.
            </p>
          </section>

          <p className="text-sm text-muted-foreground pt-4 border-t border-border/50">
            Last updated: {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </main>
  )
}
