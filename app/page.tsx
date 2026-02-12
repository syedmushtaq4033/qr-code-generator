import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { QRTypeCard } from "@/components/qr-type-card"
import { 
  GlobeIcon, 
  WhatsAppIcon, 
  EmailIcon, 
  PhoneIcon, 
  InstagramIcon, 
  FacebookIcon, 
  YouTubeIcon, 
  SpotifyIcon, 
  VCardIcon, 
  PaymentIcon,
  RestaurantIcon,
  WifiIcon,
  PayMeIcon,
  MapsPinIcon,
  EventIcon,
  SMSIcon,
  AppStoreIcon,
  MultiLinkIcon,
  CampaignIcon
} from "@/components/icons"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"

const qrTypes = [
  {
    href: "/url",
    icon: <GlobeIcon className="w-full h-full" />,
    title: "Website URL",
    description: "Link to any website, landing page, or online content",
    color: "#4F46E5",
  },
  {
    href: "/whatsapp",
    icon: <WhatsAppIcon className="w-full h-full" />,
    title: "WhatsApp",
    description: "Start a WhatsApp chat with a pre-filled message",
    color: "#25D366",
  },
  {
    href: "/email",
    icon: <EmailIcon className="w-full h-full" />,
    title: "Email",
    description: "Compose emails with pre-filled subject and body",
    color: "#EA4335",
  },
  {
    href: "/phone",
    icon: <PhoneIcon className="w-full h-full" />,
    title: "Phone Call",
    description: "Make it easy for people to call you instantly",
    color: "#8B5CF6",
  },
  {
    href: "/instagram",
    icon: <InstagramIcon className="w-full h-full" />,
    title: "Instagram",
    description: "Link directly to your Instagram profile",
    color: "#E4405F",
  },
  {
    href: "/facebook",
    icon: <FacebookIcon className="w-full h-full" />,
    title: "Facebook",
    description: "Connect people to your Facebook page or profile",
    color: "#1877F2",
  },
  {
    href: "/youtube",
    icon: <YouTubeIcon className="w-full h-full" />,
    title: "YouTube",
    description: "Share your channel or a specific video",
    color: "#FF0000",
  },
  {
    href: "/spotify",
    icon: <SpotifyIcon className="w-full h-full" />,
    title: "Spotify",
    description: "Share playlists, albums, or artist profiles",
    color: "#1DB954",
  },
  {
    href: "/vcard",
    icon: <VCardIcon className="w-full h-full" />,
    title: "Business Card",
    description: "Share contact information digitally via vCard",
    color: "#0EA5E9",
  },
  {
    href: "/payment",
    icon: <PaymentIcon className="w-full h-full" />,
    title: "Payment Link",
    description: "Direct customers to your payment page",
    color: "#F59E0B",
  },
  {
    href: "/cafe",
    icon: <RestaurantIcon className="w-full h-full" />,
    title: "Restaurant Menu",
    description: "Share your cafe or restaurant menu instantly",
    color: "#10B981",
  },
  {
    href: "/wifi",
    icon: <WifiIcon className="w-full h-full" />,
    title: "Wi-Fi",
    description: "Help people connect to your Wi-Fi in one scan",
    color: "#0EA5E9",
  },
  {
    href: "/payme",
    icon: <PayMeIcon className="w-full h-full" />,
    title: "Pay Me",
    description: "Generate direct payment QR codes for popular platforms",
    color: "#14B8A6",
  },
  {
    href: "/maps",
    icon: <MapsPinIcon className="w-full h-full" />,
    title: "Google Maps",
    description: "Send users directly to a location or map search",
    color: "#F97316",
  },
  {
    href: "/event",
    icon: <EventIcon className="w-full h-full" />,
    title: "Event",
    description: "Create calendar-friendly QR links for meetings and events",
    color: "#6366F1",
  },
  {
    href: "/sms",
    icon: <SMSIcon className="w-full h-full" />,
    title: "SMS",
    description: "Start text messages with pre-filled content",
    color: "#22C55E",
  },
  {
    href: "/appstore",
    icon: <AppStoreIcon className="w-full h-full" />,
    title: "App Download",
    description: "Share app store links for iOS and Android users",
    color: "#334155",
  },
  {
    href: "/multilink",
    icon: <MultiLinkIcon className="w-full h-full" />,
    title: "Multi Link",
    description: "Use one QR to open your profile page with all key links",
    color: "#A855F7",
  },
  {
    href: "/campaign",
    icon: <CampaignIcon className="w-full h-full" />,
    title: "UTM Campaign",
    description: "Create trackable marketing links for daily growth campaigns",
    color: "#EF4444",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            100% Free Forever
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Create QR Codes{" "}
            <span className="text-primary">Instantly</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Create visually polished QR codes for websites, social platforms, contact sharing, and more — no account required, no usage limits, and completely free.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#generators"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-primary/25"
            >
              Start Creating
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-card text-foreground rounded-xl font-semibold text-lg hover:bg-muted transition-colors cursor-pointer border border-border"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* QR Type Grid */}
      <section id="generators" className="py-16 md:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Choose Your QR Code Type
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Select the type of QR code you want to create. Each type is optimized for its specific use case.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {qrTypes.map((type) => (
              <QRTypeCard key={type.href} {...type} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground">Need Premium QR Features?</h3>
              <p className="text-muted-foreground mt-1">
                Try dynamic links, analytics, bulk generation, print templates, and more for free.
              </p>
            </div>
            <a
              href="/advanced"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity text-center"
            >
              Open Advanced Tools
            </a>
          </div>
        </div>
      </section>

      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  )
}
