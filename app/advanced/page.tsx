import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackButton } from "@/components/back-button"
import {
  Shuffle,
  Palette,
  Smartphone,
  Users,
} from "lucide-react"

const advancedFeatures = [
  { href: "/advanced/ab", title: "A/B Routing", desc: "Split scans between two destinations by percentage.", color: "#14B8A6", icon: Shuffle },
  { href: "/advanced/brand", title: "Brand Kit", desc: "Save reusable branding presets for fast generation.", color: "#A855F7", icon: Palette },
  { href: "/advanced/deeplink", title: "Deep Link", desc: "Route users to app, store, or web fallback smartly.", color: "#1D4ED8", icon: Smartphone },
  { href: "/advanced/team", title: "Team Share", desc: "Create shareable setup links for collaborators.", color: "#CA8A04", icon: Users },
]

export default function AdvancedPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton />
          </div>

          <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-10 mb-10">
            <p className="text-sm font-semibold text-primary mb-2">ADVANCED TOOLS</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Premium QR Features, Free</h1>
            <p className="text-muted-foreground max-w-3xl">
              These are features that are usually paid on other platforms. Build, test, and use them here at no cost.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative block p-6 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: `linear-gradient(135deg, ${item.color}14 0%, ${item.color}08 100%)` }}
                  />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${item.color}20` }}>
                      <Icon className="w-7 h-7" style={{ color: item.color }} />
                    </div>
                    <h2 className="text-lg font-semibold text-card-foreground mb-2">{item.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
