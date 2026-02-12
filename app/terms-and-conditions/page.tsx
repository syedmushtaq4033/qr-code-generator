import { BackButton } from "@/components/back-button"

export default function TermsPage() {
  return (
    <main className="min-h-[70vh] bg-muted/30 py-16">
      <div className="max-w-3xl mx-auto px-4">

        <div className="mb-6">
        <BackButton />
        </div>
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground text-lg">
            Please review the terms that govern your use of qrcodegenerator.codes.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using <strong>qrcodegenerator.codes</strong>, you agree
            to comply with and be bound by these Terms and Conditions. If you do not
            agree with any part of these terms, please discontinue use of the service.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Service Usage
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our QR code generator may be used for both personal and commercial
              purposes. You are solely responsible for the content encoded in the
              QR codes you create and how those QR codes are used.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Acceptable Use
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree not to use this service for unlawful, harmful, misleading,
              or fraudulent purposes. We reserve the right to restrict access if
              the service is misused or abused.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No Guarantees or Warranties
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The service is provided on an <strong>“as-is”</strong> and
              <strong> “as-available”</strong> basis. We make no warranties regarding
              accuracy, reliability, availability, or uninterrupted operation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              qrcodegenerator.codes shall not be liable for any direct, indirect,
              incidental, or consequential damages resulting from the use or
              inability to use this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Changes to These Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms and Conditions at any time. Continued use
              of the website after changes are posted constitutes acceptance of
              the revised terms.
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
