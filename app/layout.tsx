import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Free Online QR Generator – Create Unlimited QR Codes Without Login",
  description:
    "Create premium-quality QR codes online for websites, WhatsApp, email, phone numbers, Instagram, Facebook, YouTube, Spotify, digital vCards, and more. No registration required, no usage limits, and fully free on any device.",

  keywords: [
    "free online qr code generator",
    "qr code generator without login",
    "instant qr code generator",
    "instagram qr code creator",
    "whatsapp qr code generator",
    "email qr code creator",
    "phone number qr code generator",
    "social media qr code tool",
    "unlimited free qr codes",
    "best qr generator online",
    "vcard qr code generator",
    "youtube qr code generator",
    "spotify qr code generator",
    "facebook qr code creator",
  ],

  authors: [{ name: "qrcodegenerator.codes" }],

  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "Free Online QR Code Generator | No Login Required",
    description:
      "Create unlimited QR codes online in seconds. Supports WhatsApp, Instagram, email, phone numbers, social media, vCard, and more. 100% free and privacy-friendly.",
    url: "https://www.qrcodegenerator.codes",
    siteName: "qrcodegenerator.codes",
    type: "website",
    images: [
      {
        url: "https://www.qrcodegenerator.codes/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Online QR Code Generator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Online QR Code Generator",
    description:
      "Create unlimited QR codes online with no login. Fast, free, and optimized for mobile and desktop devices.",
    images: ["https://www.qrcodegenerator.codes/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
