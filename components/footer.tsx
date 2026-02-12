import Link from "next/link"
import { QRCodeIcon } from "./icons"

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 cursor-pointer mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <QRCodeIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">
                qrcodegenerator.codes
              </span>
            </Link>

            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Create free QR codes instantly for URLs, social media, emails,
              phone numbers, and more. No account required, no limits, 100% free
              forever.
            </p>
          </div>

          {/* QR Types */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              QR Code Types
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/url" className="hover:text-foreground transition-colors">Website URL</Link></li>
              <li><Link href="/whatsapp" className="hover:text-foreground transition-colors">WhatsApp</Link></li>
              <li><Link href="/email" className="hover:text-foreground transition-colors">Email</Link></li>
              <li><Link href="/phone" className="hover:text-foreground transition-colors">Phone</Link></li>
              <li><Link href="/instagram" className="hover:text-foreground transition-colors">Instagram</Link></li>
            </ul>
          </div>

          {/* More Types */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              More Types
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/facebook" className="hover:text-foreground transition-colors">Facebook</Link></li>
              <li><Link href="/youtube" className="hover:text-foreground transition-colors">YouTube</Link></li>
              <li><Link href="/spotify" className="hover:text-foreground transition-colors">Spotify</Link></li>
              <li><Link href="/vcard" className="hover:text-foreground transition-colors">Business Card</Link></li>
              <li><Link href="/payment" className="hover:text-foreground transition-colors">Payment Link</Link></li>
            </ul>
          </div>

          {/* Daily Use */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              Daily Use
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/wifi" className="hover:text-foreground transition-colors">Wi-Fi</Link></li>
              <li><Link href="/maps" className="hover:text-foreground transition-colors">Google Maps</Link></li>
              <li><Link href="/sms" className="hover:text-foreground transition-colors">SMS</Link></li>
              <li><Link href="/event" className="hover:text-foreground transition-colors">Event</Link></li>
              <li><Link href="/multilink" className="hover:text-foreground transition-colors">Multi Link</Link></li>
            </ul>
          </div>

          {/* Company / Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about-us" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/advanced" className="hover:text-foreground transition-colors">Advanced Tools</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-foreground transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} qrcodegenerator.codes — Free QR Code Generator
          </p>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-foreground">Terms</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
